# Angular BMS (Building Management System)

Enterprise-ready Angular standalone frontend scaffold for a Building Management System.

## Tech Stack
- Angular 19 (standalone components, strict TypeScript)
- Angular Signals + RxJS
- Reactive Forms
- Tailwind CSS + SCSS
- Role-based routing and JWT interceptor setup

## Prerequisites
- Node.js `>=20.11.1`
- npm 10+

## Install
```bash
npm install
```

## Start Development Server
```bash
npm run start
```

Open `http://localhost:4200`.

## Build
```bash
npm run build
```

## Notes about static assets
This project uses Angular application builder with assets in:
- `src/public/`

Files placed here are copied to the application root during build/serve.

## API Base URL
Configured in `src/environments/environment.ts`:
- `http://localhost:3000/api`

## Implemented Modules
- Auth
- Dashboard
- Buildings
- Users
- Billing
- Parking
- Visitors
- Canteen
- Complaints
- Voting
- Notices
