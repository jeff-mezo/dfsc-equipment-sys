'use client'
import { supabase } from '@/config/supabaseClient'

//!!!!!!!!!!!!!!!!!!!!! NOTE - THIS FILE UPLOAD HANDLE ONLY UPLOADS ON Form_5 !!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!! OVERRIDE THE CODE OR CREATE ANOTHER HANDLE FILE UPLOAD THAT SPECIFICALLY CATERS TO YOUR SPECIFIC BUCKET FOLDERS(s)!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!! CURRENT CODE DOES NOT ACCOUNT FOR: ALREADY EXISTING FILES IN THE BUCKET | IF THE USER ALREADY UPLOADED THE FILES | CHANGING THE USER STATUS FOR PASSING ALL REQS!!!!!!!!!!!!!
export async function handleFileUpload_Form5(file: File): Promise<void> {
  const filePath = file.name.toLowerCase();
  const { data, error } = await supabase.storage
    .from('Form_5')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error (Form_5):', error);
  } else {
    console.log('Upload successful (Form_5):', data);
  }
}

// Upload handler for Attendance files
export async function handleFileUpload_Attendance(file: File): Promise<void> {
  const filePath = file.name.toLowerCase();
  const { data, error } = await supabase.storage
    .from('Attendance')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error (Attendance):', error);
  } else {
    console.log('Upload successful (Attendance):', data);
  }
}

export async function handleFileUpload_Incident(file: File): Promise<void> {
  const filePath = file.name.toLowerCase();
  const { data, error } = await supabase.storage
    .from('Incident')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error (Incident):', error);
  } else {
    console.log('Upload successful (Incident):', data);
  }
}


//----------function for fetching pdf url function-----------//
export async function fetchBucketURL_Public(fileOrFileName: File | string): Promise<string | null> {
  let filePath: string;


  if (typeof fileOrFileName === 'string') {
    filePath = fileOrFileName.toLowerCase(); 
  } else {
    filePath = fileOrFileName.name.toLowerCase(); 
  }

  const { data } = supabase.storage
    .from('Attendance') 
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    console.error('Failed to fetch public URL for:', filePath);
    return null;
  }

  console.log('PDF URL Fetched:', data.publicUrl);
  return data.publicUrl;
}

