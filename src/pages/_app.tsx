import Breadcrumbs from "@components/Breadcrumbs";
import SideBar from "@components/SideBar";
import ThemeToggle from "@components/ThemeToggle";
import { Outlet } from "@tanstack/router";

export default function App() {
	return (
		<main>
			<ThemeToggle className="fixed top-0 right-0 mr-5 py-1 z-50" />
			<Breadcrumbs />
			<div className="flex">
				<SideBar />
				<Outlet />
			</div>
		</main>
	);
}
