# 🚖 Smart Taxi Tracker  

<details>
  <summary>Що таке Smart Taxi Tracker?</summary>

  🔹 **Безперервне відстеження змін** – фіксуйте робочий час, пробіг, витрати та керуйте своїми змінами без зусиль.  
  🔹 **Фінансовий аналіз** – контролюйте свій дохід, витрати та чистий прибуток.  
  🔹 **Управління водіями та автомобілями** – додавайте кількох водіїв і транспортні засоби з детальним відстеженням змін.  
  🔹 **Кросплатформна підтримка** – створено на базі **React Native & Expo**, що забезпечує стабільну роботу на **iOS та Android**.  

  #### 📊 Контролюйте свій робочий графік, максимізуйте дохід і спрощуйте управління витратами з **Smart Taxi Tracker**!  

</details>

---

# 📸 Швидкий огляд UI (Скріншоти)

## 📝 Екрани реєстрації  

Ознайомтеся з покроковим процесом реєстрації в **Smart Taxi Tracker**.  

<details>
  <summary>1️⃣ Введіть ваше ім’я 🖊️</summary>
  <br>
  <img src="screenshots/register-name.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Встановіть пароль 🔒</summary>
  <br>
  <img src="screenshots/register-password.jpg" width="250">
</details>

<details>
  <summary>3️⃣ Підтвердіть пароль ✅</summary>
  <br>
  <img src="screenshots/register-confirmPassword.jpg" width="250">
</details>

## 📝 Екрани авторизації  

Процес входу в **Smart Taxi Tracker**.  

<details>
  <summary>1️⃣ Виберіть водія зі списку 🖊️</summary>
  <br>
  <img src="screenshots/login-name-1.jpg" width="250">
  <img src="screenshots/login-name-2.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Введіть пароль 🔒</summary>
  <br>
  <img src="screenshots/login-password.jpg" width="250">
</details>

## 📝 Налаштування профілю  

Змініть ім’я, пароль, аватар або видаліть свій акаунт.  

<details>
  <summary>1️⃣ Основні екрани профілю 🖊️</summary>
  <br>
  <img src="screenshots/profile-settings-1.jpg" width="250">
  <img src="screenshots/profile-settings-2.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Форма зміни імені та пароля 🔒</summary>
  <br>
  <img src="screenshots/profile-settings-form-change-name.jpg" width="250">
  <img src="screenshots/profile-settings-form-change-password.jpg" width="250">
</details>

## 📝 Мої автомобілі  

Можливість додавати, редагувати, вибирати та відкривати фото автомобіля на весь екран.  

<details>
  <summary>1️⃣ Додавання нового авто та редагування 🖊️</summary>
  <br>
  <img src="screenshots/car-add-car-form.jpg" width="250">
  <img src="screenshots/car-edit-car-form.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Вибраний автомобіль та список моїх авто 🔒</summary>
  <br>
  <img src="screenshots/car-list-of-cars.jpg" width="250">
  <img src="screenshots/car-selected-car1.jpg" width="250">
  <img src="screenshots/car-selected-car-1.jpg" width="250">
</details>

---

## 🔧 Технологічний стек

### Frontend: React Native (Expo) + TypeScript

### Менеджмент стану: React Context API

### Збереження даних: SQLite (для офлайн-збереження)

## 📂 Структура проєкту

```plaintext
/src
├── app        # Роутинг проєкту з Expo Router
├── assets     # Медіафайли (зображення, шрифти, анімації)
├── components # UI-компоненти та великі екранні компоненти
├── config     # Конфігураційні файли
├── contexts   # Файли глобального менеджера стану (Context API, React)
├── db         # Сервіси, запити, ініціалізація бази (Expo SQLite) та всі операції з БД
├── hooks      # Кастомні функції та хуки
├── services   # Файли для роботи з зовнішніми сервісами, такими як API
├── types      # Глобальні типи та інтерфейси
├── utils      # Функції-хелпери
```

## 🏗️ Архітектурні патерни

### Цей проєкт використовує Component Pattern для перевикористання UI-компонентів, а також:

### Higher-Order Components (HOC) для повторного використання логіки

### Render Props Pattern для динамічної поведінки UI

### Separation of Concerns (SoC) для розділення логіки та UI

## 🚀 Початок роботи

### Клонування репозиторію:

git clone https://github.com/MatviieshynO/Smart-Taxi-Shift-Tracker.git

cd taxi-app

### Встановлення залежностей:

yarn install # or npm install

### Запуск проєкту:

npx expo start || expo start

### Для Android:

expo run:android  || npm run android

### Для iOS (потрібен Mac і Xcode):

expo run:ios || npm run ios

## 📡 API та база даних

### Цей додаток підтримує SQLite для локального збереження даних.

📌 Майбутні покращення:

📊 Дашборд із розширеним аналізом заробітку

📍 Відстеження локації в реальному часі та історія маршрутів

🌍 Підтримка декількох мов

### 👤 Oleh Matviieshyn  

🔗 **GitHub:** [MatviieshynO](https://github.com/MatviieshynO)  
🔗 **LinkedIn:** [Oleh Matviieshyn](https://www.linkedin.com/in/oleh-matviieshyn-10230020a/)  
