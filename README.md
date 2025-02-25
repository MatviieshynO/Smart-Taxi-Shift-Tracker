## 🌍 Select Language | Виберіть мову | Wybierz język

-   🇬🇧 [English](README.md)
-   🇺🇦 [Українська](README_UA.md)
-   🇵🇱 [Polski](README_PL.md)

# 🚖 Smart Taxi Shift Tracker

## 📢 App Description (can be adjusted for the title):

### Smart Taxi Shift Tracker is a mobile application designed to help taxi drivers efficiently manage their work shifts, earnings, and expenses. The app provides real-time tracking of shifts, income, and mileage, offering valuable insights into daily operations. Built using React Native & Expo, it supports both iOS & Android platforms, ensuring seamless performance across devices.

## This app is ideal for independent drivers, fleet operators, and ride-hailing service providers who want to optimize their work schedules, track financial performance, and maintain a comprehensive log of their shifts.

## 📸 Screenshots

### 📝 Registration Screens

### 1️⃣ Enter Name ![Login Screen](screenshots/register-name-screen.png)

### 2️⃣ Enter Password

### 3️⃣ Confirm Password

## 🛠️ Features

### ✅ Start and stop shifts with time tracking

### ✅ GPS-based mileage calculation

### ✅ Add earnings and expenses dynamically

### ✅ Calculate net earnings per hour and per kilometer

### ✅ Store data locally with SQLite

### ✅ User authentication with Firebase / API integration

### ✅ Multi-driver and multi-vehicle support

### ✅ Onboarding tutorial for new users

## 🔧 Tech Stack

### Frontend: React Native (Expo) + TypeScript

### State Management: React Context API

### Storage: SQLite (for offline data storage)

## 📂 Project Structure

/src
├── components # Reusable UI components
├── screens # Application screens
├── hooks # Custom React hooks
├── context # Global state management (Context API)
├── db # SQLite setup and queries
├── services # API calls and business logic
├── utils # Helper functions
├── assets # Images, icons, fonts
├── navigation # App navigation (React Navigation)

## 🏗️ Architectural Patterns

### This project follows Component Pattern for UI reusability, along with:

### Higher-Order Components (HOC) for logic reuse

### Render Props Pattern for dynamic UI behavior

### Separation of Concerns (SoC) to keep logic and UI separate

## 🚀 Getting Started

### Clone the repository:

git clone https://github.com/your-username/taxi-app.git
cd taxi-app

### Install dependencies:

yarn install # or npm install

### Run the project:

npx expo start || expo start

### For Android:

expo run:android || npm run android

### For iOS (Requires Mac & Xcode):

expo run:ios

## 📡 API & Database

### This app supports SQLite for local data persistence

📌 Future Enhancements

📊 Advanced analytics dashboard for earnings

📍 Live location tracking & route history

💳 Payment tracking & financial reports

🌍 Multi-language support

👨‍💻 Author

Your Name – GitHub | LinkedIn
