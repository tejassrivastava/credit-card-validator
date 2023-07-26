import express from "express";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());

//validation logic of credit card using Luhn Algorithm
const isValidCreditCard = (creditCardNumber) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = creditCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(creditCardNumber.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

app.post("/api/validate", (req, res) => {
  const creditCardNumber = req.body.creditCardNumber.replace(/\s/g, "");
  const isValid = isValidCreditCard(creditCardNumber);
  res.json({ isValid });
});
