# Architecture

This project is a microservices application with the following services:

- **auth-service**: Handles user authentication (signup, login).
  - Port: 8000
  - Endpoints:
    - `POST /signup`: Create a new user.
    - `POST /login`: Log in a user and get a JWT.
    - `GET /healthz`: Health check.
- **catalog-service**: Manages products.
  - Port: 8001
  - Endpoints:
    - `POST /products`: Create a new product.
    - `GET /products`: Get a list of all products.
    - `GET /healthz`: Health check.
- **orders-service**: Manages orders.
  - Port: 8002
  - Endpoints:
    - `POST /orders`: Create a new order.
    - `GET /orders`: Get a list of all orders.
    - `GET /healthz`: Health check.
