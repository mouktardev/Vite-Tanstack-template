import { Clipboard, ClipboardCheck } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
	children: ReactNode;
};

export default function CodeCopyBtn({ children }: Props) {
	const [copyOk, setCopyOk] = useState(false);

	const handleClick = () => {
		// @ts-ignore: children index type error
		navigator.clipboard.writeText(children[0].props.children[0]);
		console.log(children);
		setCopyOk(true);
		setTimeout(() => {
			setCopyOk(false);
		}, 1000);
	};

	return (
		<button
			className="absolute top-3 right-3 p-2 rounded-lg cursor-pointer hover:bg-white/30"
			onClick={handleClick}
		>
			{copyOk ? (
				<ClipboardCheck className="h-5 w-5" />
			) : (
				<Clipboard className="h-5 w-5" />
			)}
		</button>
	);
}