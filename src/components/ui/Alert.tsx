import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function Alert({ children }: Props) {
	return (
		<div
			className="inline-block space-x-3 px-4 py-3 rounded bg-red-100 border border-red-400 text-red-700"
			role="alert"
		>
			<strong className="font-bold">Error has occurred!</strong>
			<span>{children}.</span>
		</div>
	);
}
