<script>
	import LoggedInNavbar from '$lib/components/navbar/LoggedInNavbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Moneyin from "./moneyin/moneyin.svelte"
	import Moneyout from './moneyout/moneyout.svelte';
    import { isMoneyInOverlayOpen, isMoneyOutOverlayOpen } from './store/Popupstore';
	export let data;

	let isMoneyInOpen = false
	let isMoneyOutOpen = false
	console.log(data.data)
	let unsub1 = isMoneyInOverlayOpen.subscribe(someVal1 => {
		isMoneyInOpen = someVal1
	})
	
	let unsub2 = isMoneyOutOverlayOpen.subscribe(someVal2 => {
		isMoneyOutOpen = someVal2
	})

	
	
	let totalValue = 0;

	try {
		let moneyIn = data.data[0];
		let moneyOut = data.data[1]
		for (let i = 0; i < moneyIn.length; i+= 1){
			totalValue += moneyIn[i].amount
		}

		for (let i = 0; i < moneyOut.length; i+= 1){
			totalValue -= moneyOut[i].amount
		}
	} catch (error) {
		totalValue = 0;
		console.log(error);
	}
	console.log(totalValue);
</script>

<LoggedInNavbar />
<Sidebar />

<div class="p-6 sm:ml-64 dark:bg-gray-900 bg-gray-200 min-h-screen">
	<div class="p-6 rounded-lg shadow-lg dark:bg-gray-800 bg-white mt-14">
		<div class="flex flex-col items-center justify-center h-full space-y-4">
			<h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Account Value: </h1>
			<div class="text-4xl font-bold text-gray-900 dark:text-white">
				₱ {totalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
			</div>
			{#if isMoneyInOpen}
				<Moneyin />
			{/if}
			
			{#if isMoneyOutOpen}
				<Moneyout />
			{/if}
		</div>
	</div>
</div>
