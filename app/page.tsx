import { useSession } from "@supabase/auth-helpers-react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { login } from '@/utils/actions'
import { supabase } from "@/config/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface session {
  user?: {  // Make user optional
    id: string;
    email: string;
  };
  name?: string;  // Add optional properties
  image?: string;
  prevState: null;
}

export default function Home() {
  // const [session, setSession] = useState<session | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleAuthStateChange = async (event: any, session: any) => {
  //     setSession(session as session);
  //     if (!session) {
  //       // If the user is not authenticated, redirect to the login page
  //       router.push('/login');
  //     }
  //   };

  //     // Listen for auth state changes
  //   const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

  //     // Check if the user is already authenticated when the component mounts
  //   const getInitialSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     setSession(session);
  //   };
  //   getInitialSession();

  //     // Clean up the event listener on unmount
  //     return () => {
  //       authListener.subscription.unsubscribe();
  //     };
  //   }, []);


  return (
    <div>

    </div>
  );
}
