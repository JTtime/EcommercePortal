import { atom, selector } from "recoil";

const userDetails = atom({
    key: "userDetails",
    default: {}
})


export {userDetails}