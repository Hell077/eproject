package main

import (
	"encoding/json"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"log"
	"net/http"
)

var (
	bot *tgbotapi.BotAPI
)

func main() {
	var err error
	bot, err = tgbotapi.NewBotAPI("7669781141:AAEraHeG95TX62HYegPGsS8Lst7Hn1B56ak") // Замените на ваш токен
	if err != nil {
		log.Fatalf("Error creating Telegram bot: %v", err)
	}

	// Установить webhook на ваш сервер
	_, err = bot.SetWebhook(tgbotapi.NewWebhook("https://varya120president.ru/send-message"))
	if err != nil {
		log.Fatalf("Error setting webhook: %v", err)
	}

	// Обработчик для входящих webhook-запросов
	http.HandleFunc("/send-message", sendMessageHandler)

	certFile := "/etc/letsencrypt/live/varya120president.ru/fullchain.pem"
	keyFile := "/etc/letsencrypt/live/varya120president.ru/privkey.pem"

	log.Println("Starting HTTPS server on :8443")
	err = http.ListenAndServeTLS(":8443", certFile, keyFile, nil)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func sendMessageHandler(w http.ResponseWriter, r *http.Request) {
	// Установить CORS заголовки
	w.Header().Set("Access-Control-Allow-Origin", "*")             // Разрешить все источники
	w.Header().Set("Access-Control-Allow-Methods", "POST")         // Разрешить POST метод
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type") // Разрешить определенные заголовки

	// Обработка предварительных запросов (OPTIONS)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req struct {
		Message string `json:"message"` // Поле для сообщения
	}

	// Декодирование JSON из тела запроса
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Отправка сообщения в Telegram
	chatID := int64(1097316536) // Замените на ID вашего чата
	_, err := bot.Send(tgbotapi.NewMessage(chatID, req.Message))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Успешный ответ
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}
