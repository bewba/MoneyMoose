<script>
    import InstagramLight from "$lib/components/icons/instagram-lightmode.svg"
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
    <a href="https://www.facebook.com/profile.php?id=100006002298768"><img src={InstagramDark} alt="Facebook" class="w-6 h-6"></a>
  {:else}
    <a href="https://www.facebook.com/profile.php?id=100006002298768"><img src={InstagramLight} alt="Facebook" class="w-6 h-6"></a>
  {/if}
  