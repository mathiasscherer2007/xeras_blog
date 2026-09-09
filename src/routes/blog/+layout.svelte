<script lang="ts">
	import Header from '$lib/components/ui/header/Header.svelte';

	let { children } = $props();
</script>

<div>
	<Header />
	<main class="w-full flex items-center justify-center pt-5">
		{@render children()}
	</main>
</div>