import type { Actions } from "../$types"
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"

export const actions: Actions = {
	moneyin: async ({ request, locals: { supabase } }) => {
		try {
			const formData = await request.formData()
			let amount = formData.get('amount')
			let allocation = formData.get('allocation')
			let category = formData.get('category')
			let type = 0
			if (amount > 0) {

				try {
					allocation = allocation.trim()
				} catch (error) { }

				const user = await supabase.auth.getUser()
				let uuid = user.data.user.id

				if (allocation) {
					const { error } = await supabase
						.from('transactions')
						.insert({ user: uuid, amount: amount, notes: allocation, category: category, type: 0 })
				} else {
					const { error } = await supabase
						.from('transactions')
						.insert({ user: uuid, amount: amount, category: category, type: 0})
				}
			}

		} catch (error) {
			console.log(error)
		}
	},
	moneyout: async ({ request, locals: { supabase } }) => {
		try {

			const user = await supabase.auth.getUser()
			let uuid = user.data.user.id

			const formData = await request.formData()
			let amount = formData.get('amount')
			let category = formData.get('category')
			let subcategory = formData.get('subcategory')
			let type = 1
			let allocation = formData.get('allocation')

			if (amount > 0) {
				try {
					allocation = allocation.trim()
				} catch (error) { }

				if (category == 'Expenses') {
					if (allocation) {
						const { error } = await supabase
							.from('transactions')
							.insert({
								user: uuid,
								amount: amount,
								category: category,
								subcategory: subcategory,
								notes: allocation,
								type: 1
							})
					} else {
						const { error } = await supabase
							.from('transactions')
							.insert({
								user: uuid,
								amount: amount,
								category: category,
								subcategory: subcategory,
								type: 1
							})
					}
				} else {
					if (allocation) {
						const { error } = await supabase
							.from('transactions')
							.insert({
								user: uuid,
								amount: amount,
								category: category,
								notes: allocation,
								type: 1
							})
					} else {
						const { error } = await supabase
							.from('transactions')
							.insert({
								user: uuid,
								amount: amount,
								category: category,
								type: 1
							})
					}
				}
			}
		} catch (error) { }
	},
	setBudget: async ({ request, locals: { supabase } }) => {
		try {
			const user = await supabase.auth.getUser()
			let uuid = user.data.user.id

			const formData = await request.formData()
			let budgetAmount = formData.get('budgetAmount')
			let budgetType = formData.get('budgetType')
			let expenses = formData.get("expenses")
			let investments = formData.get("investments")
			let bills = formData.get('bills')
			let other = formData.get("other")

			const { data } = await supabase
				.from('budgetAllocations')
				.upsert({ user: uuid, budgetAmount: budgetAmount, type: budgetType, Expenses: expenses, Investment: investments, Bills: bills, Other: other })

		} catch (error) { }


	},

}


export const load = async ({ locals }) => {
	const user = await locals.supabase.auth.getUser()
	let uuid = user.data.user.id
	let day = new Date
	// const monthStart = startOfMonth(day).toUTCString()
	// const monthEnd = endOfMonth(day).toUTCString()

	const { data: transactions, error: error1 } = await locals.supabase
		.from("transactions")
		.select()
		.eq('user', uuid)

	const { data: budgetAllocations, error: error2 } = await locals.supabase
		.from('budgetAllocations')
		.select()
		.eq('user', uuid)

	if (error1 || error2) {
		return { success: false, users: null }
	}
	


	
	return { success: true, data: [transactions, budgetAllocations]}
};