# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Cinnamon Bliss - Frontend

## Project Overview
Cinnamon Bliss is a full-stack client-server application developed as part of the final coursework. This README provides setup and execution instructions for the **frontend** of the project, which is built using React with TypeScript, Redux, and Redux Thunk.

## Features
- React with TypeScript for type-safe development
- Redux for state management
- React Router for client-side routing
- Axios for API communication
- Secure authentication with JWT

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (>= 16.x)
- npm or yarn

## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/ruwibdilshani/cinnamon_bliss_frontend.git
cd cinnamon-bliss/client
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `client` directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the Frontend Application
```sh
npm start
```
The React app will run at `http://localhost:3000`.

## Project Structure
```
client/
│── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   ├── store/
│   │   ├── authSlice.ts
│   │   ├── store.ts
│   ├── services/
│   │   ├── api.ts
│   ├── App.tsx
│   ├── index.tsx
│── .env
│── package.json
│── tsconfig.json
```

## Running the Application
1. Ensure the backend is running at `http://localhost:5000`
2. Start the frontend using `npm start`
3. Open `http://localhost:3000` in your browser
