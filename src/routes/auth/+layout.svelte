<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<Toaster position="top-center" />

<main class="w-screen h-screen flex items-center justify-center">
	<div class="p-3 w-full lg:max-w-120">
		{@render children()}
	</div>
</main>