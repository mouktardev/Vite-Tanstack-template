import axios from "axios";
import { z } from "zod";
import { parse } from "zod-matter";

export const PostsSchema = z.object({
	id: z.coerce.number(),
	slug: z.string().max(16),
	title: z.string(),
});

export async function PostsFrontmatter() {
	console.log(`Fetching posts`);
	const markdownFiles = import.meta.glob("/markdown/*.md");
	const frontmatters = [];
	for (const post in markdownFiles) {
		const response = await axios.get(post);
		const markdownContent = await response.data;
		const frontmatter = parse(markdownContent, PostsSchema).data;
		frontmatters.push(frontmatter);
	}
	return frontmatters;
}

export async function fetchPost(postId: string) {
	console.log(`Fetching post with id ${postId}...`);
	// await new Promise((r) => setTimeout(r, 5000));
	const post = await axios
		.get(`/markdown/${postId}.md`)
		.then((res) => res.data);
	if (!post) {
		throw new Error(`Post with id "${postId}" not found!`);
	}
	return post;
}
