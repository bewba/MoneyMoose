<script>
    export let onSubmit;
</script>

<div class="p-6 dark:bg-gray-900 bg-gray-200 min-h-screen">
    <div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Enter Record Details</h2>
        <form on:submit={onSubmit} method="post" class="space-y-4">
            
            <!-- User ID -->
            <div class="flex flex-col">
                <label for="userId" class="mb-2 font-medium text-gray-700 dark:text-gray-300">User ID (UUID):</label>
                <input type="text" id="userId" name="userId" class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" required>
            </div>

            <!-- Amount -->
            <div class="flex flex-col">
                <label for="amount" class="mb-2 font-medium text-gray-700 dark:text-gray-300">Amount:</label>
                <input type="number" id="amount" name="amount" class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" required>
            </div>

            <!-- Allocation -->
            <div class="flex flex-col">
                <label for="allocation" class="mb-2 font-medium text-gray-700 dark:text-gray-300">Allocation:</label>
                <textarea id="allocation" name="allocation" rows="3" class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" required></textarea>
            </div>

            <!-- Submit Button -->
            <div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>
