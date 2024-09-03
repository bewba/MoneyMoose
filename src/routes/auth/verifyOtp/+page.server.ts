
import { redirect } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import storedEmail from '../store/emailstore'
import type { Actions } from './$types'
import { triggerToast } from '../../private/store/Toaststore'

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
      unsub()
    } catch (error) {}
   
    try {
      const { data: { session }, error,
      } = await supabase.auth.verifyOtp({
        email: myEmail[0].email,
        token: otp,
        type: 'email',
      })
    } catch (error) {}

    //TODO: Redirect user to private dashboard page
    if (iserr) {
      triggerToast(1,"An Error Occured", 2000)
      redirect(303, "../error/")
    } else {
      redirect(303, "../../private/")
    }
  }
}