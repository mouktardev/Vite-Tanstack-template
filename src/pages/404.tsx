import { Link } from "@tanstack/router";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};
export default function NotFound({ children }: Props) {
	return (
		<div className="container mx-auto max-w-[800px] px-5 pt-20">
			<div className="w-full h-full flex flex-col justify-center items-center gap-4">
				<h1 className="scroll-m-20 font-extrabold tracking-tight text-5xl">
					404
				</h1>
				{children}
				<Link
					className="font-semibold border rounded-full px-4 py-2"
					to="/"
					activeOptions={{ exact: true }}
				>
					go back Home
				</Link>
			</div>
		</div>
	);
}
