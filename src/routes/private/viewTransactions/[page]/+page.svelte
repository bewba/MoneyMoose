<script>
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    import LoggedInNavbar from "$lib/components/navbar/LoggedInNavbar.svelte";
    export let data;

    if (!data || typeof data !== 'object') {
        console.error("Data is not an object or is missing");
        throw redirect(302, '/private');
    }

    const pageSize = 20;
    $: transactionList = data.data;
    console.log(data.data)
    $: totalItems = data.totalCount;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currPage = isNaN(Number($page.params.page)) ? 0 : Number($page.params.page) - 1;

    // Pagination logic
    const maxVisiblePages = 3;  // Number of pages shown before the "..." (excluding first and last)
    $: paginationLinks = generatePaginationLinks(currPage, totalPages, maxVisiblePages);

    function generatePaginationLinks(currPage, totalPages, maxVisiblePages) {
        let pages = [];

        if (totalPages <= maxVisiblePages + 2) {
            // Show all pages if totalPages is small enough
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
            pages.push(1);

            if (currPage > maxVisiblePages) {
                pages.push('...');
            }

            let start = Math.max(2, currPage);
            let end = Math.min(totalPages - 1, currPage + maxVisiblePages - 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show the last page
            pages.push(totalPages);
        }

        return pages;
    }
</script>

<div>
    <LoggedInNavbar />
</div>

<div class="bg-gray-400 dark:bg-gray-900 text-gray-700 dark:text-gray-200 min-h-screen pt-16">
    <div class="container mx-auto text-center py-8">
        {#if transactionList.length > 0}
            <ul class="list-none space-y-2">
                {#each transactionList as transaction}
                    <li class="bg-white dark:bg-gray-800 p-4 rounded shadow">
                        <p class="text-lg font-semibold">Transaction ID: {transaction.id}</p>
                    </li>
                {/each}
            </ul>
        {:else}
            <p class="text-lg">No transactions available.</p>
        {/if}
    </div>
    <div class="flex justify-center py-4">
        <nav class="flex space-x-2">
            {#each paginationLinks as pageNum, idx}
                {#if pageNum === '...'}
                    <span class="px-4 py-2">...</span>
                {:else}
                    <a
                        href={`/private/viewTransactions/${pageNum}`}
                        class={`px-4 py-2 border rounded-md ${pageNum - 1 === currPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600'}`}
                    >
                        {pageNum}
                    </a>
                {/if}
            {/each}
        </nav>
    </div>
</div>
