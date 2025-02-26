# 🚖 Smart Taxi Tracker  

<details>
  <summary>Czym jest Smart Taxi Tracker?</summary>

  🔹 **Bezproblemowe śledzenie zmian** – rejestruj swoje godziny pracy, przebieg, wydatki i zarządzaj zmianami bez wysiłku.  
  🔹 **Analiza finansowa** – kontroluj swoje dochody, wydatki i zysk netto.  
  🔹 **Zarządzanie kierowcami i pojazdami** – dodawaj wielu kierowców i pojazdy z szczegółowym śledzeniem zmian.  
  🔹 **Obsługa wielu platform** – zbudowany na **React Native & Expo**, zapewniający płynne działanie na **iOS i Android**.  

  #### 📊 Kontroluj swój harmonogram pracy, maksymalizuj dochody i uprość zarządzanie wydatkami dzięki **Smart Taxi Tracker**!  

</details>

---

# 📸 Szybki podgląd UI (Zrzuty ekranu)

## 📝 Ekrany rejestracji  

Zapoznaj się z procesem rejestracji krok po kroku w **Smart Taxi Tracker**.  

<details>
  <summary>1️⃣ Wpisz swoje imię 🖊️</summary>
  <br>
  <img src="screenshots/register-name.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Ustaw hasło 🔒</summary>
  <br>
  <img src="screenshots/register-password.jpg" width="250">
</details>

<details>
  <summary>3️⃣ Potwierdź hasło ✅</summary>
  <br>
  <img src="screenshots/register-confirmPassword.jpg" width="250">
</details>

## 📝 Ekrany logowania  

Proces logowania w **Smart Taxi Tracker**.  

<details>
  <summary>1️⃣ Wybierz kierowcę z listy 🖊️</summary>
  <br>
  <img src="screenshots/login-name-1.jpg" width="250">
  <img src="screenshots/login-name-2.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Wpisz hasło 🔒</summary>
  <br>
  <img src="screenshots/login-password.jpg" width="250">
</details>

## 📝 Ustawienia profilu  

Zmień swoje imię, hasło, awatar lub usuń konto.  

<details>
  <summary>1️⃣ Główne ekrany profilu 🖊️</summary>
  <br>
  <img src="screenshots/profile-settings-1.jpg" width="250">
  <img src="screenshots/profile-settings-2.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Formularz zmiany imienia i hasła 🔒</summary>
  <br>
  <img src="screenshots/profile-settings-form-change-name.jpg" width="250">
  <img src="screenshots/profile-settings-form-change-password.jpg" width="250">
</details>

## 📝 Moje pojazdy  

Możliwość dodawania, edytowania, wybierania i otwierania zdjęć pojazdu na pełnym ekranie.  

<details>
  <summary>1️⃣ Dodaj nowy pojazd i edytuj 🖊️</summary>
  <br>
  <img src="screenshots/car-add-car-form.jpg" width="250">
  <img src="screenshots/car-edit-car-form.jpg" width="250">
</details>

<details>
  <summary>2️⃣ Wybrany pojazd i lista moich pojazdów 🔒</summary>
  <br>
  <img src="screenshots/car-list-of-cars.jpg" width="250">
  <img src="screenshots/car-selected-car1.jpg" width="250">
  <img src="screenshots/car-selected-car-1.jpg" width="250">
</details>

---

## 🔧 Stos technologiczny

### Frontend: React Native (Expo) + TypeScript

### Zarządzanie stanem: React Context API

### Przechowywanie danych: SQLite (do przechowywania offline)

## 📂 Struktura projektu

```plaintext
/src
├── app        # Routing projektu z Expo Router
├── assets     # Pliki multimedialne (obrazy, czcionki, animacje)
├── components # Komponenty UI oraz większe komponenty ekranów
├── config     # Pliki konfiguracyjne
├── contexts   # Pliki do zarządzania stanem globalnym (Context API, React)
├── db         # Usługi, zapytania, inicjalizacja bazy danych (Expo SQLite) i wszystkie operacje na bazie
├── hooks      # Niestandardowe funkcje i hooki
├── services   # Pliki do pracy z zewnętrznymi usługami, takimi jak API
├── types      # Globalne typy i interfejsy
├── utils      # Funkcje pomocnicze
```
---

## 🏗️ Wzorce architektoniczne

### Ten projekt stosuje Component Pattern do ponownego wykorzystania komponentów UI, a także:

### Higher-Order Components (HOC) do ponownego użycia logiki

### Render Props Pattern do dynamicznego zachowania UI

### Separation of Concerns (SoC) w celu oddzielenia logiki od UI

## 🚀 Rozpoczęcie pracy


### Klonowanie repozytorium:

git clone https://github.com/MatviieshynO/Smart-Taxi-Shift-Tracker.git

cd taxi-app

***

### Instalacja zależności:

yarn install # or npm install

***

### Uruchomienie projektu:

npx expo start || expo start

***

### Dla Androida:

expo run:android  || npm run android

***

### Dla iOS (wymaga Maca i Xcode):

expo run:ios || npm run ios

---

## 📡 API i baza danych

### Ta aplikacja obsługuje SQLite do lokalnego przechowywania danych.

---

📌  Przyszłe ulepszenia:

📊 Zaawansowany panel analityczny dochodów

📍 Śledzenie lokalizacji w czasie rzeczywistym i historia tras

🌍 Obsługa wielu języków

---

### 👤 Oleh Matviieshyn  

🔗 **GitHub:** [MatviieshynO](https://github.com/MatviieshynO)  
🔗 **LinkedIn:** [Oleh Matviieshyn](https://www.linkedin.com/in/oleh-matviieshyn-10230020a/)  
