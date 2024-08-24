<script>
    import budgetAllocationLight from "$lib/components/icons/budget-allocation-lightmode.svg"
        import budgetAllocationDark from "$lib/components/icons/budget-allocation-darkmode.svg"
    import { onMount } from 'svelte';
  
    let isDarkMode = false;
  
    
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
  </script>
  
  {#if isDarkMode}
    <img src={budgetAllocationDark} alt="moneyicon" class="w-6 h-6">
  {:else}
    <img src={budgetAllocationLight} alt="moneyicon" class="w-6 h-6">
  {/if}
  