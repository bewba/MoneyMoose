<script>
    import { Toast } from 'flowbite-svelte';
    import { slide } from 'svelte/transition';
    import { CheckCircleSolid } from 'flowbite-svelte-icons';
    import { toastStore } from '../../../routes/private/store/Toaststore';
    import { tick, onDestroy } from 'svelte';

    let showToast = false;
    let message = '';
    let progress = 100;
    let interval;
    let duration = 4000;

    const unsubscribe = toastStore.subscribe(({ show, message: msg, duration: dur }) => {
        if (show) {
            showToast = true;
            message = msg;
            duration = dur;
            startProgress();
        }
    });

    function startProgress() {
        progress = 100;
        const intervalDuration = 50; // Update every 50ms
        const decrement = (100 / duration) * intervalDuration;

        clearInterval(interval); // Clear any existing interval to avoid overlap

        interval = setInterval(() => {
            progress -= decrement;
            if (progress <= 0) {
                progress = 0;
                closeToast(); // Close the toast when progress is complete
            }
            tick(); // Ensure the DOM is updated
        }, intervalDuration);
    }

    function closeToast() {
        showToast = false;
        clearInterval(interval); // Stop the interval once done

        // Reset the store to allow future toasts to be triggered
        toastStore.set({ show: false, message: '', duration: 4000 });
    }

    onDestroy(() => {
        clearInterval(interval); // Clean up the interval if the component is destroyed
        unsubscribe(); // Unsubscribe from the store when the component is destroyed
    });
</script>

{#if showToast}
<Toast transition={slide} class="mb-4 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
    <div class="flex items-center">
        <CheckCircleSolid slot="icon" class="w-6 h-6 text-green-500 mr-3 dark:text-green-400" on:click={closeToast} />
        <div class="flex-1">
            <h1 class="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">{message}</h1>
            <div class="relative mt-2">
                <div class="h-1 bg-blue-500" style="width: {progress}%;"></div>
            </div>
        </div>
    </div>
</Toast>
{/if}
