<script>
    import MoneyIconLight from "$lib/components/icons/money-in-lightmode.svg"
    import MoneyIconDark from "$lib/components/icons/money-in-darkmode.svg"
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
    <img src={MoneyIconDark} alt="Facebook" class="w-6 h-6">
  {:else}
    <img src={MoneyIconLight} alt="Facebook" class="w-6 h-6">
  {/if}
  