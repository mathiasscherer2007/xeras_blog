<script lang="ts">
	import Header from '$lib/components/ui/header/Header.svelte';

	let { children } = $props();
</script>

<div>
	<Header />
	<main>
		{@render children()}
	</main>
</div>