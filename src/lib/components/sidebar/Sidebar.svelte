<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ShoppingBagSolid, ArrowRightToBracketOutline, EditOutline, FireSolid, BookSolid, RestoreWindowOutline, LifeSaverSolid, BarsOutline } from 'flowbite-svelte-icons';
    
    let spanClass = 'flex-1 ms-3 whitespace-nowrap';
    let isSidebarOpen = false;
  
    function toggleSidebar() {
      isSidebarOpen = !isSidebarOpen;
    }
  </script>
  
  <!-- Mobile Button -->
  <button
    class="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-lg lg:hidden"
    on:click={toggleSidebar}
  >
        <BarsOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
  </button>
  
  <!-- Sidebar -->
  {#if isSidebarOpen || window.innerWidth >= 1024}
    <Sidebar>
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem label="Dashboard">
            <svelte:fragment slot="icon">
              <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Kanban" {spanClass}>
            <svelte:fragment slot="icon">
              <GridSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Inbox" {spanClass}>
            <svelte:fragment slot="icon">
              <MailBoxSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Users">
            <svelte:fragment slot="icon">
              <UserSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Products">
            <svelte:fragment slot="icon">
              <ShoppingBagSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Sign In">
            <svelte:fragment slot="icon">
              <ArrowRightToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Sign Up">
            <svelte:fragment slot="icon">
              <EditOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup border>
          <SidebarItem label="Upgrade to Pro">
            <svelte:fragment slot="icon">
              <FireSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Documentation">
            <svelte:fragment slot="icon">
              <BookSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Components">
            <svelte:fragment slot="icon">
              <RestoreWindowOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Help">
            <svelte:fragment slot="icon">
              <LifeSaverSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  {/if}
  