const obolochka = document.querySelector('.obolochcka');
const whyButton = document.getElementById('whyButton');
const explainer = document.querySelector('.explainer');

// Функция для позиционирования кнопки
function positionWhyButton(rect) {
  const containerRect = explainer.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  
  // Рассчитываем позицию кнопки рядом с выделенным текстом
  let top = rect.top - containerRect.top + scrollY - 40;
  let left = rect.left - containerRect.left + scrollX + rect.width/2 - 250;
  
  // Ограничиваем позицию, чтобы не выходила за пределы экрана
  top = Math.max(10, Math.min(top, window.innerHeight - 50));
  left = Math.max(10, Math.min(left, window.innerWidth - 100));
  
  whyButton.style.top = `${top}px`;
  whyButton.style.left = `${left}px`;
  whyButton.style.display = 'block';
}

// Обработчик выделения текста
document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  const selectedText = selection.toString();

  if (selectedText.length > 0 && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    positionWhyButton(rect);
    whyButton.dataset.selectedText = selectedText;
  } else if (obolochka.style.display !== 'block') {
    whyButton.style.display = 'none';
  }
});

// Обработчик клика по кнопке
whyButton.addEventListener('click', () => {
  obolochka.style.display = 'block';
  const text = whyButton.dataset.selectedText || '';
  document.querySelector('.window').value += text + ' ';
  window.getSelection().removeAllRanges();
});

// Скрываем кнопку при клике вне выделения
document.addEventListener('mousedown', (e) => {
  if (e.target !== whyButton && !obolochka.contains(e.target)) {
    const selection = window.getSelection();
    if (!selection.toString() && obolochka.style.display !== 'block') {
      whyButton.style.display = 'none';
    }
  }
});

// Корректируем позицию кнопки при скролле/ресайзе
window.addEventListener('scroll', () => {
  const selection = window.getSelection();
  if (selection.toString() && selection.rangeCount > 0) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    positionWhyButton(rect);
  }
});

window.addEventListener('resize', () => {
  const selection = window.getSelection();
  if (selection.toString() && selection.rangeCount > 0) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    positionWhyButton(rect);
  }
});