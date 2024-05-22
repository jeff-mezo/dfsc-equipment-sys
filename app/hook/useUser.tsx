import { createClient } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const initUser = {
    contactno: "",
    email: "",
    id: "",
    name: "",
}

export default function useUser() {
  return (
    useQuery({
        queryKey:["user"],
        queryFn:async ()=>{
            const supabase = createClient();
            const {data} = await supabase.auth.getSession();
            
            if(data.session?.user){
                //fetch user data sheesh
                const {data:user} = await supabase
                    .from("profiles")
                    .select("*") 
                    .eq("id", data.session.user.id)
                    .single();
                return user;
            }
            return initUser;
        }
    })
  )
}
