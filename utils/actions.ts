'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { supabase } from '@/config/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next';

interface data {
  email: string;
  password: string;
  name: string;
  contactno: string;
  isadmin: number;
}

export async function login() {
  let redirectPath: string | null = null
  try {
  } catch (err) {
    console.log('UnexpectedError: ', err)
  } finally {
    redirectPath = '/equipmentpage'
    if (redirectPath) redirect(redirectPath)
  }
}


// export async function login(formData: FormData) {
//   let redirectPath: string | null = null
//   const loginData = {
//     emailData: formData.get('email') as string,
//     passwordData: formData.get('password') as string,
// }

//   try {
//     const { data, error } = await supabase
//       .from('users')
//       .select('email, password')
//       .eq('email', loginData.emailData )
//       .eq('password', loginData.passwordData )
    
//     if (error) {
//       console.log('Error: ', error)
//       return
//     }
  
//     if (data.length > 0) {
//       console.log('Data exists and matches the user input.')
//       redirectPath = '/equipmentpage'
//     } else {
//       console.log('No matching data found.')
//     }

//   } catch (err) {
//     console.log('UnexpectedError: ', err)
//   }
//     finally {
//       if (redirectPath)
//         redirect(redirectPath)
//   }


// }



// const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/account')


export async function signup(formData: FormData) {
  let redirectPath: string | null = null
  const userData: data = { 
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
    contactno: formData.get('contactNo') as string,
    isadmin: formData.get('isadmin') as unknown as number,
  };

  try {
    const { data, error } = await supabase
    .from('users')
    .insert([userData]);

    if (error) {
      console.error('Error sending data:', error);
      return;
    }

    console.log('User data sent successfully:', data);
    redirectPath = '/account'

    // Handle successful submission (e.g., clear form, show success message)
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    if (redirectPath)
      redirect(redirectPath)
  }
  

}

// const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  

  // const { error } = await supabase.auth.signUp(data)

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // redirect('/account')

  // const data = {
  //   email: formData.get('email') as string,
  //   name: formData.get('name') as string,
  //   password: formData.get('password') as string,
  //   contactNo: formData.get('contactNo') as string,
  // }



// const { email, name, contactno, isadmin, }
