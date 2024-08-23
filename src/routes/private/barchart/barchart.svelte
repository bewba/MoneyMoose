<script>
	import { elements } from 'chart.js';
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ArrowUpOutline, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

	export let expectedData;
	export let actualData;

	let chartData = [];

	for (const [label, amount] of Object.entries(expectedData[0]).slice(3, 7)) {
		let chartDict = {
			x: '',
			y: 0,
			fillColor: '', // Placeholder for dynamic color
			goals: [
				{ name: 'Expected', value: 14, strokeWidth: 5, strokeHeight: 22, strokeColor: '#775DD0' }
			]
		};
		chartDict.x = label;
		actualData.forEach((element) => {
			if (element.category == label) {
				chartDict.y += element.amount;
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

	let seriesData = chartData;

	$: options = {
		series: [
			{
				name: 'Actual',
				data: seriesData
			}
		],
		chart: {
			height: 350,
			type: 'bar'
		},
		plotOptions: {
			bar: {
				horizontal: true,
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
		colors: seriesData.map(data => data.fillColor), // Use dynamic colors
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
		}
	};
</script>

<Card>
	<div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
		<dl>
			<dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
			<dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">₱5,405</dd>
		</dl>
	</div>

	<div class="grid grid-cols-2 py-3">
		<dl>
			<dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Income</dt>
			<dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">₱23,635</dd>
		</dl>
		<dl>
			<dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
			<dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">-₱18,230</dd>
		</dl>
	</div>

	<Chart {options} />
	<div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
		<div class="flex justify-end pt-5">
			<A
				href="/"
				class="ml-auto uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
			>
				Leads Report
				<ChevronRightOutline class="w-2.5 h-2.5 ms-1.5" />
			</A>
		</div>
	</div>
</Card>
