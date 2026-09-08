<script lang="ts">
	import BlogpostOverview from "$lib/components/ui/blogpost-overview/BlogpostOverview.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div>
	{#each data.blogpostOverviews as { title, createdAt, slug, id } (id) }
		<BlogpostOverview {title} {createdAt} {slug} />
	{/each}
</div>