import { error, redirect } from "@sveltejs/kit";
import currEmail from "./store/emailstore";
import { is } from "date-fns/locale";

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    let myEmail = null;
    const formData = await request.formData();
    const email = formData.get('email') as string;
    let iserr = null;
    let message = "An Error Occured"
    try {
      const unsub = currEmail.subscribe(data => {
        myEmail = data;
      });
      if (email && myEmail) {
        myEmail[0].email = email;
        currEmail.set(myEmail);
      }
      unsub();
    } catch (error) {
      console.log(error)
      redirect(303, `/auth/?message=${encodeURIComponent(message)}&duration=2000&type=2`)
    }

    try {
      console.log(email);
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        },
      });
      console.log("Verify OTP");
      iserr = error;
    } catch (error) {
      redirect(303, `/auth/signup/?message=${encodeURIComponent(iserr)}&duration=2000&type=2`)
    }

    if (iserr) {
        redirect(303, `/auth/signup/?message=${encodeURIComponent(iserr)}&duration=2000&type=2`)
    } else {
        redirect(303, `/auth/verifyOtp/`)
    }
  }
}
