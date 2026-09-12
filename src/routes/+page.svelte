<script lang="ts">
	import { resolve } from "$app/paths";
	import { redirect } from "@sveltejs/kit";

	redirect(303, resolve('/blog'));
</script>

<!-- Nothing to see here! -->