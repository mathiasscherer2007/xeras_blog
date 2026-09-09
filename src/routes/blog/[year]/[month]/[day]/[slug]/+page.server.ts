import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { renderSafeMarkdown } from "$lib/utils/MarkdownUtils";

export const load: PageServerLoad = async ({ params }) => {
	const blogpost = await blogpostService.getBySlug(params.slug);

	if (!blogpost || !blogpost.blogpost) {
		throw error(404, 'Not found');
	}

	const blogpostPrimitve = blogpost.blogpost.getPrimitve();
	blogpostPrimitve.content = await renderSafeMarkdown(blogpostPrimitve.content);

	return {
		blogpost: blogpostPrimitve,
		owner: blogpost.owner?.getPrimitve()
	};
};