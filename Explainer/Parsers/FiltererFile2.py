import re

# Путь к вашему файлу
input_file = 'SpizdiliCodLXP.txt'
output_file = 'formatted2_css.html'

# Читаем весь текст
with open(input_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Простая обработка: добавляем переносы после ;, {, }
# Можно расширить по необходимости
formatted = re.sub(r'([;{}])', r'\1\n', text)

# Также можно добавить переносы после двоеточий, если нужно
# formatted = re.sub(r'(:)', r'\1\n', formatted)

# Записываем результат
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(formatted)

print(f"Файл сохранен как {output_file}")