<script>
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    import LoggedInNavbar from "$lib/components/navbar/LoggedInNavbar.svelte";
    export let data

    if (!data || typeof data !== 'object') {
        console.error("Data is not an object or is missing");
        throw redirect(302, '/private');
    }
    const pageSize = 2;
    let transactionList = data.data;
    $: totalItems = data.totalCount;

    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currPage = Number($page.params.page) - 1
    $:{console.log(currPage)}
    if (!Array.isArray(transactionList)) {
        throw redirect(302, '/private');
    }
    console.log("niga")
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
            {#each Array(totalPages) as _, idx}
                <a
                    href={`/private/viewTransactions/${idx + 1}`}
                    class={`px-4 py-2 border rounded-md ${idx === currPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600'}`}
                >
                    {idx + 1}
                </a>
            {/each}
        </nav>
    </div>
</div>
