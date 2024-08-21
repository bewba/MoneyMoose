<script>
    import { isMoneyInOverlayOpen } from "../../private/store/Popupstore";

    export let show = true;
    
    const close = () => {
        const unsub = isMoneyInOverlayOpen.subscribe(data => {});
        isMoneyInOverlayOpen.set(false);
        unsub();
    };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" on:click={close}>
    <div class="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md" on:click|stopPropagation>
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Money In</h2>
        <form action="?/moneyin" method="POST" class="space-y-4">
            
            <!-- Amount -->
            <div class="flex flex-col">
                <label for="amount" class="mb-2 font-medium text-gray-700 dark:text-gray-300">Amount:</label>
                <input 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" 
                    required>
            </div>

            <!-- Dropdown -->
            <div class="flex flex-col">
                <label for="category" class="mb-2 font-medium text-gray-700 dark:text-gray-300">Category:</label>
                <select 
                    id="category" 
                    name="category" 
                    class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="Side Hustle">Side Hustle</option>
                    <option value="Gift">Gift</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <!-- Allocation -->
            <div class="flex flex-col">
                <label for="allocation" class="mb-2 font-medium text-gray-700 dark:text-gray-300">Allocation:</label>
                <textarea id="allocation" name="allocation" rows="3" class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex justify-between">
                <button 
                    formaction="?/moneyin" 
                    class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Submit
                </button>
                <button 
                    type="button" 
                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400" 
                    on:click={close}>
                    Close
                </button>
            </div>
        </form>
    </div>
</div>
