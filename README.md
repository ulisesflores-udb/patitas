# Patitas
# Patitas 🐾 — Backend Laravel + Frontend React Native (Expo)

App para reportar y encontrar mascotas perdidas.  


---

## Tabla de contenido
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación rápida (TL;DR)](#instalación-rápida-tldr)
- [Backend (Laravel)](#backend-laravel)
  - [Configuración del entorno](#configuración-del-entorno)
  - [Migraciones y seeders](#migraciones-y-seeders)
  - [CORS y seguridad](#cors-y-seguridad)
  - [Comandos útiles](#comandos-útiles)
- [Frontend (React Native + Expo)](#frontend-react-native--expo)
  - [Variables de entorno](#variables-de-entorno)
  - [Arranque en Web / Android / iOS](#arranque-en-web--android--ios)
  - [Notas sobre mapas](#notas-sobre-mapas)
- [Esquema de datos](#esquema-de-datos)
- [API — Endpoints principales](#api--endpoints-principales)
  - [Ejemplos de uso](#ejemplos-de-uso)
- [Troubleshooting](#troubleshooting)
- [Convenciones y estilo](#convenciones-y-estilo)
- [Licencia](#licencia)

---

## Arquitectura del proyecto

patitas/

├─ backend/ # API Laravel

│ ├─ app/

│ ├─ routes/api.php

│ ├─ database/

│ └─ .env.example

└─ frontend/ # React Native + Expo

├─ App.js

└─ src/

├─ screens/

├─ services/

└─ config/

## Instalación rápida (TL;DR)


# 1) Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configura tu DB en .env
php artisan migrate
php artisan serve   # http://127.0.0.1:8000

# 2) Frontend
cd ../frontend
npm install
# Configura la URL del backend en .env (ver sección de variables)
npx expo start      # elige web/android/ios
# Web
npm run web


