<script>
    import FacebookLight from "$lib/components/icons/facebook-lightmode.svg"
    import FacebookDark from "$lib/components/icons/facebook-darkmode.svg"
    import { onMount } from 'svelte';
  
    let isDarkMode = false;
  
    // Function to check the current mode
    const checkDarkMode = () => {
      return document.documentElement.classList.contains('dark');
    };
  
    // Update the mode on mount
    onMount(() => {
      isDarkMode = checkDarkMode();
      // Listen for changes to the class list
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
    <a href="https://www.facebook.com/profile.php?id=100006002298768"><img src={FacebookDark} alt="Facebook" class="w-6 h-6"></a>
  {:else}
    <a href="https://www.facebook.com/profile.php?id=100006002298768"><img src={FacebookLight} alt="Facebook" class="w-6 h-6"></a>
  {/if}
  