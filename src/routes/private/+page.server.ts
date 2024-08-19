import type { Actions } from "../$types"

export const actions: Actions = {
    moneyin: async({ request, locals: { supabase }}) =>{
        const formData = await request.formData()
        const amount = formData.get('amount')
        const allocation = formData.get('allocation')
        console.log("jigga")
        console.log(amount,allocation)
    }
}


export const load = async ({ locals }) => {
	const { data: transactions, error } = await locals.supabase
		.from("transactions")
		.select()

	if (error) {
		console.log(error)
		return { success: false, users: null }
	}
	return { success: true, data: transactions ?? 0}
};