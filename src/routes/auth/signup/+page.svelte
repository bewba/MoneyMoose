<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
</script>

<html class="dark" lang = "eng">
	<Navbar />
	<div class="py-20 bg-gray-100 dark:bg-gray-800">
		<form method="POST" action="?/login">
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<button formaction="?/signup">Create Account</button>
		</form>
	</div>
</html>
