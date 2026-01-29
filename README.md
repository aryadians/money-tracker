<div align="center">
  <img src="https://raw.githubusercontent.com/aryadians/money-tracker/main/public/logo.svg" alt="Money Tracker" width="100"/>
</div>

# 💰 Money Tracker

A modern, open-source personal finance tracker. Take control of your money, your way.

[![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com)
[![License](https://img.shields.io/github/license/aryadians/money-tracker?style=flat-square&color=5D6975)](LICENSE)


## ✨ Core Features

-   **🏦 Multi-Wallet Management**: Handle all your accounts from one place.
-   **📊 Transaction Tracking**: Log income, expenses, and transfers seamlessly.
-   **🎯 Budgeting Tools**: Set monthly or yearly budgets and track your progress.
-   **🏷️ Smart Categorization**: Organize your spending with customizable categories.
-   **📈 Insightful Analytics**: Visualize your financial health with interactive charts.
-   **📤 Data Export**: Export your transaction data to Excel.

## 🛠️ Tech Stack

| Area      | Technology                                                                                                                              |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | [PHP 8.2](https://www.php.net), [Laravel 12](https://laravel.com), [MySQL 8.0](https://www.mysql.com)                                    |
| **Frontend**  | [React 18](https://react.dev), [Inertia.js](https://inertiajs.com), [Vite](https://vitejs.dev), [Tailwind CSS](https://tailwindcss.com)   |
| **Tooling**   | [Composer](https://getcomposer.org), [NPM](https://www.npmjs.com), [Git](https://git-scm.com/)                                         |


## 🚀 Getting Started

### Prerequisites
-   PHP >= 8.2
-   Node.js & NPM
-   Composer
-   MySQL

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/aryadians/money-tracker.git
    cd money-tracker
    ```

2.  **Install dependencies**
    ```sh
    composer install && npm install
    ```

3.  **Setup your environment**
    ```sh
    cp .env.example .env
    ```
    *Then, update your database credentials in the `.env` file.*

4.  **Generate application key & run migrations**
    ```sh
    php artisan key:generate
    php artisan migrate
    ```

5.  **Build assets and start the servers**
    ```sh
    # Run the asset build process and local server
    npm run dev 
    
    # In a new terminal, run the PHP server
    php artisan serve
    ```
    Your app will be available at `http://localhost:8000`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/aryadians/money-tracker/issues).

## 📝 License

This project is open-source, licensed under the **MIT License**. See the `LICENSE` file for more details.

---
<p align="center">
  Made with ❤️ by <a href="https://github.com/aryadians">aryadians</a>
</p>
