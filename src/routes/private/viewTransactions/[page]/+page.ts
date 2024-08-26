// import type { PageLoad } from './$types';
// import { redirect } from '@sveltejs/kit';

// export const load: PageLoad = async ({ params, fetch }) => {
//     const page: number = Number(params.page);
//     console.log("hello")
    
//     async function getTransaction(page: number): Promise<any> {
//         const limit = 1;
//         let response;
//         try{response = await fetch(`https://dummyjson.com/viewTransactions?limit=${limit}&skip=${(page - 1) * limit}`);}
//         catch{redirect(302, "/private")}
       

//         const data = await response.json();
//         return data;
//     }

//     try {
//         return{ transaction: getTransaction(page)};
       
//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//         throw redirect(302, '/private'); 
//     }
// };
