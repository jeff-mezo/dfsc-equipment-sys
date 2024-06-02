"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Equipment } from "../components/equipments/equipment-columns"



export async function createEquipment(dt: any) {
    const supbase = await createClient() 
    const result = await supbase.from("equipments").insert([dt]).single()
    revalidatePath("/admin")
    return JSON.stringify(result)
  }


export async function deleteEquipment(id:string) {
    const supbase = await createClient()
    await supbase.from('equipments').delete().eq("eq_id", id)
    revalidatePath("/admin")
}

export async function verifyUser(id:string, isVerified:boolean) {
    const supbase = await createClient()
    await supbase.from('profiles').update({isVerified}).eq('id', id)
    revalidatePath("/admin")
}




