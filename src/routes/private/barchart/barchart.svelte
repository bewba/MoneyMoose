<script>
	import { elements } from 'chart.js';
	import { Chart, Card, Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isAfter } from 'date-fns';

	export let expectedData;
	export let actualData;

	let weeklySpending = 0;
	let chartData = [];
	
	// Initialize the group1 and group2 variables
	let group1 = 0;
	$: group2 = group1 === 0 ? 'Weekly Spending' : 'Monthly Spending';

	console.log(expectedData)

	$: budget = expectedData[group1].budgetAmount;


	$: {
		if (group1 == 1) {
			let day = new Date()
			let start = startOfMonth(day)
			let end = endOfMonth(day)
			chartData = [];
			weeklySpending = 0;
			for (const [label, amount] of Object.entries(expectedData[group1]).slice(3, 7)) {
				let chartDict = {
					x: '',
					y: 0,
					fillColor: '', // Placeholder for dynamic color
					goals: [
						{ name: 'Expected', value: 0, strokeWidth: 5, strokeHeight: 22, strokeColor: '#775DD0' }
					]
				};
				chartDict.x = label;
				actualData.forEach((element) => {
					if (element.category == label && isBefore(element.created_at, end) && isAfter(element.created_at,start)) {
						chartDict.y += element.amount;
						weeklySpending += element.amount;
					}
				});
				chartDict.goals[0].value = amount;

				// Determine color based on the comparison with the marker
				if (chartDict.y <= amount) {
					chartDict.fillColor = '#00E396'; // Green
				} else {
					chartDict.fillColor = '#FF0000'; // Red
				}

				chartData.push(chartDict);
			}
		} else {
			let day = new Date()
			let start = startOfWeek(day)
			let end = endOfWeek(day)
			chartData = [];
			weeklySpending = 0;
			for (const [label, amount] of Object.entries(expectedData[group1]).slice(3, 7)) {
				let chartDict = {
					x: '',
					y: 0,
					fillColor: '', // Placeholder for dynamic color
					goals: [
						{ name: 'Expected', value: 0, strokeWidth: 22, strokeHeight: 5, strokeColor: '#775DD0' }
					]
				};
				chartDict.x = label;
				actualData.forEach((element) => {
					if (element.category == label && isBefore(element.created_at, end) && isAfter(element.created_at,start)) {
						chartDict.y += element.amount;
						weeklySpending += element.amount;
					}
				});
				chartDict.goals[0].value = amount;

				// Determine color based on the comparison with the marker
				if (chartDict.y <= amount) {
					chartDict.fillColor = '#00E396'; // Green
				} else {
					chartDict.fillColor = '#FF0000'; // Red
				}

				chartData.push(chartDict);
			}
		}
	}
	$: seriesData = chartData;

	$: options = {
		series: [
			{
				name: 'Actual',
				data: seriesData
			}
		],
		chart: {
        width: 1000,
        height: 350,
        type: 'bar'
    },
		plotOptions: {
			bar: {
				horizontal: false,
				colors: {
					backgroundBarOpacity: 1,
					distributed: true // Enable distributed colors for individual bars
				}
			}
		},
		dataLabels: {
			formatter: function (val, opt) {
				const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

				if (goals && goals.length) {
					return `${val} / ${goals[0].value}`;
				}
				return val;
			}
		},
		colors: seriesData.map((data) => data.fillColor), // Use dynamic colors
		xaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				},
				formatter: function (value) {
					return '₱' + value;
				}
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			}
		},
		legend: {
			show: true,
			showForSingleSeries: true,
			customLegendItems: ['Actual', 'Budget'],
			markers: {
				fillColors: ['#00E396', '#775DD0']
			},
			labels: {
				colors: ['gray', 'gray'],
				useSeriesColors: false,
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			}
		},  responsive: [
        {
            breakpoint: 1000,
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                legend: {
                    position: "bottom"
                },
                chart: {
                    height: '300px',
					width: '300px'
                }
            }
        }
    ]
};

	$: moneyLeft = budget - weeklySpending;
</script>

<div class="p-4 md:p-8">
	<!-- Money Left Section -->
	<div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
		<dl>
			<dt class="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
				Money Left
			</dt>
			<dd class="leading-none text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
				₱{moneyLeft}
			</dd>
		</dl>
	</div>

	<!-- Budget and Spending Section -->
	<div class="grid grid-cols-1 md:grid-cols-2 py-3 gap-y-4 md:gap-x-8">
		<dl>
			{#if group1 == 0}
				<dt class="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
					Weekly Budget
				</dt>
			{:else}
				<dt class="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
					Monthly Budget
				</dt>
			{/if}
			<dd class="leading-none text-lg md:text-xl font-bold text-green-500 dark:text-green-400">
				{budget}
			</dd>
		</dl>
		<dl class="text-left md:text-right">
			{#if group1 == 0}
				<dt class="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
					Weekly Spending
				</dt>
			{:else}
				<dt class="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
					Monthly Spending
				</dt>
			{/if}
			<dd class="leading-none text-lg md:text-xl font-bold text-red-600 dark:text-red-500">
				-{weeklySpending}
			</dd>
		</dl>
	</div>

	<!-- Chart Section -->
	<div class="relative w-full overflow-x-auto">
		<div class="aspect-w-16 aspect-h-9">
			<Chart {options} class="w-full h-full" />
		</div>
	</div>

	<!-- Dropdown Section -->
	<div
		class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-4"
	>
		<div class="flex flex-col md:flex-row justify-between items-center pt-5">
			<Button
				class="dark:bg-gray-700 bg-gray-900 dark:hover:bg-gray-600 hover:bg-gray-700 w-full md:w-auto"
			>
				{group2}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
			</Button>
			<Dropdown
				class="w-full md:w-44 mt-3 md:mt-0 p-3 space-y-3 text-sm dark:bg-gray-900 bg-gray-200"
			>
				<DropdownItem>
					<Radio color={'white'} name="group1" bind:group={group1} value={0}>Weekly Spending</Radio>
				</DropdownItem>
				<hr />
				<DropdownItem>
					<Radio color={'white'} name="group1" bind:group={group1} value={1}>Monthly Spending</Radio
					>
				</DropdownItem>
			</Dropdown>
		</div>
	</div>
</div>
