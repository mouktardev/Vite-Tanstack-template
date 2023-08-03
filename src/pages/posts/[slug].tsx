import CodeCopy from "@components/CodeCopy";
import TableOfContent from "@components/TableOfContent";
import Image from "@components/ui/Image";
import { PostsSchema } from "@schema/schema";
import { Link } from "@tanstack/router";
import { cn, flatten } from "@util/util";
import { ChevronLeft } from "lucide-react";
import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
	const { data: post } = postsid.useLoader()();
	const { data: frontmatter, content } = parse(post, PostsSchema);

	return (
		<div className="container m-5 pt-10">
			<Image className="w-full h-52" src={frontmatter.image.src}></Image>
			<h1 className="scroll-m-20 my-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{frontmatter.title}
			</h1>
			<Link
				className="inline-flex gap-4 px-4 py-2 my-4 items-center rounded-full border"
				to="/posts"
			>
				<ChevronLeft className="w-5 h-5" />
				Back to Posts
			</Link>
			<div className="relative flex gap-6">
				<div className="w-full p-5 mt-10 text-justify prose dark:prose-invert prose-sm md:prose-lg prose-pre:bg-[rgba(40,44,52,1)] border shadow-custom backdrop-blur-lg bg-gradient-radial-tl rounded-lg">
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
				</div>
				<TableOfContent slug={frontmatter.slug} />
			</div>
		</div>
	);
}
