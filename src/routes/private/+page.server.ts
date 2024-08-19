import type { Actions } from "../$types"

export const actions: Actions = {
	moneyin: async ({ request, locals: { supabase } }) => {
		try {
			const formData = await request.formData()
			let amount = formData.get('amount')
			let allocation = formData.get('allocation')
			let category = formData.get('category')

			allocation = allocation.trim()
			const user = await supabase.auth.getUser()
			let uuid = user.data.user.id

			if (allocation) {
				const { error } = await supabase
					.from('moneyIn')
					.insert({ userId: uuid, amount: amount, allocation: allocation, category: category})
			} else {
				const { error } = await supabase
				.from('moneyIn')
				.insert({ userId: uuid, amount: amount, category: category})
			}


		} catch (error) {
			console.log(error)
		}
	},
	moneyout: async ({ request, locals: { supabase } }) => {
		
	}
}


export const load = async ({ locals }) => {
	const { data: moneyIn, error: error1 } = await locals.supabase
		.from("moneyIn")
		.select()

	const { data: moneyOut, error: error2 } = await locals.supabase
		.from('moneyOut')
		.select()

	if (error1 || error2) {
		console.log(error1, error2)
		return { success: false, users: null }
	}
	return { success: true, data: [moneyIn, moneyOut] ?? 0 }
};