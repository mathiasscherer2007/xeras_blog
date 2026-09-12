<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';

	interface Props {
		title: string;
		createdAt: Date;
		slug: string;
		creator?: string;
	}

	let { title, createdAt, slug, creator }: Props = $props();
</script>

<a
	href={resolve('/blog/[year]/[month]/[day]/[slug]', {
		year: createdAt.getFullYear().toString(),
		month: createdAt.getMonth().toString().padStart(2, '0'),
		day: createdAt.getDate().toString().padStart(2, '0'),
		slug: slug
	})}
	class="border py-2 px-3 rounded-xl"
>
	<div class="group flex items-center justify-between">
		<div class="flex-1 max-w-9/10">
			<h1
				class="mb-2 overflow-x-clip text-xl text-ellipsis whitespace-nowrap transition-colors group-hover:text-chart-2"
			>
				{title}
			</h1>
			{#if creator}
				<p>by {creator}</p>
			{/if}
			<p class="opacity-70">{createdAt.toLocaleDateString('en-us')}</p>
		</div>
		<div class="flex h-full items-center justify-center transition group-hover:text-chart-2 ml-2">
			<HugeiconsIcon size="30" icon={ArrowRight} />
		</div>
	</div>
</a>
