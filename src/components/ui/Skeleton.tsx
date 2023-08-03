export default function Skeleton() {
	return (
		<div className="container m-5 pt-10 animate-pulse my-10 grid grid-cols-3 gap-4">
			<div className="h-4 bg-slate-400 rounded-full" />
			<div className="h-3 bg-slate-400 rounded-full col-span-3" />
			<div className="h-3 bg-slate-400 rounded-full col-span-2" />
			<div className="h-3 bg-slate-400 rounded-full" />
			<div className="h-[400px] bg-slate-400 col-span-2 rounded-lg" />
			<div className="h-[400px] bg-slate-400 rounded-lg" />
			<div className="h-3 bg-slate-400 rounded-full col-span-3" />
			<div className="h-3 bg-slate-400 rounded-full col-span-3" />
		</div>
	);
}
