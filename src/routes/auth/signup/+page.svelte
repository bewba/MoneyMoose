<script>
    import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/StickyFooter/footer.svelte';
    import { onMount } from 'svelte';
    import { triggerToast } from '../../private/store/Toaststore';

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get('message');
        const duration = parseInt(params.get('duration'), 10) || 4000;
		const type = parseInt(params.get('type'),10)
        if (message) {
            triggerToast(type, message, duration);

            // Remove the query parameters after processing to prevent repeated toasts on refresh
            const url = new URL(window.location);
            url.search = ''; // Clear the query params
            window.history.replaceState({}, document.title, url);
        }
    });
</script>

<html class="dark" lang="en">
    <body class="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
        <Navbar />
        <div class="flex-grow flex items-center justify-center">
            <div class="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Sign Up</h1>
                <form method="POST" action="?/login" class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div class="flex justify-end">
                        <button 
                            formaction="?/signup" 
                            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
		<Footer />
    </body>
</html>
