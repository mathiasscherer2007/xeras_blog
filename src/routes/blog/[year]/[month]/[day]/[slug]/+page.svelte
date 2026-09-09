<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { Separator } from "$lib/components/ui/separator/index";
	import type { PageProps } from "./$types";
	

	let { data }: PageProps = $props();
</script>

{#snippet footer(username?: string, publishDate: Date)}
	<Separator class="my-1" />
	<p class="mb-5 text-right">By {username ?? 'unknown'} | {publishDate.toLocaleDateString('en-us')}</p> 
{/snippet}

<div class="flex flex-col gap-3 w-200 mx-3 text-justify overflow-y-auto scrollbar-thin">
	<h1 class="text-3xl font-semibold text-center max-w-4/5 mx-auto">{data.blogpost.title}</h1>
	<Separator class="my-1" />
	<div class="blog-content flex flex-col gap-1">
		{@html data.blogpost.content}
	</div>
	{@render footer(data.owner?.username, data.blogpost.createdAt?)}
</div>

<style>
	.blog-content :global(code) {
		background-color: var(--color-card);
		padding: var(--spacing);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing);
		margin: calc(var(--spacing) * 3) 0;
	}

	.blog-content :global(pre) {
		background-color: var(--color-card);
		padding: var(--spacing);
		border: 1px solid var(--color-border);
		border-radius: var(--spacing);
		margin: calc(var(--spacing) * 3) 0;
	}

	.blog-content :global(pre code) {
		background-color: none;
		border: none;
		border-radius: none;
		margin: none;
	}

	.blog-content :global(blockquote) {
		border-left: 2px solid var(--color-primary);
		padding: var(--spacing) calc(var(--spacing) * 4);
		font-style: italic;
		background-color: var(--color-card);
		border-top-right-radius: calc(var(--spacing) * 2);
		border-bottom-right-radius: calc(var(--spacing) * 2);
	}

	.blog-content :global(h2) {
		font-size: var(--text-2xl);
		margin: calc(var(--spacing) * 5) 0 calc(var(--spacing) * 2);
		border-bottom: 1px solid var(--color-border);
	}

	.blog-content :global(p) {
		display: block;
	}

	.blog-content :global(a) {
		color: var(--color-chart-2);
		text-decoration: underline;
		background-color: color-mix(in oklab, var(--primary) 40%, transparent);
		border-radius: var(--spacing);
		padding: 0 var(--spacing);
	}

	.blog-content :global(ul) {
		list-style-type: disc;
		padding-left: calc(var(--spacing) * 5);
	}

	.blog-content :global(ol) {
		list-style-type: number;
		padding-left: calc(var(--spacing) * 5);
	}
	.blog-content :global(ol li::marker) {
		color: var(--color-chart-2);
	}
	.blog-content :global(li) {
		padding-left: var(--spacing);
	}

	.blog-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: calc(var(--spacing) * 3) 0;
		font-size: 0.95rem;
	}

	.blog-content :global(th),
	.blog-content :global(td) {
		padding: calc(var(--spacing) * 2);
		border: 1px solid var(--color-border);
	}

	.blog-content :global(th) {
		font-weight: 600;
		background: var(--color-muted);
	}

	.blog-content :global(tr:nth-child(even)) {
		background: var(--color-card);
	}
</style>