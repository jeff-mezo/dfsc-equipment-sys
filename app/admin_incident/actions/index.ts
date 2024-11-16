"use server"

import { createClient } from "@/utils/supabase/server";
import useUser from "@/app/hook/useUser";
import { revalidatePath } from "next/cache";
import { useQueryClient } from "@tanstack/react-query";

export async function deleteIncident(id:number) {
    const supbase = await createClient()
    await supbase.from('incidentform').delete().eq("id", id)
    revalidatePath("/admin_incident")
}

export async function resolveIncident(id:string, status:boolean, data:any) {
    // const { isFetching, data } = useUser();
    // const queryClient = useQueryClient();

    const supabase = await createClient();
    const { data: updatedData, error } = await supabase
        .from('incidentform')
        .update({
            status,
        })
        .eq('id', id)
        .select() // Fetch the updated record
        .single();
    
    if (error) {
        console.error('Error updating record:', error);
        return JSON.stringify({ error: error.message });
    }
    
    revalidatePath('/admin_incident');
    return JSON.stringify(updatedData);
    
}
