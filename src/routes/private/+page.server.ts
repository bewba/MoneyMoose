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