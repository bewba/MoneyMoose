<script>
	import { isBudgetAllocationOverlayOpen } from '../store/Popupstore';

	let totalBudget = 1000;
	let budgetType = 'weekly';
	let expenses = 0;
	let investments = 0;
	let bills = 0;
	let other = 0;

	$: remainingBudget = totalBudget - (expenses + investments + bills + other);

	const close = () => {
		const unsub = isBudgetAllocationOverlayOpen.subscribe((data) => {});
		isBudgetAllocationOverlayOpen.set(false);
		unsub();
	};
</script>

<!-- Modal Overlay -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
	on:click={close}
>
	<!-- Modal Content -->
	<div
		class="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
		on:click|stopPropagation
	>
		<form action="?/setBudget" method="POST" class="space-y-6">
			<!-- Budget Amount Input -->
			<div class="flex flex-col">
				<label for="budgetAmount" class="mb-2 font-medium text-gray-700 dark:text-gray-300"
					>Budget Amount:</label
				>
				<input
					type="number"
					id="budgetAmount"
					name = "budgetAmount"
					bind:value={totalBudget}
					step = 0.01
					class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
					required
				/>
			</div>

			<!-- Budget Type (Weekly/Monthly) -->
			<div class="flex items-center space-x-4">
				<label class="font-medium text-gray-700 dark:text-gray-300">Budget Type:</label>
				<div class="flex items-center">
					<input
						type="radio"
						id="weekly"
						name = "budgetType"
						value=0
						bind:group={budgetType}
						class="mr-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
						required
					/>
					<label for="weekly" class="text-gray-700 dark:text-gray-300">Weekly</label>
				</div>
				<div class="flex items-center">
					<input
						type="radio"
						id="monthly"
						name="budgetType"
						value=1
						bind:group={budgetType}
						class="mr-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
					/>
					<label for="monthly" class="text-gray-700 dark:text-gray-300">Monthly</label>
				</div>
			</div>

			<!-- Allocation Sliding Bars -->
			 
			<div class="space-y-4">
				<div class="flex flex-col">
					<label for="Expenses" class="mb-2 font-medium text-gray-700 dark:text-gray-300"
						>Expenses :
						<input
							type="number"
							id="expenses"
							name="expenses"
							step = 0.01
							bind:value={expenses}
                            max={totalBudget}
							class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</label>
					<input
						type="range"
						id="expenses-range"
						min="0"
						max={totalBudget}
						bind:value={expenses}
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
				</div>

				<div class="flex flex-col">
					<label for="Investments" class="mb-2 font-medium text-gray-700 dark:text-gray-300"
						>Investment: 
						<input
							type="number"
							id="investments"
							name="investments"
							step = 0.01
							bind:value={investments}
                            max={totalBudget}
							class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
						</label
					>
					<input
						type="range"
						id="investments-range"
						min="0"
						max={totalBudget}
						bind:value={investments}
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
				</div>

				<div class="flex flex-col">
					<label for="Bills" class="mb-2 font-medium text-gray-700 dark:text-gray-300"
						>Bills: 
						<input
							type="number"
							name="bills"
							id="budgetAmount"
							step = 0.01
							bind:value={bills}
                            max={totalBudget}
							class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
						</label
					>
					<input
						type="range"
						id="bills-range"
						min="0"
						max={totalBudget}
						bind:value={bills}
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
				</div>

				<div class="flex flex-col">
					<label for="Other" class="mb-2 font-medium text-gray-700 dark:text-gray-300"
						>Other: 
						<input
							type="number"
							id="other"
                    		name="other"
							step = 0.01
							bind:value={other}
                            max={totalBudget}
							class="border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
						</label
					>
					<input
						type="range"
						id="other-range"
						min="0"
						max={totalBudget}
						bind:value={other}
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
					/>
				</div>
			</div>

			<!-- Remaining Budget Display -->
			<div class="text-right font-medium text-gray-700 dark:text-gray-300">
				Remaining Budget: <span class="text-blue-500 dark:text-blue-300">{remainingBudget}</span>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-between">
				<div>
					{#if remainingBudget == 0}
					<button
						formaction="?/setBudget"
						class="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
					>
						Submit
					</button>
				{:else}
					<div class="relative group">
						<button
							formaction="?/setBudget"
							class="bg-gray-400 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-500"
							disabled
						>
							Submit
						</button>
						<span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center bg-gray-800 text-white text-xs py-1 px-3 rounded-md shadow-lg opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:bg-gray-700">
							<span class="whitespace-nowrap">Remaining Budget Must be 0 to Submit</span>
						</span>
					</div>
				{/if}
				
				
				</div>
				<div>
				<button
					type="button"
					class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
					on:click={close}
				>
					Close
				</button>
				</div>
			</div>
		</form>
	</div>
</div>
