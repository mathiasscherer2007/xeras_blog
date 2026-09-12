<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";
	import { Separator } from "$lib/components/ui/separator/index";
	import { Textarea } from "$lib/components/ui/textarea/index";
	import * as Tabs from "$lib/components/ui/tabs/index";
	import { renderSafeMarkdown } from "$lib/utils/MarkdownUtils";
	import { Spinner } from "$lib/components/ui/spinner/index";
	import { Button } from "$lib/components/ui/button/index";
	import { enhance } from "$app/forms";

	let submitting = $state(false);

	let content = $state('**Write your content here.** You can use markdown syntax, if desired.');
	let tabsValue = $state('write');
	let parsedPreview = $state();

	function onValueChange() {
		if (tabsValue === 'preview') {
			parsedPreview = renderSafeMarkdown(content);
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/styles/markdownFormatting.css" />
</svelte:head>

<form use:enhance={() => {
	submitting = true;

	return async ({ update }) => {
		await update();
		submitting = false;
	}
}} action="?/create" method="POST" class="w-200 flex flex-col gap-3" autocomplete="off">
	<h1 class="text-3xl font-semibold">Create a new blogpost</h1>
	<Separator />
	<span class="flex flex-col gap-1">
		<Label for="title">Blogpost Title</Label>
		<Input class="p-4" id="title" name="title" placeholder="ex. What's the deal with Charlemagne?" required/>
	</span>
	<Tabs.Root bind:value={tabsValue} {onValueChange}>
		<span class="flex justify-between">
			<Tabs.List>
				<Tabs.Trigger value="write">Write</Tabs.Trigger>
				<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			</Tabs.List>
			<Button type="submit" class="w-40" disabled={submitting}>
				{#if submitting}
					<Spinner />
				{:else}
					Create Blogpost
				{/if}
			</Button>
		</span>
		<Tabs.Content value="write">
			<Textarea name="content" bind:value={content}  placeholder="write some text here..." required></Textarea>
		</Tabs.Content>
		<Tabs.Content value="preview">
			{#await parsedPreview}
				<Spinner />
			{:then parsed} 
				<div class="blog-content bg-card p-3 rounded-xl">
					{@html parsed}
				</div>
			{/await}
		</Tabs.Content>
	</Tabs.Root>
</form>
