<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

{#snippet creator(username: string)}
	<p>By {username}</p>
{/snippet}

<div>
	<h1>{data.blogpost.title}</h1>
	<div>
		<p>{data.blogpost.content}</p>
	</div>
	{#if data.owner}
		{@render creator(data.owner.username)}
	{/if}
</div>