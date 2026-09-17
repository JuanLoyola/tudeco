# Tudeco Project

This is a backend application built with NestJS and TypeScript.

## 🚀 Features

This project implements a robust backend service with the following key features and technologies:

*   **Backend Framework**: NestJS for building scalable and maintainable server-side applications.
*   **Language**: TypeScript for strong typing and modern development practices.
*   **Database**: PostgreSQL, managed via Prisma for database access and schema definition.
*   **API Documentation**: Swagger is configured for automatic API documentation.
*   **Testing**: Comprehensive testing is implemented for both unit and end-to-end (E2E) scenarios.

## 📂 Project Structure

The project is structured to separate concerns logically:

*   **`src/`**: Contains the core application logic, including controllers, modules, services, and main application entry point.
*   **`prisma/`**: Defines the database schema using Prisma, including `schema.prisma`.
*   **`test/`**: Houses all test files for unit and end-to-end tests.

## 🛠️ Setup

To get started with the project, follow these steps:

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**: Run `npm install` (or `yarn install`).
3.  **Configure Environment Variables**: Set up your environment variables (e.g., `.env` file) for database connection and application settings.
4.  **Database Migration**: Apply the Prisma schema to your PostgreSQL database: `npx prisma migrate dev --name init`.
5.  **Run Application**: Start the NestJS application: `npm run start:dev`.

## 📚 Technologies Used

*   **Backend**: NestJS
*   **Language**: TypeScript
*   **ORM/Database**: Prisma with PostgreSQL
*   **API Docs**: Swagger
*   **Testing**: Vitest for unit and e2e testing

## 📄 License

This project is licensed under the [MIT License](LICENSE).
