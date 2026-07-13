# ecomClient

[![Angular](https://img.shields.io/badge/Angular-0F0F11?style=for-the-badge&logo=angular&logoColor=DD0031)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-0F0F11?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular%20Material-0F0F11?style=for-the-badge&logo=angular&logoColor=DD0031)](https://material.angular.io/)
[![SignalR](https://img.shields.io/badge/SignalR-0F0F11?style=for-the-badge&logo=signalr&logoColor=white)](https://learn.microsoft.com/aspnet/core/signalr/introduction)

Modern e-commerce frontend built with Angular for the `ecom.API` backend.
It provides the customer shopping experience and the administrative dashboard in a single UI.

## Overview

This repository contains the frontend of the e-commerce platform.
It works together with the backend API repository below:

- [ecom.API](https://github.com/melihesensio99/ecom.API)

## Highlights

### Customer Experience
- Product browsing and filtering
- Basket management
- Login and registration
- Order tracking
- Responsive layout for desktop and mobile

### Admin Experience
- Product management
- Order management
- User and role management
- QR code workflows
- File upload flows
- Dashboard overview

## Tech Stack

- Angular 14
- TypeScript
- Angular Material
- RxJS
- SCSS
- JWT authentication
- SignalR client
- NgxSpinner, NgxToastr, AlertifyJS

## Getting Started

### Prerequisites
- Node.js 16+
- Angular CLI

### Install and Run

```bash
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

## Project Structure

- `src/app/ui` - customer-facing pages
- `src/app/admin` - admin dashboard and management pages
- `src/app/services` - API clients, auth, SignalR and helpers
- `src/app/contracts` - request and response models
- `src/app/dialogs` - reusable dialogs
- `screenshots` - preview images used in this README

## Screenshots

### Home and Catalog
<p align="center">
  <img src="screenshots/home.png" width="48%" alt="Home page" />
  <img src="screenshots/products.png" width="48%" alt="Product listing page" />
</p>

### Authentication
<p align="center">
  <img src="screenshots/login.png" width="48%" alt="Login page" />
  <img src="screenshots/register.png" width="48%" alt="Register page" />
</p>

### Basket and Checkout
<p align="center">
  <img src="screenshots/basket.png" width="48%" alt="Basket page" />
  <img src="screenshots/address.png" width="48%" alt="Address page" />
</p>

### Dashboard and Management
<p align="center">
  <img src="screenshots/dashboard.png" width="100%" alt="Admin dashboard" />
</p>
<p align="center">
  <img src="screenshots/orders.png" width="48%" alt="Orders management" />
  <img src="screenshots/qrcode.png" width="48%" alt="QR code page" />
</p>

## Notes

This repository contains the frontend only. It expects the backend API to be available from the `ecom.API` repository.

## Author

Developed by [Melih Esen](https://github.com/melihesensio99)
