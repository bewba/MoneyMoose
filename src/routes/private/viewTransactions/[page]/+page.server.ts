import { redirect } from "@sveltejs/kit";
import type { Actions } from "../../$types";
import { startOfYear, endOfYear } from "date-fns";

export const actions: Actions = {};

export const load = async ({ params, locals }) => {
    try{const user = await locals.supabase.auth.getUser();
    const myPage = Number(params.page)
    // console.log(myPage)
    const uuid = user.data.user?.id;
    // console.log("hello")



    if (!uuid) {
        return { success: false, error: "User not authenticated" };
    }

    const day = new Date();

    const yearStart = startOfYear(day).toISOString();
    const yearEnd = endOfYear(day).toISOString();

    const { data: yearlyTransactions, error: error1 } = await locals.supabase
        .from("moneyOut")
        .select()
        .limit(2)
        .eq('user', uuid)
        .gte('created_at', yearStart) // Filter from start of the month
        .lte('created_at', yearEnd);  // Filter up to the end of the month
        

    if (error1) {
        console.error("Supabase query error:", error1.message);
        return { success: false, error: error1.message };

    }

    const { count, error: error2 } = await locals.supabase
            .from('moneyOut')
            .select('id', { count: 'exact' })  // We need to select some field to count the rows
            .eq('user', uuid)
            .gte('created_at', yearStart)
            .lte('created_at', yearEnd);

        if (error2) {
            return { success: false, error: error2.message };
        }

    return { success: true, data: yearlyTransactions, totalCount: count };}
    catch(error){
        console.log(error)
        redirect(303, "/private")
    }
    
};
