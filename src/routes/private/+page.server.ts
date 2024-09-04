import type { Actions } from "../$types"
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { triggerToast } from "./store/Toaststore"
import { redirect } from "@sveltejs/kit"
import { CaptionSolid } from "flowbite-svelte-icons"
import { is } from "date-fns/locale"

export const actions: Actions = {
	moneyin: async ({ request, locals: { supabase } }) => {
		let message = '';
		let iserr = false
		try {
			const formData = await request.formData()
			let amount = formData.get('amount')
			let allocation = formData.get('allocation')
			let category = formData.get('category')
			let type = 0
			message = `Php ${amount} has been added to your account!`
			if (amount > 0) {

				try {
					allocation = allocation.trim()
				} catch (error) { }

				const user = await supabase.auth.getUser()
				let uuid = user.data.user.id

				try {
					if (allocation) {
						const { error } = await supabase
							.from('transactions')
							.insert({ user: uuid, amount: amount, notes: allocation, category: category, type: 0 })
						if (error) {
							iserr = error.message
							console.log("1")
						}
					} else {
						const { error } = await supabase
							.from('transactions')
							.insert({ user: uuid, amount: amount, category: category, type: 0 })
						if (error) {
							iserr = error.message
							console.log("2")
						}
					}
				} catch (error) {
					iserr = true
					message = "An error occured"
				}
			}


		} catch (error) {
			iserr = true
			message = "An error occured"
		}
		if (iserr) {
			throw redirect(303, `/private?message=${message}&duration=2000&type=2`);
		}
		else {
			throw redirect(303, `/private?message=${message}&duration=2000&type=1`)
		}
	},
	moneyout: async ({ request, locals: { supabase } }) => {
		let message = "";
		let iserr = false
		try {
			const user = await supabase.auth.getUser()
			let uuid = user.data.user.id

			const formData = await request.formData()
			let amount = formData.get('amount')
			let category = formData.get('category')
			let subcategory = formData.get('subcategory')
			let type = 1
			let allocation = formData.get('allocation')

			message = `Php ${amount} has been taken out of your account!`
			if (amount > 0) {
				try {
					allocation = allocation.trim()
				} catch (error) {
					message = "An Error Occured!"
					iserr = true
				}

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
		} catch (error) {
			message = "An Error Occured!"
			iserr = true
		}
		if (iserr) {
			throw redirect(303, `/private?message=${message}&duration=2000&type=2`);
		}
		else {
			throw redirect(303, `/private?message=${message}&duration=2000&type=1`)
		}
	},
	setBudget: async ({ request, locals: { supabase } }) => {
		let message = "";
		let iserr = false
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

			if (budgetType == 0) {
				message = "Your weekly budget has been set successfully"
			} else {
				message = "Your monthly budget has been set successfully"
			}

			if (expenses >= 0 && budgetAmount >= 0 && investments >= 0 && bills >= 0 && other >= 0) {
				const { data } = await supabase
					.from('budgetAllocations')
					.upsert({ user: uuid, budgetAmount: budgetAmount, type: budgetType, Expenses: expenses, Investment: investments, Bills: bills, Other: other })
			}
		} catch (error) {
			iserr = true
			message = "An Error Occured !"
		}
		if (iserr) {
			throw redirect(303, `/private?message=${message}&duration=2000&type=2`);
		}
		else {
			throw redirect(303, `/private?message=${message}&duration=2000&type=1`)
		}

	},

}


export const load = async ({ locals, url }) => {
	const user = await locals.supabase.auth.getUser();
	let uuid = user.data.user.id;

	const { data: transactions, error: error1 } = await locals.supabase
		.from("transactions")
		.select()
		.eq('user', uuid);

	const { data: budgetAllocations, error: error2 } = await locals.supabase
		.from('budgetAllocations')
		.select()
		.eq('user', uuid);

	const message = url.searchParams.get('message');
	const duration = parseInt(url.searchParams.get('duration'), 10) || 2000;
	const type = parseInt(url.searchParams.get('type'), 10) || 0;

	if (error1 || error2) {
		return { success: false, users: null, toast: { message, duration, type } };
	}

	return {
		success: true,
		data: [transactions, budgetAllocations],
		toast: { message, duration, type },
	};
};