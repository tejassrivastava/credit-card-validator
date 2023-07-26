import { useAtom } from "jotai";
import {
  cardCvvAtom,
  cardExpiryAtom,
  cardHolderNameAtom,
  cardNumberAtom,
} from "../atom";

const CreditCard = () => {
  const [CardHolderName] = useAtom(cardHolderNameAtom);
  const [CardNumber] = useAtom(cardNumberAtom);
  const [CardExpiry] = useAtom(cardExpiryAtom);
  const [CardCvv] = useAtom(cardCvvAtom);

  return (
    <>
      <aside className="cardDeco">
        <div className="cardFront">
          <span>{CardNumber || "0000 0000 0000 0000"}</span>
          <div>
            <span>{CardHolderName || "Tejas Srivastava"}</span>
            <span>{CardExpiry}</span>
          </div>
        </div>

        <div className="cardBack">
          <span>{CardCvv || "000"}</span>
        </div>
      </aside>
    </>
  );
};

export default CreditCard;
