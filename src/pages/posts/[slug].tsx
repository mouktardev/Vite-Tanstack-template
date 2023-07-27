import { slideInLeft } from "@animation/ani";
import CodeCopy from "@components/CodeCopy";
import { PostsSchema } from "@schema/schema";
import { cn, flatten } from "@util/util";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import Toc from "react-toc";
import TableOfContent from "@components/TableOfContent";
import { parse } from "zod-matter";
import { postsid } from "../../routes";

interface HeadingRendererProps {
	level: number;
	children: ReactNode;
}

const HeadingRenderer = (props: HeadingRendererProps) => {
	const children = React.Children.toArray(props.children);
	const text = children.reduce(flatten, "") as string;
	const slug = text.toLowerCase().replace(/[!?\s]/g, "-");
	return React.createElement(
		"h" + props.level,
		{ id: slug, className: "anchor" },
		props.children
	);
};

export default function PostPage() {
	const {
		state: { data: post },
	} = postsid.useLoader()();
	const { data: frontmatter, content } = parse(post, PostsSchema);

	return (
		<div className="relative justify-center gap-4 flex">
			<motion.div
				variants={slideInLeft}
				className="w-full mt-10 text-justify prose prose-invert prose-sm md:prose-lg prose-pre:bg-[rgba(40,44,52,1)]"
			>
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{frontmatter.title}
				</h1>
				<ReactMarkdown
					children={content}
					components={{
						h3: HeadingRenderer,
						h2: HeadingRenderer,
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
									// customStyle={{ borderRadius: "8px" }}
									// className={cn("rounded-3xl", className)}
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
			<TableOfContent slug={frontmatter.slug} />
		</div>
	);
}
