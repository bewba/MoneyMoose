<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
</script>

<html class="dark" lang="en">
	<body class="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
		<Navbar />
		<div class="flex-grow flex items-center justify-center">
			<div class="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
				<h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Verify OTP</h1>
				<form method="POST" action="?/login" class="space-y-4">
					<div>
						<label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">OTP</label>
						<input 
							id="otp" 
							name="otp" 
							type="number" 
							required 
							class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
							placeholder="Enter your OTP"
						/>
					</div>
					<div class="flex justify-end">
						<button 
							formaction="?/login" 
							class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							Verify OTP
						</button>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>
