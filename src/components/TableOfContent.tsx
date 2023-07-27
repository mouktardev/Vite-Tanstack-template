import { Link } from "@tanstack/router";
import { cn } from "@util/util";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
	slug: string;
};

interface toc {
	id: string;
	text: string;
	level: number;
}

export default function TableOfContent({ slug }: Props) {
	const [headings, setHeadings] = useState<toc[]>([]);

	useEffect(() => {
		const mutationObserver = new MutationObserver(() => {
			const elements = Array.from(
				document.querySelectorAll<HTMLElement>("h2, h3, h4")
			).map((elem) => ({
				id: elem.id,
				text: elem.innerText,
				level: Number(elem.nodeName.charAt(1)),
			}));
			setHeadings(elements);
		});

		// Observe changes to the document body and its descendants
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Initial run to get headings on mount
		const initialElements = Array.from(
			document.querySelectorAll<HTMLElement>("h2, h3, h4")
		).map((elem) => ({
			id: elem.id,
			text: elem.innerText,
			level: Number(elem.nodeName.charAt(1)),
		}));
		setHeadings(initialElements);

		// Cleanup the observer when the component unmounts
		return () => mutationObserver.disconnect();
	}, []);

	return (
		<ul className="sticky w-64 h-full top-10 overflow-auto p-4 mt-10 space-y-5 border shadow-custom backdrop-blur-lg bg-gradient-radial-tl rounded-lg">
			{headings.map((heading) => (
				<li
					key={heading.id}
					className={cn(
						heading.level === 2 ? "font-semibold" : "",
						"flex gap-2 items-center hover:text-purple-400"
					)}
				>
					{heading.level === 3 && <ChevronRight className="h-4 w-4" />}
					<Link
						to="/posts/$postId"
						params={{
							postId: slug,
						}}
						hash={`#${heading.id}`}
						onClick={(e) => {
							e.preventDefault();
							document.querySelector(`#${heading.id}`)?.scrollIntoView({
								behavior: "smooth",
							});
						}}
					>
						{heading.text}
					</Link>
				</li>
			))}
		</ul>
		// <ul>
		// 	{headings.map((heading) => (
		// 		<li
		// 			key={heading.id}
		// 			className={heading.id === activeId ? "text-purple-500" : ""}
		// 		>
		// 			<Link
		// 				to="/posts/$postId"
		// 				params={{
		// 					postId: slug,
		// 				}}
		// 				hash={`${heading.id}`}
		// 				// onClick={(e) => {
		// 				// 	e.preventDefault();
		// 				// 	document.querySelector(`#${heading.id}`)?.scrollIntoView({
		// 				// 		behavior: "smooth",
		// 				// 	});
		// 				// }}
		// 			>
		// 				{heading.title}
		// 			</Link>
		// 			{/* {heading.items.length > 0 && (
		// 				<ul>
		// 					{heading.items.map((child) => (
		// 						<li
		// 							key={child.id}
		// 							className={cn(
		// 								"pl-4",
		// 								child.id === activeId ? "text-purple-500" : ""
		// 							)}
		// 						>
		// 							<Link
		// 								hash={`${child.id}`}
		// 								// onClick={(e) => {
		// 								// 	e.preventDefault();
		// 								// 	document.querySelector(`#${child.id}`)?.scrollIntoView({
		// 								// 		behavior: "smooth",
		// 								// 	});
		// 								// }}
		// 							>
		// 								{child.title}
		// 							</Link>
		// 						</li>
		// 					))}
		// 				</ul>
		// 			)} */}
		// 		</li>
		// 	))}
		// </ul>
	);
}
