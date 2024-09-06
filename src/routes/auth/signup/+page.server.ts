import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'


export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    let message
    let iserr = false
    const formData = await request.formData()
    const email = formData.get('email') as string

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: true,
        },
      });
      if (error) {
        message = error.code
        iserr = true
      } else {
        message = 'SUCCESS! Check your e-mail for the confirmation link!';
      }
    } catch (error) {
      message = error
    }
    if (iserr) {
      if (message == "over_email_send_rate_limit"){
        message = "Too many accounts were created within the hour. Try again later"
      } else {
        message = 'An error occured'
      }
      console.log(iserr)
      redirect(302, `../../?message=${encodeURIComponent(message)}&duration=2000&type=2`)
    }
    else {
      redirect(302, `../../?message=${encodeURIComponent(message)}&duration=2000&type=1`)
    }
  }

}