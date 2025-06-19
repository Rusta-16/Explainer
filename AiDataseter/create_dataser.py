import os
import json
import argparse
from pathlib import Path
from PyPDF2 import PdfReader
import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        # Пробуем pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
        print(f"  Извлечено с pdfplumber: {len(text)} символов")
    except Exception as e:
        print(f"  Ошибка pdfplumber ({e}), пробуем PyPDF2...")
        try:
            reader = PdfReader(pdf_path)
            for page in reader.pages:
                if page.extract_text():
                    text += page.extract_text() + "\n"
            print(f"  Извлечено с PyPDF2: {len(text)} символов")
        except Exception as e2:
            print(f"  Критическая ошибка PyPDF2: {e2}")
            text = ""
    
    if not text.strip():
        print("  Предупреждение: не удалось извлечь текст")
    return text

def process_pdf_files(input_dir, output_dir):
    """Обрабатывает все PDF-файлы в директории и сохраняет в единый датасет"""
    # Создаем выходные директории
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    combined_text = ""
    all_chunks = []
    
    # Счетчики для отчетности
    processed_files = 0
    total_chunks = 0
    
    print(f"\nНачинаю обработку PDF-файлов в: {input_dir}")
    
    # Ищем все PDF-файлы
    for filename in sorted(os.listdir(input_dir)):
        if filename.lower().endswith('.pdf'):
            filepath = os.path.join(input_dir, filename)
            print(f"\nОбработка файла: {filename}")
            
            # Извлекаем текст
            text = extract_text_from_pdf(filepath)
            if not text:
                continue
                
            # Добавляем разделитель между книгами
            book_separator = f"\n\n{'='*60}\nНАЧАЛО КНИГИ: {filename}\n{'='*60}\n\n"
            combined_text += book_separator + text
            
            # Разбиваем на чанки
            splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
                separators=["\n\n", "\n", " ", ""]
            )
            chunks = splitter.split_text(text)
            
            # Добавляем метаданные о файле
            for chunk in chunks:
                all_chunks.append({
                    "text": chunk,
                    "source": filename,
                    "chunk_size": len(chunk)
                })
            
            processed_files += 1
            total_chunks += len(chunks)
            print(f"  Добавлено чанков: {len(chunks)}")
    
    # Сохраняем объединенные результаты
    if processed_files > 0:
        print("\nСохранение результатов...")
        
        # Весь объединенный текст в один файл
        with open(os.path.join(output_dir, "combined_text.txt"), 'w', encoding='utf-8') as f:
            f.write(combined_text)
        
        # Все чанки в один JSON-файл
        with open(os.path.join(output_dir, "all_chunks.json"), 'w', encoding='utf-8') as f:
            json.dump(all_chunks, f, ensure_ascii=False, indent=2)
        
        # Статистика
        print(f"\n✅ Обработка завершена успешно!")
        print(f"Обработано файлов: {processed_files}")
        print(f"Всего чанков: {total_chunks}")
        print(f"Общий размер текста: {len(combined_text):,} символов")
        print(f"\nРезультаты сохранены в: {output_dir}")
        print(" - combined_text.txt: объединенный текст всех книг")
        print(" - all_chunks.json: все чанки с метаданными")
    else:
        print("\n❌ Ошибка: не найдено ни одного PDF-файла для обработки")

def main():
    # Настройка аргументов командной строки
    parser = argparse.ArgumentParser(
        description='Создание единого датасета из нескольких PDF-файлов'
    )
    parser.add_argument('--input', type=str, default='pdf_books', 
                       help='Директория с PDF-файлами (по умолчанию: pdf_books)')
    parser.add_argument('--output', type=str, default='dataset', 
                       help='Выходная директория для датасета (по умолчанию: dataset)')
    
    args = parser.parse_args()
    
    # Запуск обработки
    print("="*60)
    print("СОЗДАНИЕ ЕДИНОГО ДАТАСЕТА ИЗ PDF-КНИГ")
    print("="*60)
    print(f"Входная директория: {args.input}")
    print(f"Выходная директория: {args.output}")
    print("="*60)
    
    process_pdf_files(args.input, args.output)

if __name__ == "__main__":
    main()