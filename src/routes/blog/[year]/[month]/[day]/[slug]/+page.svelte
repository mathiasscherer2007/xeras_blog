<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { Separator } from "$lib/components/ui/separator/index";
	import type { PageProps } from "./$types";
	import { renderUnsafeMarkdown, sanitizeMarkdown } from "$lib/utils/MarkdownUtils";
	import { Spinner } from "$lib/components/ui/spinner/index";

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/styles/markdownFormatting.css" />
</svelte:head>

{#snippet footer(publishDate: Date, username?: string)}
	<Separator class="my-1" />
	<p class="mb-5 text-right">By {username ?? 'unknown'} | {publishDate.toLocaleDateString('en-us')}</p> 
{/snippet}

<div class="flex flex-col gap-3 w-200 mx-3 text-justify overflow-y-auto scrollbar-thin">
	<h1 class="text-3xl font-semibold text-center max-w-4/5 mx-auto">{data.blogpost.title}</h1>
	<Separator class="my-1" />
	<div class="blog-content flex flex-col gap-1">
		{#await renderUnsafeMarkdown(data.blogpost.content)}
			<span class="w-full flex items-center justify-center h-10">
				<Spinner />
			</span>
		{:then content} 
			{@html sanitizeMarkdown(content)}
		{/await}
	</div>
	{@render footer(data.blogpost.createdAt ?? new Date(), data.owner?.username)}
</div>