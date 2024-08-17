<script>
    import Navbar from "$lib/components/navbar/LoggedInNavbar.svelte";
    import Sidebar from '$lib/components/sidebar/Sidebar.svelte';

</script>

<html class="dark" lang="en">
    <body class="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Navbar />
        <div class="flex h-screen">
            <!-- Sidebar that appears on larger screens -->
            <Sidebar/>

            <!-- Main content area takes up the remaining space -->
            <main class="p-8 flex-grow">
                <!-- Your main content goes here -->
            </main>
        </div>
    </body>
</html>
