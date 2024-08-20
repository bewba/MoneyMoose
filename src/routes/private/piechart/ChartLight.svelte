<script>
  import { Doughnut } from "svelte-chartjs";
  import { onMount } from "svelte";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';


  let isDarkMode;

  const checkDarkMode = () => {
    return document.documentElement.classList.contains('dark')
  };

  onMount(() => {
    isDarkMode = checkDarkMode();
    const observer = new MutationObserver(() => {
      isDarkMode = checkDarkMode();
      console.log(isDarkMode)
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  });

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  const data = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          '#F7464A',
          '#46BFBD',
          '#FDB45C',
          '#949FB1',
          '#4D5360',
          '#AC64AD',
        ],
        hoverBackgroundColor: [
          '#FF5A5E',
          '#5AD3D1',
          '#FFC870',
          '#A8B3C5',
          '#616774',
          '#DA92DB',
        ],
      },
    ],
  };

  const optionsLight = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'My Doughnut Chart',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
        },
      },
    },
  };
  
  const optionsDark = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'My Doughnut Chart',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#FFF',
      },
      legend: {
        position: 'bottom',
        labels: {
          color: '#FFF',
        },
      },
    },
  };

</script>

<div class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-2xl mx-auto">
  {#if isDarkMode}  
  <Doughnut data= {data} options = {optionsDark} />
  {:else}
  <Doughnut data= {data} options = {optionsLight}/>
  {/if}
</div>
