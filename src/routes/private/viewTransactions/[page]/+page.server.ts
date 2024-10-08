import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "../../$types";

export const actions: Actions = {
    deleteTransaction: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const id = formData.get("id");

        if (!id) {
            return { error: "Transaction ID is required" };
        }

        // Logic to delete the transactions
        try {
            const res = await supabase
            .from('transactions')
            .delete()
            .eq('id',id); 
            return { success: true };
        } catch (error) {
            return { error: "Failed to delete transaction" };
        }
    }
};

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const user = await locals.supabase.auth.getUser();
        const myPage = Number(params.page);

        if (!user.data.user?.id) {
            return { success: false, error: "User not authenticated" };
        }

        const uuid = user.data.user.id;
        const pageSize = 20;
        const offset = (myPage - 1) * pageSize;

        const { data: transactions, error: error1 } = await locals.supabase
            .from("transactions")
            .select()
            .eq('user', uuid)
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1);

        if (error1) {
            console.error("Supabase query error:", error1.message);
            return { success: false, error: error1.message };
        }

        const { count, error: error2 } = await locals.supabase
            .from('transactions')
            .select('id', { count: 'exact' })
            .eq('user', uuid);

        if (error2) {
            console.error("Supabase count error:", error2.message);
            return { success: false, error: error2.message };
        }



        return { success: true, data: transactions, totalCount: count };
    } catch (error) {
        console.error("Error in server load function:", error);
        throw redirect(303, "/private");
    }
};
