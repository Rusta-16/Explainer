import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from transformers import pipeline
from pathlib import Path
import os
import requests

# Конфигурация
CHUNKS_PATH = "dataset/all_chunks.json"
EMBEDDING_MODEL_NAME = "sentence-transformers/all-mpnet-base-v2"
QA_MODEL_NAME = "AlexKay/xlm-roberta-large-qa-multilingual-finedtuned-ru"
INDEX_PATH = "dataset/faiss_index.bin"
MAX_CONTEXT_LENGTH = 3000
TOP_K_CHUNKS = 5

# Добавляем размерность модели для проверки
EMBEDDING_DIMENSION = 768  # Для all-mpnet-base-v2 размерность 768

def download_model_with_fallback(model_name, local_dir):
    """Пытается скачать модель с резервным вариантом при ошибке"""
    from huggingface_hub import snapshot_download, HfApi
    
    try:
        snapshot_download(
            repo_id=model_name,
            local_dir=local_dir,
            local_dir_use_symlinks=False
        )
        print(f"Модель {model_name} успешно скачана")
        return True
    except Exception as e:
        print(f"Ошибка при скачивании {model_name}: {e}")
        print("Пробуем альтернативный метод скачивания...")
        try:
            api = HfApi()
            files = api.list_files_info(model_name)
            
            os.makedirs(local_dir, exist_ok=True)
            
            for file in files:
                print(f"Скачивание {file.rfilename}...")
                url = f"https://huggingface.co/{model_name}/resolve/main/{file.rfilename}"
                response = requests.get(url, stream=True)
                
                file_path = os.path.join(local_dir, file.rfilename)
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                
                with open(file_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
            
            return True
        except Exception as e2:
            print(f"Критическая ошибка: {e2}")
            return False

def load_chunks(chunks_path):
    """Загружает чанки из JSON-файла"""
    if not os.path.exists(chunks_path):
        print(f"Ошибка: файл не найден {chunks_path}")
        return []
    
    with open(chunks_path, "r", encoding="utf-8") as f:
        chunks = json.load(f)
    print(f"Загружено {len(chunks)} чанков")
    return chunks

def create_faiss_index(chunks, model, index_path):
    """Создает и сохраняет FAISS индекс с правильной размерностью"""
    texts = [chunk["text"] for chunk in chunks]
    print("Создание эмбеддингов...")
    embeddings = model.encode(texts, show_progress_bar=True)
    
    # Используем заранее известную размерность
    dimension = EMBEDDING_DIMENSION
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings).astype('float32'))
    faiss.write_index(index, index_path)
    print(f"FAISS индекс сохранен в {index_path} (размерность: {dimension})")
    return index

def load_or_create_index(chunks, model, index_path):
    """Загружает или создает индекс с проверкой размерности"""
    if Path(index_path).exists():
        try:
            index = faiss.read_index(index_path)
            # Проверяем размерность индекса
            if index.d == EMBEDDING_DIMENSION:
                print(f"Загрузка существующего FAISS индекса (размерность: {index.d})")
                return index
            else:
                print(f"Несоответствие размерности! Индекс: {index.d}, Ожидается: {EMBEDDING_DIMENSION}")
                print("Пересоздаем индекс...")
                os.remove(index_path)  # Удаляем несовместимый индекс
        except Exception as e:
            print(f"Ошибка загрузки индекса: {e}")
            print("Пересоздаем индекс...")
            os.remove(index_path)
    
    return create_faiss_index(chunks, model, index_path)

def find_relevant_chunks(question, embedding_model, index, chunks, top_k=5):
    """Находит релевантные чанки с проверкой размерности"""
    question_embedding = embedding_model.encode([question])
    
    # Проверяем размерность эмбеддинга вопроса
    if question_embedding.shape[1] != EMBEDDING_DIMENSION:
        print(f"Предупреждение: размерность эмбеддинга вопроса ({question_embedding.shape[1]}) не соответствует ожидаемой ({EMBEDDING_DIMENSION})")
        # Попытка исправить - обрезаем/дополняем до нужной размерности
        if question_embedding.shape[1] > EMBEDDING_DIMENSION:
            question_embedding = question_embedding[:, :EMBEDDING_DIMENSION]
        else:
            padding = np.zeros((1, EMBEDDING_DIMENSION - question_embedding.shape[1]))
            question_embedding = np.hstack([question_embedding, padding])
    
    distances, indices = index.search(question_embedding, top_k)
    return [chunks[i] for i in indices[0]]

