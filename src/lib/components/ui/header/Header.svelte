<script>
	import { resolve } from "$app/paths";
	import { mode, toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";

	import { Moon02Icon, Sun02Icon, GithubIcon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
</script>
<scrpit lang="ts">

</scrpit>

<header class="h-18 border-b flex items-center justify-center">
	<div class="flex items-center justify-between w-300 max-w-full mx-5">
		<div>
			<a href={resolve('/blog')} class="font-bold text-lg hover:text-chart-2">XerasBlog.com</a>
		</div>
		<div>
			<Button onclick={toggleMode} size="icon-lg" aria-label="toggle theme" variant="outline">
				{#if mode.current == 'light'}
					<HugeiconsIcon icon={Moon02Icon} />
				{:else}
					<HugeiconsIcon icon={Sun02Icon} />
				{/if}
			</Button>
			<Button href='https://github.com/mathiasscherer2007/xeras_blog' size="icon-lg" aria-label="go to github" variant="outline">
				<HugeiconsIcon  icon={GithubIcon} />
			</Button>
		</div>
	</div>
</header>