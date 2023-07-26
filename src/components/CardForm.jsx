import "./../index.css";
import { useAtom } from "jotai";
import {
  cardCvvAtom,
  cardExpiryAtom,
  cardHolderNameAtom,
  cardNumberAtom,
  thankyouAtom,
} from "../atom";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CardForm() {
  const [, setCardHolderName] = useAtom(cardHolderNameAtom);
  const [getCardNumber, setCardNumber] = useAtom(cardNumberAtom);
  const [, setCardExpiry] = useAtom(cardExpiryAtom);
  const [, setCardCvv] = useAtom(cardCvvAtom);
  const [cardtype, setcardtype] = useState(null);
  const [, setthankyou] = useAtom(thankyouAtom);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    setthankyou(true);
  };

  const detectCardType = (cardNumber) => {
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    for (const cardType in patterns) {
      if (patterns[cardType].test(cardNumber)) {
        setcardtype(cardType);
      }
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "cardHolderName") {
      setCardHolderName(value);
    }

    if (name === "cardNumber") {
      clearErrors("cardNumber");
      detectCardType(value);
      e.target.value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setCardNumber(
        value
          .replace(/\s/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim()
          .slice(0, 19)
      );
    }
    if (name === "cardExpiry") {
      clearErrors("cardExpiry");
      if (value.length === 2) {
        e.target.value = value + "/";
      }

      setCardExpiry(value.toString());
      validateExpirationDate(value);
    }

    if (name === "cardCvv") {
      clearErrors("cardCvv");
      setCardCvv(
        value
          .toString()
          .replace(/[^0-9]/g, "")
          .substring(0, 3)
      );
      validateCVV(value);
    }
  };

  const validateCardNumber = async (e) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      creditCardNumber: `${e.target.value}`,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const validateCardResponse = await fetch("/api/validate", requestOptions);
    const response = await validateCardResponse.json();

    if (!response.isValid)
      setError("cardNumber", {
        type: "isinvalid",
        message: "Invalid Card Number",
      });
  };

  const validateExpirationDate = (e) => {
    let [expirationMonth, expirationYear] = e.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().substr(2);
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    if (!expirationMonth.toString().match("0[1-9]|1[0-2]")) {
      setError("cardExpiry", {
        type: "mmlcm",
        message: "Invalid Month",
      });
    }

    if (expirationYear < currentYear) {
      setError("cardExpiry", {
        type: "yylcy",
        message: "Expiry Year Can't Be Less Than Current Year",
      });
    } else if (
      expirationYear === currentYear &&
      expirationMonth <= currentMonth
    ) {
      setError("cardExpiry", {
        type: "mmlcm",
        message: "Expiry Month Can't Be Less Than Current Month",
      });
    }
  };

  const validateCVV = (cvv) => {
    const cvvPattern = /^[0-9]{3,4}$/;

    if (!cvvPattern.test(cvv)) {
      setError("cardCvv", {
        type: "invalidcvv",
        message: "Invalid CVV",
      });
    }
  };

  return (
    <>
      <form className="cardForm" onSubmit={handleSubmit(onSubmit)}>
        <div class="w-full flex flex-col py-10">
          <p class="font-bold mb-3">Supported Cards</p>
          <div class="flex gap-5">
            <img src="../../src/assets/visa.svg" alt="Visa" class="w-10" />
            <img
              src="../../src/assets/discover.svg"
              alt="Discover"
              class="w-10"
            />
            <img
              src="../../src/assets/mastercard.svg"
              alt="Mastercard"
              class="w-10"
            />
            <img
              src="../../src/assets/amex.svg"
              alt="American Express"
              class="w-10"
            />
          </div>
        </div>

        <label className="labelname relative w-full flex flex-col font-bold	">
          Cardholder Name
          <input
            type="text"
            placeholder="John Doe"
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300         border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400"
            {...register("cardHolderName", {
              required: {
                value: true,
                message: "Card Holder Name Is Required",
              },
              maxLength: 20,
              onChange: (e) => handleInput(e),
            })}
            aria-invalid={errors.cardHolderName ? "true" : "false"}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
          </svg>
        </label>

        {errors.cardHolderName?.type === "required" && (
          <p class="text-red-600 text-xs" role="alert">
            {errors.cardHolderName.message}
          </p>
        )}

        <p className="info info--hidden" aria-live="polite"></p>

        <label className="labelnumber relative w-full flex flex-col font-bold">
          Card Number
          <input
            type="text"
            placeholder="1234 5678 9123 0000"
            onChange={handleInput}
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400"
            {...register("cardNumber", {
              required: {
                value: true,
                message: "Card Number Is Required",
              },

              onChange: (e) => handleInput(e),
              onBlur: (e) => validateCardNumber(e),
            })}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          {cardtype && (
            <img
              id="cardType"
              src={`../../src/assets/${cardtype}.svg`}
              class="absolute bottom-0 right-0 -mb-0.5 -translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
              alt=""
            />
          )}
        </label>
        {(errors.cardNumber?.type === "required" ||
          errors.cardNumber?.type === "isinvalid") && (
          <p class="text-red-600 text-xs" role="alert">
            {errors.cardNumber.message}
          </p>
        )}
        <p className="info info--hidden" aria-live="polite"></p>

        <label className="labelnumber relative w-full flex flex-col font-bold">
          Expire Date
          <input
            type="text"
            placeholder="MM/YY"
            className=" rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300         border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400"
            maxLength={5}
            {...register("cardExpiry", {
              required: {
                value: true,
                message: "Card Expiry Is Required",
              },
              maxLength: 5,
              onChange: (e) => handleInput(e),
            })}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </label>
        {(errors.cardExpiry?.type === "required" ||
          errors.cardExpiry?.type === "yylcy" ||
          errors.cardExpiry?.type === "mmlcm") && (
          <p class="text-red-600 text-xs" role="alert">
            {errors.cardExpiry.message}
          </p>
        )}
        <p className="info info--hidden" aria-live="polite"></p>
        <label className="labelnumber relative w-full flex flex-col font-bold">
          CVC/CVV
          <input
            type="text"
            placeholder="123"
            className=" rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300        border-gray-300/30 outline-none border-2 border-solid focus:border-blue-400"
            maxLength={3}
            {...register("cardCvv", {
              required: {
                value: true,
                message: "Card CVV Is Required",
              },
              maxLength: 3,
              onChange: (e) => handleInput(e),
            })}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </label>
        {(errors.cardCvv?.type === "required" ||
          errors.cardCvv?.type === "invalidcvv") && (
          <p class="text-red-600 text-xs" role="alert">
            {errors.cardCvv.message}
          </p>
        )}
        <input
          disabled={Object.keys(errors).length > 0}
          type="submit"
          className="btn-submit btn-primary"
        />
      </form>
    </>
  );
}
