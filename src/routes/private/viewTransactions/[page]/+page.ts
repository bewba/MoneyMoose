// In a TypeScript file (e.g., +page.ts)

import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// Define the load function with type annotation
export const load: PageLoad = async ({ params, fetch }) => {
    const page: number = Number(params.page); // Convert the page parameter to a number
    console.log("hello")
    // Define the async function to fetch transactions
    async function getTransaction(page: number): Promise<any> {
        const limit = 1;
        let response;
        try{response = await fetch(`https://dummyjson.com/viewTransactions?limit=${limit}&skip=${(page - 1) * limit}`);}
        catch{redirect(302, "/private")}
       

        const data = await response.json();
        return data;
    }

    try {
        return{ transaction: getTransaction(page)};
       
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw redirect(302, '/private'); 
    }
};
