import { atom } from "nanostores";

export const theme = atom<boolean>(localStorage.getItem("theme") === "dark");
export const toggleTheme = () => theme.set(!theme.get());
