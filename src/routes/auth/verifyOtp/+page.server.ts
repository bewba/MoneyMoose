
import { redirect } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import storedEmail from '../store/emailstore'
import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const otp = formData.get('otp') as string
    let iserr = null
    let myEmail = null
    try {
      let unsub = storedEmail.subscribe(data => {
        myEmail = data
      })

    } catch (error) {
      console.log(error)
    }
    console.log(myEmail[0].email)
    console.log(otp)
   
    try {
      const { data: { session }, error,
      } = await supabase.auth.verifyOtp({
        email: myEmail[0].email,
        token: otp,
        type: 'email',
      })
      console.log(session, error)
    } catch (error) {
      console.log(error)
    }

    //TODO: Redirect user to private dashboard page
    if (iserr) {
      redirect(303, "../error/")
    } else {
      redirect(303, "../../private/")
    }
  }
}