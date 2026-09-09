import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const blogpost = await blogpostService.getBySlug(params.slug);

	if (!blogpost || !blogpost.blogpost) {
		throw error(404, 'Not found');
	}

	return {
		blogpost: blogpost.blogpost.getPrimitive(),
		owner: blogpost.owner?.getPrimitive()
	};
};