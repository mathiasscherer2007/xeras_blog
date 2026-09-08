<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>
	<b>{page.status}:</b>
	{page.error?.message}
</h1>