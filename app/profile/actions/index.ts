"use server"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export async function updateProfile(id: any , dt: any) {
    const supbase = await createClient()
    const result = await supbase.from('profiles').update(dt).eq('id', id)
    revalidatePath("/profile")
    return JSON.stringify(result)
}