import { pageVariants } from "@animation/ani";
import CodeCopy from "@components/ui/CodeCopy";
import { PostsSchema } from "@schema/schema";
import { cn } from "@util/util";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { parse } from "zod-matter";
import { postsid } from "../../routes";
export default function PostPage() {
	const {
		state: { data: post },
	} = postsid.useLoader()();
	const { data: frontmatter, content } = parse(post, PostsSchema);
	return (
		<motion.div
			variants={pageVariants}
			className="my-10 text-justify prose prose-invert prose-sm md:prose-lg prose-pre:bg-[rgba(40,44,52,1)]"
		>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{frontmatter.title}
			</h1>
			<ReactMarkdown
				children={content}
				components={{
					pre({ children, className }) {
						return (
							<pre className={cn("relative", className)}>
								<CodeCopy>{children}</CodeCopy>
								{children}
							</pre>
						);
					},
					code({ inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						return !inline && match ? (
							<SyntaxHighlighter
								{...props}
								customStyle={{ borderRadius: "8px" }}
								// className={cn("rounded-lg", className)}
								children={String(children).replace(/\n$/, "")}
								style={oneDark}
								showLineNumbers={true}
								language={match[1]}
								PreTag="div"
							/>
						) : (
							<code {...props} className={className}>
								{children}
							</code>
						);
					},
				}}
			/>
		</motion.div>
	);
}
