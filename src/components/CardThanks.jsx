import "./../index.css";
import iconComplete from "../assets/icon-complete.svg";
import { useAtom } from "jotai";
import {
  cardCvvAtom,
  cardExpiryAtom,
  cardHolderNameAtom,
  cardNumberAtom,
  thankyouAtom,
} from "../atom";

export default function CardThanks() {
  const [, setCardHolderName] = useAtom(cardHolderNameAtom);
  const [, setCardNumber] = useAtom(cardNumberAtom);
  const [, setCardExpiry] = useAtom(cardExpiryAtom);
  const [, setCardCvv] = useAtom(cardCvvAtom);
  const [, setthankyou] = useAtom(thankyouAtom);
  return (
    <div className="cardThanks">
      <img src={iconComplete} alt="Thank You Icon" className="mx-auto pb-6" />
      <p className="tracking-widest p-4">Thank you!</p>
      <p>We've added your card details</p>
      <button
        className="btn-primary pt-2"
        onClick={() => {
          setCardHolderName("");
          setCardNumber("");
          setCardExpiry("");
          setCardCvv("");
          setthankyou(false);
        }}
      >
        Continue
      </button>
    </div>
  );
}
