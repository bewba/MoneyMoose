<script>
    import MoneyIconLight from "$lib/components/icons/cash-out-lightmode.svg"
    import MoneyIconDark from "$lib/components/icons/cash-out-darkmode.svg"
    import InstagramDark from "$lib/components/icons/instagram-dark.svg"
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
    <img src={MoneyIconDark} alt="moneyicon" class="w-6 h-6">
  {:else}
    <img src={MoneyIconLight} alt="moneyicon" class="w-6 h-6">
  {/if}
  