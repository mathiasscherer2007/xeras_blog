import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const blogpostOverviews = await blogpostService.getOverviews(10);

	return { 
		blogpostOverviews: blogpostOverviews?.map(overview => overview.getPrimitive()),
		userRole: locals.user?.role
	 };
};