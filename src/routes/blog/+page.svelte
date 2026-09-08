<script lang="ts">
	import BlogpostOverview from "$lib/components/ui/blogpost-overview/BlogpostOverview.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>


<div class="w-full flex items-center justify-center pt-5">
	<div class="flex flex-col gap-2 w-250">
		{#each data.blogpostOverviews as { title, createdAt, slug, id } (id) }
			<BlogpostOverview {title} {createdAt} {slug} />
		{/each}
	</div>
</div>
