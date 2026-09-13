import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const data = await blogpostService.getBySlug(params.slug);

	if (!data || !data.blogpost) {
		throw error(404, 'Not found');
	}

	return {
		blogpost: data.blogpost.getPrimitve(),
		owner: data.owner?.getPrimitve()
	};
};