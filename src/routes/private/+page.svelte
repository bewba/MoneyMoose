<script>
	import LoggedInNavbar from '$lib/components/navbar/LoggedInNavbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';

	export let data;

	let values = data.data;
	let totalValue = 0;

	try {
		if (values.length == 0) {
			totalValue = 0;
		} else {
			values.forEach((element) => {
				if (element.type == 0) {
					totalValue += element.amount;
				} else {
					totalValue -= element.amount;
				}
			});
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
		</div>
	</div>
</div>
