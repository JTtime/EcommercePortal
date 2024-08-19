import { atom, selector } from "recoil";

const cartItemsByUser = atom({
    key: "cartItemsByUser",
    default: []
})


export {cartItemsByUser}