<script lang>
	// @ts-nocheck

	import LoggedInNavbar from '$lib/components/navbar/LoggedInNavbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import { onMount } from 'svelte';
	import Moneyin from './moneyin/moneyin.svelte';
	import Moneyout from './moneyout/moneyout.svelte';
	import Chart from './piechart/ExpenseChart.svelte';
	import IncomeChart from './piechart/IncomeChart.svelte';
	import {
		isMoneyInOverlayOpen,
		isMoneyOutOverlayOpen,
		isBudgetAllocationOverlayOpen
	} from './store/Popupstore';
	import { triggerToast } from './store/Toaststore';
	import BudgetAllocation from './set_budget/setBudget.svelte';
	import Barchart from './barchart/barchart.svelte';
	import Footer from '$lib/components/StickyFooter/footer.svelte';

	// @ts-ignore
	export let data;

	let isMoneyInOpen = false;
	let isMoneyOutOpen = false;
	let isBudgetAllocationOpen = false;
	let hasWeek = 0;
	let hasMonth = 0;

	// @ts-ignore
	let unsub1 = isMoneyInOverlayOpen.subscribe((someVal1) => {
		isMoneyInOpen = someVal1;
	});

	// @ts-ignore
	let unsub2 = isMoneyOutOverlayOpen.subscribe((someVal2) => {
		isMoneyOutOpen = someVal2;
	});

	let unsub3 = isBudgetAllocationOverlayOpen.subscribe((someVal3) => {
		isBudgetAllocationOpen = someVal3;
	});

	let totalValue = 0;
	let income = 0;
	let expense = 0;
	let moneyIn = [];
	let moneyOut = [];
	try {
		// @ts-ignore
		let transaction = data.data[0];
		transaction.forEach((element) => {
			if (element.type == 0) {
				moneyIn.push(element);
			} else {
				moneyOut.push(element);
			}
		});

		for (let i = 0; i < moneyIn.length; i += 1) {
			income += moneyIn[i].amount;
		}

		for (let i = 0; i < moneyOut.length; i += 1) {
			expense += moneyOut[i].amount;
		}
	} catch (error) {}

	try {
		data.data[1].forEach((element) => {
			if (element.type == 0) {
				hasWeek = 1;
			} else {
				hasMonth = 1;
			}
		});
	} catch (error) {}

	totalValue = income - expense;

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

<LoggedInNavbar />
<Sidebar />

<div>
	<div class="p-6 sm:ml-64 dark:bg-gray-900 bg-gray-200 min-h-screen">
		<div class="p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white mt-14">
			<div class="flex flex-col items-center justify-center h-full space-y-4">
				<h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Account Value:</h1>
				<div class="text-4xl font-bold text-gray-900 dark:text-white">
					₱ {totalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
				</div>
				{#if isMoneyInOpen}
					<Moneyin />
				{/if}

				{#if isMoneyOutOpen}
					<Moneyout />
				{/if}

				{#if isBudgetAllocationOpen}
					<BudgetAllocation />
				{/if}
			</div>
		</div>
		{#if income > 0 || expense > 0}
			<div
				class="p-4 md:p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white mt-14 flex flex-col md:flex-row gap-4"
			>
				{#if income > 0}
					<div class="w-full">
						<IncomeChart incomeData={moneyIn} />
					</div>
				{/if}
				{#if expense > 0}
					<div class="w-full">
						<Chart expenseData={moneyOut} />
					</div>
				{/if}
			</div>
		{/if}
		{#if hasWeek || hasMonth}
			{#if data.data[1].length > 0}
				<div class="p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white mt-14 flex justify-center">
					<Barchart expectedData={data.data[1]} actualData={moneyOut} {hasWeek} {hasMonth} />
				</div>
			{/if}
		{/if}
	</div>
</div>
<Footer />