def main():
    # Проверка существования файлов
    if not os.path.exists(CHUNKS_PATH):
        print(f"Ошибка: файл с чанками не найден: {CHUNKS_PATH}")
        return
    
    # Загружаем чанки
    chunks = load_chunks(CHUNKS_PATH)
    if not chunks:
        print("Нет чанков для обработки")
        return
    
    # Загружаем модель для эмбеддингов
    print(f"Загрузка модели эмбеддингов: {EMBEDDING_MODEL_NAME}")
    
    try:
        # Пробуем загрузить напрямую
        embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        print("Модель загружена напрямую из Hugging Face Hub")
    except Exception as e:
        print(f"Прямая загрузка не удалась: {e}")
        print("Пробуем локальное скачивание...")
        local_path = f"models/{EMBEDDING_MODEL_NAME.split('/')[-1]}"
        
        if download_model_with_fallback(EMBEDDING_MODEL_NAME, local_path):
            embedding_model = SentenceTransformer(local_path)
        else:
            print("Не удалось загрузить модель эмбеддингов")
            return
    
    # Проверяем размерность модели
    model_dim = embedding_model.get_sentence_embedding_dimension()
    print(f"Размерность модели эмбеддингов: {model_dim}")
    
    # Создаем/загружаем FAISS индекс
    index = load_or_create_index(chunks, embedding_model, INDEX_PATH)
    
    # Загружаем QA-модель
    print(f"Загрузка QA-модели: {QA_MODEL_NAME}")
    try:
        qa_pipeline = pipeline(
            "question-answering",
            model=QA_MODEL_NAME,
            tokenizer=QA_MODEL_NAME,
            device=-1
        )
    except Exception as e:
        print(f"Ошибка при загрузке модели: {e}")
        print("Пробуем локальное скачивание...")
        local_qa_path = f"models/{QA_MODEL_NAME.split('/')[-1]}"
        
        if download_model_with_fallback(QA_MODEL_NAME, local_qa_path):
            qa_pipeline = pipeline(
                "question-answering",
                model=local_qa_path,
                tokenizer=local_qa_path,
                device=-1
            )
        else:
            print("Используем легкую модель как запасной вариант")
            qa_pipeline = pipeline(
                "question-answering",
                model="distilbert-base-cased-distilled-squad",
                tokenizer="distilbert-base-cased-distilled-squad",
                device=-1
            )
    
    print("\nСистема готова к работе! Введите вопрос...")
    
    while True:
        question = input("\nВаш вопрос: ").strip()
        if question.lower() in ["выход", "exit", "quit"]:
            break
            
        # Поиск релевантных чанков
        relevant_chunks = find_relevant_chunks(
            question, embedding_model, index, chunks, TOP_K_CHUNKS
        )
        if not relevant_chunks:
            print("Не найдено релевантных фрагментов")
            continue
        
        # Форматирование контекста
        context = "\n\n".join([chunk["text"] for chunk in relevant_chunks])
        if len(context) > MAX_CONTEXT_LENGTH:
            print(f"Контекст сокращен с {len(context)} до {MAX_CONTEXT_LENGTH} символов")
            context = context[:MAX_CONTEXT_LENGTH]
        
        # Генерация ответа
        try:
            results = qa_pipeline(
                question=question,
                context=context,
                top_k=3
            )
            
            # Выбираем лучший ответ
            best_result = max(results, key=lambda x: x['score'])
            answer = best_result['answer']
            confidence = best_result['score']
            
            # Фильтр по уверенности
            if confidence < 0.1:
                answer = "Не удалось найти точный ответ в предоставленных источниках."
            elif len(answer) < 20:  # Если ответ слишком короткий
                # Пробуем найти более развернутый ответ
                for result in results:
                    if len(result['answer']) > len(answer):
                        answer = result['answer']
                
        except Exception as e:
            print(f"Ошибка генерации: {e}")
            answer = "Не удалось извлечь ответ. Попробуйте другой вопрос."
        
        # Вывод результатов
        print(f"\n🤖 Ответ: {answer}")
        # if confidence >= 0.1:
            # print(f"🔒 Уверенность: {confidence:.2f}")
        # print("\n📚 Источники:")
        # for i, chunk in enumerate(relevant_chunks):
            # print(f"{i+1}. {chunk['source']}")

if __name__ == "__main__":
    main()