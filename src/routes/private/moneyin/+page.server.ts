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