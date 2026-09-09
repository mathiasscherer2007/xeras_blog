<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<h1>
		<b>{page.status}:</b>
		{page.error?.message}
	</h1>
</div>