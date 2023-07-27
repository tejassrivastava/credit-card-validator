# Credit Card Validator Using Luhn Algorithm

This project has been created using Vite. Frontend is built using React.js and backend is built using Express.js.

# About the project implementation

## Tech Stack

- Frontend Framework: React.js
- Backend Framework: Express.js
- CSS Framework: TailwindCSS
- State Management: Jotai
- Form Handling: React-Hooks-Form
- Build Tool: Vitejs

## Run Locally

Clone the project

```bash
 git clone https://github.com/tejassrivastava/credit-card-validator.git
```

Go to the project directory

```bash
  cd pb_credit_card_validator
```

Install dependencies

```bash
  npm install
```

Start the server:

this command will automatically start both the frontend as well as express server.

```bash
  npm run dev
```

Navigate to:

```bash
http://localhost:5173/
```

API server

```bash
http://localhost:5173/api/validate
```

## API Reference

#### Validate Credit Card

```http
  POST /api/validate
```

| Body Parameter     | Type     | Description   |
| :----------------- | :------- | :------------ |
| `creditCardNumber` | `string` | **Required**. |

#### Returns Credit Card Number Valid Status

```
{isValid: <Boolean>}
```

## Authors

- [@tejassrivastava](https://www.github.com/tejassrivastava)
