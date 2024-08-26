import { redirect } from '@sveltejs/kit'
import { writable } from 'svelte/store'
import type { Actions } from './$types'
import currEmail  from "./store/emailstore"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  try {
      console.log("OASF");
      const { data: user, error } = await supabase.auth.getUser();
      if (user) {
          console.log(user);
      } else {
          console.log("No user data found.");
      }
  } catch (error) {
      console.error("Error fetching user:", error);
  }

  // If you want to redirect based on user status, you can do it here:
  if (!user) {
      throw redirect(303, '/auth/login');
  }

  return {};
};

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {

    

    let myEmail = null
    const formData = await request.formData()
    const email = formData.get('email') as string
    let iserr = null
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
    console.log(email)
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: false,
        },
      });
      console.log("verfity OTP")
      iserr = error
    } catch (error){
      console.log(error)
    }

    if (iserr){
      redirect(303, "/auth/signup/")
    } else {
      redirect(303, "/auth/verifyOtp/")
      
    }
    

    // if (supabase.)
    
  }
}