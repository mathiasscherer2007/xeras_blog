import { blogpostService } from "services/BlogpostService";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const blogpostOverviews = await blogpostService.getOverviews(10);

	return { 
		blogpostOverviews: blogpostOverviews?.map(overview => overview.getPrimitive()),
	 };
};