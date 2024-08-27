import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'


export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string

    try{
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: true,
        },
      });
    }catch(error){
      console.log(error)
    }
      redirect(302, "../../")
  }

}