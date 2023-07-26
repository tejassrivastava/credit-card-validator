import { atom } from 'jotai'

const cardHolderNameAtom = atom("")
const cardNumberAtom = atom("")
const cardExpiryAtom = atom("")
const cardCvvAtom = atom("")
const thankyouAtom = atom(false);

export {
    cardHolderNameAtom,
    cardNumberAtom,
    cardExpiryAtom,
    cardCvvAtom,
    thankyouAtom
}