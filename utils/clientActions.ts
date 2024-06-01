'use client'
import { supabase } from '@/config/supabaseClient'

//!!!!!!!!!!!!!!!!!!!!! NOTE - THIS FILE UPLOAD HANDLE ONLY UPLOADS ON Form_5 !!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!! OVERRIDE THE CODE OR CREATE ANOTHER HANDLE FILE UPLOAD THAT SPECIFICALLY CATERS TO YOUR SPECIFIC BUCKET FOLDERS(s)!!!!!!!!!!!!!!!!!!!!!!!!!!
export async function handleFileUpload_Form5(file, userId) {
    const filePath = `${userId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from('Form_5')
      .upload(filePath, file, { upsert: true });
  
    if (error) {
      console.error('Upload error (Form_5):', error);
    } else {
      console.log('Upload successful (Form_5):', data);
      await updateUserFileStatus(userId, { prereq_Form5: true });
    }
  }


  export async function handleFileUpload_Attendance(file, userId) {
    const filePath = `${userId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from('Attendance')
      .upload(filePath, file, { upsert: true });
  
    if (error) {
      console.error('Upload error (Attendance):', error);
    } else {
      console.log('Upload successful (Attendance):', data);
      await updateUserFileStatus(userId, { prereq_Attendance: true });
    }
  }
  async function updateUserFileStatus(userId, fileStatus) {
    const { data, error } = await supabase
      .from('profiles')
      .update(fileStatus)
      .eq('id', userId); 
  
    if (error) {
      console.error('Update error:', error);
    } else {
      console.log('Update successful:', data);
    }
  }
  
  // Check if the user has already uploaded files
  export async function checkUserFileStatus(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('prereq_Form5, prereq_Attendance')
      .eq('id', userId) // Ensure this matches your primary key column name
      .single();
  
    if (error) {
      console.error('Check error:', error);
      return { prereq_Form5: false, prereq_Attendance: false };
    } else {
      return data;
    }
  }