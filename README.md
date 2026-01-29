<div align="center">
  <img src="https://raw.githubusercontent.com/aryadians/money-tracker/main/public/icon.svg" alt="Money Tracker" width="100"/>

# Money Tracker

A personal finance management application to track your income and expenses.

[![Laravel](https://img.shields.io/badge/Laravel-v12.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-v18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-v7.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=for-the-badge&logo=php)](https://www.php.net)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

## 📖 About The Project

Money Tracker is a web application designed to help you manage your personal finances effectively. It allows you to track transactions across multiple wallets, categorize your spending, set budgets, and visualize your financial habits through charts.

Built with a modern tech stack, it provides a fast and responsive user experience.

### ✨ Features

-   **Multi-Wallet Management:** Manage several bank accounts or digital wallets.
-   **Transaction Tracking:** Record income and expenses with descriptions and categories.
-   **Dynamic Categories:** Create and customize categories for your transactions.
-   **Budgeting:** Set monthly or yearly budgets for different categories.
-   **Transfers:** Log transfers between your wallets.
-   **Dashboard & Analytics:** Visualize your financial data with interactive charts.

### 🛠️ Built With

-   **[Laravel](https://laravel.com/)** - Backend Framework
-   **[React](https://reactjs.org/)** - Frontend Library
-   **[Inertia.js](https://inertiajs.com/)** - The modern monolith framework
-   **[Vite](https://vitejs.dev/)** - Frontend Tooling
-   **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework
-   **[MySQL](https://www.mysql.com/)** - Database

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   PHP >= 8.2
-   Node.js & NPM
-   Composer
-   A web server (e.g., Nginx, Apache) or use `php artisan serve`
-   MySQL

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/aryadians/money-tracker.git
    cd money-tracker
    ```

2.  **Install PHP dependencies**
    ```sh
    composer install
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Setup environment file**
    ```sh
    cp .env.example .env
    ```
    *Update your database credentials in the `.env` file.*

5.  **Generate application key**
    ```sh
    php artisan key:generate
    ```

6.  **Run database migrations**
    ```sh
    php artisan migrate
    ```

7.  **Run the development server**
    ```sh
    npm run dev
    ```
    *In a separate terminal:*
    ```sh
    php artisan serve
    ```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgements

-   [Laravel Breeze](https://laravel.com/docs/starter-kits#laravel-breeze)
-   [Chart.js](https://www.chartjs.org)
-   [Headless UI](https://headlessui.com)

---
<div align="center">
Made with ❤️ by [aryadians](https://github.com/aryadians)
</div>