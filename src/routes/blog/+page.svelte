<script lang="ts">
	import BlogpostOverview from "$lib/components/ui/blogpost-overview/BlogpostOverview.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Plus } from "@hugeicons/core-free-icons";

	import { resolve } from "$app/paths";
	import type { PageProps } from "./$types";
	import { Separator } from "$lib/components/ui/separator/index";

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-2 w-250 mx-3 overflow-y-auto scrollbar-thin mb-5">
	{#if data.userRole === 'admin'}
		<Button href={resolve('/blog/create')}><HugeiconsIcon icon={Plus} />Create Blogpost</Button>
		<Separator class="my-2" />
	{/if}

	{#each data.blogpostOverviews as { title, createdAt, slug, id } (id) }
		<BlogpostOverview {title} {createdAt} {slug} />
	{/each}
	
	{#if !data.blogpostOverviews || data.blogpostOverviews?.length === 0}
		<p class="opacity-60 text-center">No blogposts found</p>
	{/if}
</div>