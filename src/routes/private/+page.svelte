<script lang>
	import LoggedInNavbar from '$lib/components/navbar/LoggedInNavbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import { onMount } from 'svelte';
	import Moneyin from './moneyin/moneyin.svelte';
	import Moneyout from './moneyout/moneyout.svelte';
	import Chart from './piechart/ExpenseChart.svelte';
	import IncomeChart from './piechart/IncomeChart.svelte';
	import { isMoneyInOverlayOpen, isMoneyOutOverlayOpen, isBudgetAllocationOverlayOpen } from './store/Popupstore';
	import BudgetAllocation from "./set_budget/setBudget.svelte"
	// @ts-ignore
	export let data;
	
	let isMoneyInOpen = false;
	let isMoneyOutOpen = false;
	let isBudgetAllocationOpen = false;

	// @ts-ignore
	let unsub1 = isMoneyInOverlayOpen.subscribe((someVal1) => {
		isMoneyInOpen = someVal1;
	});

	// @ts-ignore
	let unsub2 = isMoneyOutOverlayOpen.subscribe((someVal2) => {
		isMoneyOutOpen = someVal2;
	});

	let unsub3 = isBudgetAllocationOverlayOpen.subscribe((someVal3) => {
		isBudgetAllocationOpen = someVal3
	})

	let totalValue = 0;
	let income = 0;
	let expense = 0;
	try {
		// @ts-ignore
		let moneyIn = data.data[0];
		// @ts-ignore
		let moneyOut = data.data[1];
		for (let i = 0; i < moneyIn.length; i += 1) {
			income += moneyIn[i].amount;
		}

		for (let i = 0; i < moneyOut.length; i += 1) {
			expense += moneyOut[i].amount;
		}
	} catch (error) {
		
	}
	totalValue = income - expense;
</script>

<LoggedInNavbar />
<Sidebar />

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
	<div class="p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white mt-14 flex">
		{#if income > 0}
			<IncomeChart incomeData={data.data[0]}/>
		{/if}
		{#if expense > 0}
			<Chart expenseData={data.data[1]}/>
		{/if}
	</div>
	{/if}
</div>
