import { cn } from "@util/util";
import { useState } from "react";
import Loading from "./Loading";

type Props = {
	src?: string;
	alt?: string;
	aspectRatio?: "portrait" | "square";
	width?: number;
	height?: number;
	className?: string;
};
export default function Image({
	src,
	alt,
	aspectRatio = "portrait",
	width,
	height,
	className,
}: Props) {
	const [isLoading, setIsLoading] = useState(true);
	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && (
				<div
					className={cn(
						"flex justify-center items-center object-cover",
						className
					)}
				>
					<Loading />
				</div>
			)}
			<img
				className={cn(
					"object-cover",
					aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
					className
				)}
				alt={alt}
				src={src}
				width={width}
				height={height}
				draggable="false"
				onLoad={handleLoad}
				style={{ display: isLoading ? "none" : "block" }}
			/>
		</>
	);
}
