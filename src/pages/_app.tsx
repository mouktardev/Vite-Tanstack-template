import Breadcrumbs from "@components/Breadcrumbs";
import SideBar from "@components/SideBar";
import { Outlet } from "@tanstack/router";

export default function App() {
	return (
		<main>
			{/* <div className="relative flex justify-center items-center"> */}
			<Breadcrumbs />
			{/* </div> */}
			<div className="flex">
				<SideBar />
				<Outlet />
			</div>
		</main>
	);
}
