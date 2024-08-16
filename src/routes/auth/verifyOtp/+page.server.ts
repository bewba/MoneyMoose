
import { redirect } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import storedEmail from '../store/emailstore'
import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const otp = formData.get('otp') as string
    let myEmail = null
    try {
      let unsub = storedEmail.subscribe(data => {
        myEmail = data
      })

    } catch (error) {
      console.log(error)
    }

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email: myEmail[0].email,
        token: otp,
        type: 'email',
      })
    } catch (error) { 
      console.log(error) 
    }
  }
}