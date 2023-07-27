import Breadcrumbs from "@components/Breadcrumbs";
import SideBar from "@components/SideBar";
import { Outlet } from "@tanstack/router";

export default function App() {
	// const location = useMatch().state.status;
	// useEffect(() => {
	// 	console.log(location);
	// }, [location]);

	return (
		// <AnimatePresence mode="wait">
		<main>
			<div className="relative flex justify-center items-center">
				<Breadcrumbs />
			</div>
			<div className="flex">
				<SideBar />
				<Outlet />
			</div>
		</main>
		// </AnimatePresence>
	);
}
