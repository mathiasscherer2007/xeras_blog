<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { resolve } from "$app/paths";

	let password = $state('');
	let passwordConfirm = $state('');
	let passwordsMatch = $state(false);

	let email = $state('');

	let canSubmit = $state(false);

	function checkPasswordMatch(): boolean {
		if (password === passwordConfirm && password.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	function checkValues(): void {
		passwordsMatch = checkPasswordMatch();
		if (email && passwordsMatch) {
			canSubmit = true;
		} else {
			canSubmit = false;
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
		<Card.Description>Welcome aboard!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form action="?/signup" method="POST" class="flex flex-col gap-5" autocomplete="off" oninput={checkValues}>
			<div class="flex flex-col gap-6">
				<span class="grid gap-2">
					<Label for="email">Email</Label>
					<Input bind:value={email} id="email" type="email" placeholder="example@email.com" required />
				</span>
				<span class="grid gap-2">
					<Label for="password">Password</Label>
					<Input bind:value={password} id="password" type="password" required />
				</span>
				<span class="grid gap-2">
					<span class="flex flex-row items-center justify-between">
						<Label for="password_confirm">Confirm Password</Label>
						<p class="text-sm leading-none font-medium text-red-400 transition">{passwordsMatch || password.length === 0 ? '' : 'passwords don\'t match'}</p>
					</span>
					<Input bind:value={passwordConfirm} id="password_confirm" type="password" required />
				</span>
			</div>
			<Separator></Separator>
			<div class="flex flex-col gap-2">
				<Button type="submit" disabled={!canSubmit}>Sign Up</Button>
				<span class="flex items-center justify-center">
					Already have an account?
					<Button type="button" href={resolve('/auth/login')} variant="link" class="dark:text-chart-2 underline">Log In</Button>
				</span>
			</div>
		</form>
	</Card.Content>
</Card.Root>
