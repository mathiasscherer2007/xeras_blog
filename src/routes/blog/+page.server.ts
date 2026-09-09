import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const blogpostOverviews = await blogpostService.getOverviews();

	return { 
		blogpostOverviews: blogpostOverviews?.map(overview => overview.getPrimitve()),
		userRole: locals.user?.role
	 };
};