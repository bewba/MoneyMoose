<script>
	import { createEventDispatcher } from "svelte";
    import {isMoneyInOverlayOpen } from "../../private/store/Popupstore"
    // export let onSubmit;

    export let show = true;
    
    const close = () => {
      const unsub = isMoneyInOverlayOpen.subscribe(data => {})
      
      isMoneyInOverlayOpen.set(false)
      unsub()
    };

    const onSubmit = () => {
    
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fixed top-12     left-0 w-full h-full bg-black bg-opacity-75 z-50" on:click={close}>
    <div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md" on:click|stopPropagation>
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Money In</h2>
        <form action="?/moneyin" method="POST" class="space-y-4">
            
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

            <!-- Buttons -->
            <div class="flex justify-between">
                <button 
                    formaction="?/moneyin" 
                    class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Submit
                </button>
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400" on:click={close}>
                    Close
                </button>
            </div>
        </form>
    </div>
</div>
