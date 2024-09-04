<script>
	import { isMoneyInOverlayOpen, isBudgetAllocationOverlayOpen } from '../../../routes/private/store/Popupstore';
	import { isMoneyOutOverlayOpen } from '../../../routes/private/store/Popupstore';
	import MoneyOutIcon from '../MoneyOutIcon/MoneyIcon.svelte';
	import MoneyInIcon from '../MoneyInIcon/MoneyInIcon.svelte';
	import BudgetAllocation from '../BudgetAllocation/budgetAllocation.svelte';
	import { DarkMode } from 'flowbite-svelte';
	const isMoneyInOverlayOpenFun = () => {
		const unsub = isMoneyInOverlayOpen.subscribe((data) => {});
		isMoneyInOverlayOpen.set(true);
		unsub();
	};

	const isMoneyOutOverlayOpenFun = () => {
		const unsub = isMoneyOutOverlayOpen.subscribe((data) => {});
		isMoneyOutOverlayOpen.set(true);
		unsub();
	};

	const isBudgetAllocationOverlayOpenFun = () => {
		const unsub = isBudgetAllocationOverlayOpen.subscribe((data)=>{})
		isBudgetAllocationOverlayOpen.set(true)
		unsub()
	}
</script>

<aside
	id="logo-sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
	aria-label="Sidebar"
>
	<div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
		<div>
			<!-- Section 1: Financial Actions -->
			<h3 class="text-sm font-semibold text-gray-500 uppercase dark:text-gray-400 mb-2">Financial Actions</h3>
			<ul class="space-y-2 font-medium">
				<li>
					<button
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
						on:click={isMoneyInOverlayOpenFun}
					>
						<MoneyInIcon />
						<span class="ms-3">Money In</span>
					</button>
				</li>
				<li>
					<button
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
						on:click={isMoneyOutOverlayOpenFun}
					>
						<MoneyOutIcon />
						<span class="ms-3">Money Out</span>
					</button>
				</li>
				<li>
					<button
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
						on:click={isBudgetAllocationOverlayOpenFun}
					>
						<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.891 15.107 15.11 8.89m-5.183-.52h.01m3.089 7.254h.01M14.08 3.902a2.849 2.849 0 0 0 2.176.902 2.845 2.845 0 0 1 2.94 2.94 2.849 2.849 0 0 0 .901 2.176 2.847 2.847 0 0 1 0 4.16 2.848 2.848 0 0 0-.901 2.175 2.843 2.843 0 0 1-2.94 2.94 2.848 2.848 0 0 0-2.176.902 2.847 2.847 0 0 1-4.16 0 2.85 2.85 0 0 0-2.176-.902 2.845 2.845 0 0 1-2.94-2.94 2.848 2.848 0 0 0-.901-2.176 2.848 2.848 0 0 1 0-4.16 2.849 2.849 0 0 0 .901-2.176 2.845 2.845 0 0 1 2.941-2.94 2.849 2.849 0 0 0 2.176-.901 2.847 2.847 0 0 1 4.159 0Z"/>
						</svg>
						<span class="ms-3">Budget Allocation</span>
					</button>
				</li>
			</ul>

			<!-- Section 2: Transactions -->
			<h3 class="text-sm font-semibold text-gray-500 uppercase dark:text-gray-400 mt-6 mb-2">Transactions</h3>
			<ul class="space-y-2 font-medium">
				<li>
					<a
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
						href="/private/viewTransactions/"
					>
						<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
						</svg>
						<span class="ms-3">View Past Transactions</span>
					</a>
				</li>
			</ul>
		</div>

		<!-- Darkmode Toggle and Copyright -->
		<div class="absolute bottom-0 left-0 w-full p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
			<!-- Darkmode Toggle -->
			<div class="flex justify-center mb-4">
				<DarkMode />
			</div>
			
			<!-- Copyright -->
			<p class="text-xs text-center text-gray-500 dark:text-gray-400">&copy; 2024 Hans Emilio M. Lumagui. All rights reserved.</p>
		</div>
	</div>
</aside>