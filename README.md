# FHL Logistics Delivery Orders API

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Seeding the Database](#seeding-the-database)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Project Structure](#project-structure)
- [Main Endpoints](#main-endpoints)
- [Roles & Permissions](#roles--permissions)
- [Conventional Commits & Branching](#conventional-commits--branching)
- [Author](#author)

---

## Project Overview

This API is designed for FHL Logistics to manage the lifecycle of delivery orders. It replaces manual spreadsheet processes, enabling efficient order tracking, client management, and warehouse/product stock control.

## Features

- User authentication with JWT (admin & analyst roles)
- CRUD for clients, warehouses, products, and orders
- Logical deletion for products
- Stock validation for order creation
- Order status management (pending, in_transit, delivered)
- Client address management
- Protected endpoints based on user roles
- Database seeding for testing/demo
- Swagger API documentation

## Tech Stack

- Node.js (v18+)
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL
- JWT (jsonwebtoken)
- Swagger (swagger-jsdoc, swagger-ui-express)
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker & Docker Compose

### Installation

Clone the repository:

```bash
git clone https://github.com/Ajvilla99/assesment-node

cd assesment-node
```

### Environment Variables

Create a `.env` file in the root directory. Example:

```
# .env.example
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fhl_logistics
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Running with Docker Compose

Start the application and the PostgreSQL database with:

```bash
docker-compose up --build
```

- The API will be available at `http://localhost:3000/`.
- The PostgreSQL database will be available at `localhost:5432` (inside Docker network as `db:5432`).

### Seeding the Database

Seeders populate the database with demo data (users, clients, warehouses, products, orders, addresses).

After the containers are up, you can run the seeders with:

```bash
docker-compose exec app npm run seed
# or
docker-compose exec app npx ts-node src/seeders/runAllSeeders.ts
```

## API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

You can test all endpoints and view schemas directly from the browser.

## Project Structure

```
src/
  modules/
    user/
    client/
    address/
    warehouse/
    product/
    order/
  seeders/
  config/
  ...
```

- `modules/`: Contains all domain modules (models, controllers, services, routes, DAOs, DTOs)
- `seeders/`: Database seeding scripts
- `config/`: Database and environment configuration

## Main Endpoints

### Auth

- `POST /auth/login` — User login (returns JWT)
- `POST /auth/register` — Register new user

### Clients

- `GET /clients` — List all clients (protected)
- `POST /clients` — Create client (admin only)
- `POST /clients/search` — Find client by DNI

### Warehouses

- `GET /warehouses` — List all warehouses (protected)
- `PATCH /warehouses/:id/status` — Activate/deactivate warehouse (admin only)

### Products

- `GET /products` — List all products
- `GET /products/:code` — Get product by code
- `DELETE /products/:code` — Logical delete of product (admin only)

### Orders

- `GET /orders` — List all orders (protected)
- `POST /orders` — Create order (admin only)
- `PATCH /orders/status` — Update order status (admin/analyst)
- `GET /orders/client/:clientId` — Get order history for a client

## Roles & Permissions

| Role      | Clients CRUD | Warehouses CRUD | Products CRUD | Orders CRUD | Update Order Status | View Orders/Clients |
|-----------|:------------:|:---------------:|:-------------:|:-----------:|:-------------------:|:-------------------:|
| Admin     |      ✔️      |       ✔️        |      ✔️       |     ✔️      |         ✔️          |         ✔️          |
| Analyst   |      ❌      |       ❌        |      ❌       |     ❌      |         ✔️          |         ✔️          |

- All endpoints are protected by JWT and role-based middleware.

## Conventional Commits & Branching

- Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.
- Branching strategy:
  - `main`: Production-ready code
  - `develop`: Integration branch for features
  - `feature/*`: Feature branches

## Author

- **Name:** Abrahan Villa
- **Clan:** Macondo - Nest/Node
- **Contact:** ajvilla1999@gmail.com

---

## Additional Notes

- All code is commented and follows clean code practices.
- For any issues, please open an issue on the repository.

