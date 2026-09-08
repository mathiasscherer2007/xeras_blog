<script lang="ts">
	import { resolve } from "$app/paths";

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
>
	<h1>{title}</h1>
	{#if creator}
		<p>by {creator}</p>
	{/if}
	<p>{createdAt.toLocaleDateString('en-us')}</p>
</a>
