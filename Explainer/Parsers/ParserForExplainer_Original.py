from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
import subprocess

def parser():
    # Указываем путь к ChromeDriver
    chrome_driver_path = r"C:\chromedriver\chromedriver.exe"

    # Создаем объект Service
    service = Service(chrome_driver_path)

    # Настройки для Chrome
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0")
    options.add_argument("--disable-blink-features=AutomationControlled")

    # Инициализация драйвера
    driver = webdriver.Chrome(service=service, options=options)

    try:
        # Переходим на страницу входа
        driver.get("https://newlxp.ru")
        time.sleep(2)  # Ждём загрузки страницы

        # Находим поля для ввода логина и пароля
        username_field = driver.find_element(By.ID, 'email')
        password_field = driver.find_element(By.ID, 'password')

        # Вводим логин и пароль
        username_field.send_keys("ReihGA23@rostov-don.ithub.ru")
        password_field.send_keys("1RhYd-(4W)Al")

        # Находим кнопку входа и кликаем по ней
        login_button = driver.find_element(By.CLASS_NAME, "css-153kiy9")
        login_button.click()

        # Ждём загрузки страницы после входа
        time.sleep(5)

        # Переходим на нужную страницу после авторизации

        target_url = "https://newlxp.ru/education/490c2cf7-fd15-4907-9113-18c0eb9fae8c/disciplines/d84c861d-c3b4-4b82-a964-a266d75185f1/topics/88542691-e0b3-49d1-a3af-268d1cfc8436"
        time.sleep(2)
        driver.get(target_url)

        # Ждём полной загрузки страницы
        time.sleep(10)

        # Получаем HTML-код текущей страницы
        time.sleep(2)
        html_code = driver.page_source

        print(html_code)  # Выводим или сохраняем HTML

        with open('SpizdiliCodLXP.txt', 'w', encoding='utf-8') as file:
            file.write(html_code)

    except Exception as ex:
        print("Ошибка:", ex)
    finally:
        driver.quit()

if __name__ == "__main__":
    parser()
subprocess.run(['python', 'FiltererHtmlCode.py'])