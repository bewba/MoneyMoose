<script>
	import { Doughnut } from 'svelte-chartjs';
	import { onMount } from 'svelte';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	export let incomeData;

	// @ts-ignore
	// @ts-ignore

const colorScheme = [
  '#87CEEB', // Sky Blue
  '#FF7F50', // Coral
  '#90EE90', // Light Green
  '#FFD700', // Gold
  '#DA70D6', // Orchid
  '#FF6347', // Tomato
  '#FFB6C1', // Light Pink
  '#48D1CC', // Medium Turquoise
  '#B0C4DE', // Light Steel Blue
  '#F0E68C', // Khaki
  '#FA8072', // Salmon
  '#D87093', // Pale Violet Red
  '#7B68EE', // Medium Slate Blue
  '#FAFAD2', // Light Goldenrod Yellow
  '#E6E6FA', // Lavender
  '#F5DEB3', // Wheat
  '#CD853F', // Peru
  '#708090', // Slate Gray
  '#9932CC', // Dark Orchid
  '#DC143C'  // Crimson
];

// Array of 20 hover effect colors for the pie chart
const hoverColors = [
  '#00BFFF', // Hover for Sky Blue
  '#FF6347', // Hover for Coral
  '#32CD32', // Hover for Light Green
  '#FFA500', // Hover for Gold
  '#DDA0DD', // Hover for Orchid
  '#FF4500', // Hover for Tomato
  '#FF69B4', // Hover for Light Pink
  '#40E0D0', // Hover for Medium Turquoise
  '#4682B4', // Hover for Light Steel Blue
  '#BDB76B', // Hover for Khaki
  '#E9967A', // Hover for Salmon
  '#C71585', // Hover for Pale Violet Red
  '#6A5ACD', // Hover for Medium Slate Blue
  '#F5DEB3', // Hover for Light Goldenrod Yellow
  '#D8BFD8', // Hover for Lavender
  '#DEB887', // Hover for Wheat
  '#D2691E', // Hover for Peru
  '#2F4F4F', // Hover for Slate Gray
  '#8A2BE2', // Hover for Dark Orchid
  '#B22222'  // Hover for Crimson
];


	// @ts-ignore
	// @ts-ignore
	let category_count = 0;
	let pieChartData = {};

	// @ts-ignore
	incomeData.forEach((element) => {
		
		if (!(element.category in pieChartData)) {
        // @ts-ignore
        pieChartData[element.category] = 0
        category_count+=1
		}
		// @ts-ignore
		pieChartData[element.category] += element.amount;
		
	});

    let labels = []
    let amounts = []

    for (const [label, amount] of Object.entries(pieChartData)) {
        labels.push(label)
        amounts.push(amount)
     }


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
		// @ts-ignore
		labels: labels,
		datasets: [
			{
				// @ts-ignore
				data: amounts,
				backgroundColor: colorScheme.slice(0, 5),
				hoverBackgroundColor: hoverColors.slice(0, 5)
			}
		]
	};

	const optionsLight = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'My Income Distribution',
				font: {
					size: 18,
					weight: 'bold'
				},
				color: '#333'
			},
			legend: {
				position: 'right',
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
				text: 'My Income Distribution',
				font: {
					size: 18,
					weight: 'bold'
				},
				color: '#FFF'
			},
			legend: {
				position: 'right',
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
