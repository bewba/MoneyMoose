export const load = async ({ locals }) => {
	const { data: transactions, error } = await locals.supabase
		.from("transactions")
		.select()

	if (error) {
		console.log(error)
		return { success: false, users: null }
	}
	console.log("hello")
	console.log(transactions)
	console.log(error)
	return { success: true, transactions}
};