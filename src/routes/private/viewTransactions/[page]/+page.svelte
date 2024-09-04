<script>
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import LoggedInNavbar from '$lib/components/navbar/LoggedInNavbar.svelte';
	import { invalidate } from '$app/navigation';
	import { DarkMode } from 'flowbite-svelte';
	import Footer from '$lib/components/StickyFooter/footer.svelte';
	export let data;

	if (!data || typeof data !== 'object') {
		console.error('Data is not an object or is missing');
		throw redirect(302, '/private');
	}

	const pageSize = 20;
	$: transactionList = data.data;
	$: totalItems = data.totalCount;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currPage = isNaN(Number($page.params.page)) ? 0 : Number($page.params.page) - 1;

	const maxVisiblePages = 3;
	$: paginationLinks = generatePaginationLinks(currPage, totalPages, maxVisiblePages);

	function generatePaginationLinks(currPage, totalPages, maxVisiblePages) {
		let pages = [];

		if (totalPages <= maxVisiblePages + 2) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
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

			pages.push(totalPages);
		}

		return pages;
	}
</script>

<div>
	<LoggedInNavbar />
</div>
<DarkMode class = "hidden"/>
<div class="bg-gray-400 dark:bg-gray-900 text-gray-700 dark:text-gray-200 min-h-screen pt-16">
	<div class="container mx-auto text-left py-8">
		{#if transactionList.length > 0}
			<ul class="list-none space-y-4">
				{#each transactionList as transaction}
					<li
						class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex justify-between items-center"
					>
						<div class="flex flex-col">
							<p
								class={`text-xl font-bold ${transaction.type === 1 ? 'text-red-500' : 'text-green-500'}`}
							>
								Amount: {transaction.amount.toFixed(2)}
							</p>
							<p class="text-lg font-semibold">Category: {transaction.category}</p>
							{#if transaction.subcategory}
								<p class="ml-4 text-md font-semibold">Subcategory: {transaction.subcategory}</p>
							{/if}
							{#if transaction.notes}
								<p class="ml-4 text-md font-semibold">Notes: {transaction.notes}</p>
							{/if}
						</div>
						<form method="POST" action="?/deleteTransaction">
							<input type="hidden" name="id" value={transaction.id} />
							<button
								type="submit"
								class="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</form>
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
<Footer />