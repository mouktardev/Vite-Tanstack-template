import { atom } from "nanostores";
export const sidebar = atom<boolean>(true);
export function toggleSidebar() {
	sidebar.set(!sidebar.get());
}
