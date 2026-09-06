<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { Spinner } from "$lib/components/ui/spinner/index.js";

	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";
	import { toast } from "svelte-sonner";

	let { form }: PageProps = $props();

	let password = $state('');
	let email = $state('');

	let canSubmit = $state(false);
	let submitting = $state(false);

	function checkValues(): void {
		if (email && password) {
			canSubmit = true;
		} else {
			canSubmit = false;
		}
	}

	$effect(() => {
		if (form?.error) {
			const message = form?.error?.[0];
			if (message) {
				toast.error(message);
				password = '';
			}
		}
	})
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">Log In</Card.Title>
		<Card.Description>Welcome back!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
				canSubmit = false;
			}
		}}  action="?/login" method="POST" class="flex flex-col gap-5" autocomplete="on" oninput={checkValues}>
			<div class="flex flex-col gap-6">
				<span class="grid gap-2">
					<Label for="email">Email</Label>
					<Input bind:value={email} name="email" id="email" type="email" placeholder="example@email.com" required />
				</span>
				<span class="grid gap-2">
					<Label for="password">Password</Label>
					<Input bind:value={password} name="password" id="password" type="password" required />
				</span>
			</div>
			<Separator></Separator>
			<div class="flex flex-col gap-2">
				<Button type="submit" variant={submitting ? 'outline' : 'default'} disabled={!(canSubmit && !submitting)}>
					{#if submitting}
						<Spinner />
					{:else}
						Log In
					{/if}
				</Button>
				<span class="flex items-center justify-center">
					Don't have an account?
					<Button type="button" href={resolve('/auth/signup')} variant="link" class="dark:text-chart-2 underline">Sign Up</Button>
				</span>
			</div>
		</form>
	</Card.Content>
</Card.Root>
