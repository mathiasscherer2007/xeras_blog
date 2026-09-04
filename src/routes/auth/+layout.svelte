<script lang="ts">
	let { children } = $props();
</script>

<main class="w-screen h-screen flex items-center justify-center">
	<div class="p-3 w-full lg:max-w-120">
		{@render children()}
	</div>
</main>