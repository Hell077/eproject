from flask import Flask, request
import requests
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"*": "https://varya120president.ru"}})

USER_ID = 1097316536
TOKEN = "7669781141:AAEraHeG95TX62HYegPGsS8Lst7Hn1B56ak"

@app.route('/', methods=['POST'])
def send_message():
    # Получаем данные из запроса
    data = request.json
    message = data.get("message")

    if message:
        send_to_telegram(USER_ID, message)
        return "Message sent", 200
    else:
        return "No message provided", 400


def send_to_telegram(user_id, message):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {
        "chat_id": user_id,
        "text": message
    }

    # Отладочный вывод
    print(f"Sending message to {user_id}: {message}")

    response = requests.post(url, data=payload)

    # Отладочный вывод ответа
    print(f"Response: {response.json()}")

    return response.json()


if __name__ == '__main__':
    app.run(port=5000)
