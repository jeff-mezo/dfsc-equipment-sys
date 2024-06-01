"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEquipment(id:string) {
}


export async function deleteEquipment(id:string) {
    const supbase = await createClient()
    await supbase.from('equipments').delete().eq("eq_id", id)
    revalidatePath("/admin")
}

export async function verifyUser(id:string, isAdmin:boolean) {
    const supbase = await createClient()
    await supbase.from('profiles').update({isAdmin}).eq('id', id)
    revalidatePath("/admin")
}




