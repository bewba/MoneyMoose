import { redirect } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import type { Actions } from './$types'
import currEmail  from "./store/emailstore"


export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    let myEmail = null
    const formData = await request.formData()
    const email = formData.get('email') as string

    try {
      const unsub = currEmail.subscribe( data => {
        myEmail = data
      });    
      if (email && myEmail) {
        myEmail[0].email = email
        currEmail.set(myEmail)
      }
      unsub()
    } catch (error) {
      console.log("No Email Presented")
    }
   
    try{
    console.log("nigger")
    console.log(email)
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: false,
        },
      });
      console.log("verfity OTP")
      throw redirect(303,"/auth/verifyOtp/")
    } catch (error){
      console.log("error")
      console.log(error)
      throw redirect(303, "/auth/signup/")
    }
    
    console.log (data,error)
    // if (supabase.)
    
  }
}