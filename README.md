<div align="center">
  <a href="https://github.com/aryadians/money-tracker">
    <img src="https://raw.githubusercontent.com/aryadians/money-tracker/main/public/logo.svg" alt="Logo Money Tracker" width="120" height="120">
  </a>

  <h1 align="center">Money Tracker</h1>

  <p align="center">
    <b>A modern, open-source personal finance tracker.</b><br>
    Take control of your money, your way.
  </p>

  <p align="center">
    <a href="https://github.com/aryadians/money-tracker/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/aryadians/money-tracker/tests.yml?branch=main&label=tests&style=flat-square" alt="Tests">
    </a>
    <a href="https://github.com/aryadians/money-tracker/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/aryadians/money-tracker?style=flat-square" alt="Contributors">
    </a>
    <a href="https://github.com/aryadians/money-tracker/stargazers">
      <img src="https://img.shields.io/github/stars/aryadians/money-tracker?style=flat-square" alt="Stars">
    </a>
    <a href="https://github.com/aryadians/money-tracker/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/aryadians/money-tracker?style=flat-square" alt="License">
    </a>
  </p>
</div>

---

## 🌟 About The Project

**Money Tracker** is a full-stack personal finance application designed to help you track income, expenses, and transfers across multiple wallets. Built with performance and user experience in mind, it leverages the power of the **TALL** stack ecosystem (Tailwind, Alpine/React, Laravel, Livewire/Inertia).

### ✨ Core Features

- 🏦 **Multi-Wallet Management**: Create and manage unlimited accounts (Cash, Bank, E-Wallet).
- 📊 **Transaction Tracking**: Log income, expenses, and transfers seamlessly.
- 🎯 **Budgeting Tools**: Set monthly limits and visualize your spending progress.
- 🏷️ **Smart Categorization**: Organize transactions with custom icons and colors.
- 📈 **Real-time Analytics**: Interactive charts to visualize your financial health.
- 📤 **Data Export**: Easily export your transaction history to Excel/CSV.

---

## 🛠️ Tech Stack

This project is built using the latest web technologies to ensure robustness and scalability.

<div align="center">

| **Backend** | **Frontend** | **Tools** |
|:---:|:---:|:---:|
| ![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=for-the-badge&logo=php&logoColor=white) | ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black) | ![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| ![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) | ![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white) | ![Composer](https://img.shields.io/badge/Composer-2.x-885630?style=for-the-badge&logo=composer&logoColor=white) |
| ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) | ![Git](https://img.shields.io/badge/Git-2.x-F05032?style=for-the-badge&logo=git&logoColor=white) |

</div>

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* **PHP** >= 8.2
* **Node.js** & **NPM**
* **Composer**
* **MySQL**

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/aryadians/money-tracker.git](https://github.com/aryadians/money-tracker.git)
    cd money-tracker
    ```

2.  **Install PHP & Node dependencies**
    ```sh
    composer install
    npm install
    ```

3.  **Configure Environment**
    Copy the example env file and update your database credentials.
    ```sh
    cp .env.example .env
    ```
    *Open `.env` and set `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.*

4.  **Generate App Key & Run Migrations**
    ```sh
    php artisan key:generate
    php artisan migrate --seed
    ```

5.  **Run the Application**
    You need two terminals running:
    ```sh
    # Terminal 1: Start Vite (Frontend)
    npm run dev
    ```
    ```sh
    # Terminal 2: Start Laravel Server (Backend)
    php artisan serve
    ```

    Visit `http://localhost:8000` in your browser.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/aryadians">aryadians</a>
</p>
