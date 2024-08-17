<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    
  </script>
  
  <Navbar  >
    <NavBrand href="/private">
      <!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Money Moose</span>
    </NavBrand>
    <NavHamburger  />
    <NavUl >
      <NavLi href="/private">Home</NavLi>
      <!-- <NavLi href="/about">About</NavLi>
      <NavLi href="/pricing">Pricing</NavLi> -->
      <!-- <NavLi href="/auth"></NavLi> -->
    </NavUl>
  </Navbar>