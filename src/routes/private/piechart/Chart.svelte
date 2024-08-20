<script>
	import { Doughnut } from 'svelte-chartjs';
	import { onMount } from 'svelte';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	export let expenseData;

	// @ts-ignore
	// @ts-ignore
	const colorScheme = [
		'#25CCF7',
		'#FD7272',
		'#54a0ff',
		'#00d2d3',
		'#1abc9c',
		'#2ecc71',
		'#3498db',
		'#9b59b6',
		'#34495e',
		'#16a085',
		'#27ae60',
		'#2980b9',
		'#8e44ad',
		'#2c3e50',
		'#f1c40f',
		'#e67e22',
		'#e74c3c',
		'#ecf0f1',
		'#95a5a6',
		'#f39c12',
		'#d35400',
		'#c0392b',
		'#bdc3c7',
		'#7f8c8d',
		'#55efc4',
		'#81ecec',
		'#74b9ff',
		'#a29bfe',
		'#dfe6e9',
		'#00b894',
		'#00cec9',
		'#0984e3',
		'#6c5ce7',
		'#ffeaa7',
		'#fab1a0',
		'#ff7675',
		'#fd79a8',
		'#fdcb6e',
		'#e17055',
		'#d63031',
		'#feca57',
		'#5f27cd',
		'#54a0ff',
		'#01a3a4'
	];

	// @ts-ignore
	// @ts-ignore
	let category_count = 0;
	let pieChartData = {};

	// @ts-ignore
	expenseData.forEach((element) => {
		
		if (!(element.category in pieChartData)) {
			if (element.category == 'Expense') {
				if (!(element.subcategory in pieChartData)) {
          // @ts-ignore
          pieChartData[element.subcategory] = 0
          category_count += 1
				}
      } else {
        // @ts-ignore
        pieChartData[element.category] = 0
        category_count+=1
			}
		}

		// @ts-ignore
		if (element.category == 'Expense') {
			// @ts-ignore
			pieChartData[element.subcategory] += element.amount;
		} else {
			// @ts-ignore
			pieChartData[element.category] += element.amount;
		}
	});

	console.log(pieChartData, category_count);

	// @ts-ignore
	let isDarkMode;

	const checkDarkMode = () => {
		return document.documentElement.classList.contains('dark');
	};

	onMount(() => {
		isDarkMode = checkDarkMode();
		const observer = new MutationObserver(() => {
			isDarkMode = checkDarkMode();
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	const data = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
		datasets: [
			{
				data: [300, 50, 100, 40, 120],
				backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
				hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
			}
		]
	};

	const optionsLight = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'My Expense Allocation',
				font: {
					size: 18,
					weight: 'bold'
				},
				color: '#333'
			},
			legend: {
				position: 'bottom',
				labels: {
					color: '#333'
				}
			}
		}
	};

	const optionsDark = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'My Expense Allocation',
				font: {
					size: 18,
					weight: 'bold'
				},
				color: '#FFF'
			},
			legend: {
				position: 'bottom',
				labels: {
					color: '#FFF'
				}
			}
		}
	};
</script>

<div
	class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-2xl mx-auto"
>
	{#if isDarkMode}
		<Doughnut {data} options={optionsDark} />
	{:else}
		<Doughnut {data} options={optionsLight} />
	{/if}
</div>
