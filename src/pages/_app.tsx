import SideBar from "@components/SideBar";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import { Outlet } from "@tanstack/router";

export default function App() {
	return (
		<main>
			<Breadcrumbs />
			<div className="flex">
				<SideBar />
				<Outlet />
			</div>
		</main>
	);
}
