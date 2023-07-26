import CreditCard from "./components/CreditCard";
import CardForm from "./components/CardForm";
import CardThanks from "./components/CardThanks";
import "./index.css";
import { useAtom } from "jotai";
import { thankyouAtom } from "./atom";

const App = () => {
  const [thanyou] = useAtom(thankyouAtom);
  return (
    <>
      <CreditCard />
      <main className="cardOverflow">
        <div>{thanyou ? <CardThanks /> : <CardForm />}</div>
      </main>
      <footer className="hidden fixed bottom-0 right-2 text-xs opacity-80 sm:inline-block">
        <p className="m-3">
          Developed By{" "}
          <a
            className="text-blue-900"
            href="https://www.tejassrivastava.com"
            target="_blank"
            rel="noreferrer"
          >
            Tejas Srivastava
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default App;
