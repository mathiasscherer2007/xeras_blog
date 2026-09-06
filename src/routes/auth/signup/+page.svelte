<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { toast } from "svelte-sonner";
	import { Spinner } from "$lib/components/ui/spinner/index.js";

	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import { fade } from "svelte/transition";
	import type { PageProps } from "./$types";

	let { form }: PageProps = $props();

	let password = $state('');
	let passwordConfirm = $state('');
	let passwordsMatch = $state(false);

	let username = $state('');
	let email = $state('');

	let canSubmit = $state(false);
	let submitting = $state(false);

	function checkPasswordMatch(): boolean {
		if (password === passwordConfirm && password.length >= 3) {
			return true;
		} else {
			return false;
		}
	}

	function checkValues(): void {
		passwordsMatch = checkPasswordMatch();
		if (username.length >= 3 && email && passwordsMatch) {
			canSubmit = true;
		} else {
			canSubmit = false;
		}
	}

	$effect(() => {
		const message = form?.error?.[0];
		if (message) {
			toast.error(message);
			password = '';
			passwordConfirm = '';
		}
	})
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Welcome aboard!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form use:enhance={() => {
			submitting = true;

			return async ({ update }) => {
				await update();
				submitting = false;
				canSubmit = false;
			}
		}} action="?/signup" method="POST" class="flex flex-col gap-5" autocomplete="off" oninput={checkValues}>
			<div class="flex flex-col gap-6">
				<span class="grid gap-2">
					<Label for="username">Username</Label>
					<Input bind:value={username} id="username" name="username" type="text" required />
					<Card.Description>Username must be 3 characters or longer</Card.Description>
				</span>
				<span class="grid gap-2">
					<Label for="email">Email</Label>
					<Input bind:value={email} id="email" name="email" type="email" placeholder="example@email.com" required />
				</span>
				<span class="grid gap-2">
					<Label for="password">Password</Label>
					<Input bind:value={password} id="password" name="password" type="password" required />
					<Card.Description>Password must be 3 characters or longer</Card.Description>
				</span>
				<span class="grid gap-2">
					<span class="flex flex-row items-center justify-between">
						<Label for="passwordConfirm">Confirm Password</Label>
						{#if !passwordsMatch && password.length > 0}
							<p in:fade={{ duration: 100 }} out:fade={{ duration: 100 }} class="text-sm leading-none font-medium text-red-400">passwords don't match</p>
						{/if}
					</span>
					<Input bind:value={passwordConfirm} id="passwordConfirm" name="passwordConfirm" type="password" required />
				</span>
			</div>
			<Separator />
			<div class="flex flex-col gap-2">
				<Button type="submit" variant={submitting ? 'outline' : 'default'} disabled={!(canSubmit && !submitting)}>
					{#if submitting}
						<Spinner />
					{:else}
						Sign Up
					{/if}
				</Button>
				<span class="flex items-center justify-center">
					Already have an account?
					<Button type="button" href={resolve('/auth/login')} variant="link" class="dark:text-chart-2 underline">Log In</Button>
				</span>
			</div>
		</form>
	</Card.Content>
</Card.Root>
