<script>
    export let menuItems = [];
</script>

<aside class="w-64 bg-white dark:bg-gray-900 h-full shadow-lg md:block hidden">
    <nav class="mt-6">
       
    </nav>
    <nav>
         <ul class="space-y-2">
            {#each menuItems as item}
                <li>
                    <a href={item.href} class="flex items-center p-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</aside>
