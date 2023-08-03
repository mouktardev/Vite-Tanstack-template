import { theme, toggleTheme } from "@hooks/store";
import { useStore } from "@nanostores/react";
import { cn } from "@util/util";
import { Moon, SunMedium } from "lucide-react";
import { useEffect } from "react";
import Button from "./ui/Button";
type Props = {
	className?: string;
};
export default function ThemeToggle({ className }: Props) {
	const isDark = useStore(theme);
	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	return (
		<div className={cn(className)}>
			<Button
				className="p-2 border bg-black/30 shadow-custom backdrop-blur-md bg-gradient-radial-tb-light dark:bg-gradient-radial-tb"
				onClick={toggleTheme}
			>
				{isDark ? (
					<Moon className="h-4 w-4 text-neutral-300" />
				) : (
					<SunMedium className="h-4 w-4 text-neutral-600" />
				)}
			</Button>
		</div>
	);
}
