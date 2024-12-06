//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 6 2024 PATCH NOTES:
- Added restriction to accept only pdf files
- Renaming of uploaded files to match userid
- Overwrites the old file in the existing folder (for attendance & Form 5 only)
- Added filename format [UID]_[pdfType]_[?Increment].pdf
- Incremental upload filename for Incident Reports


LINKED FILES:
- page.tsx of verification
- page.tsx of incident

WARNINGS:
- All buckets are public

- Previous updates dev: KanadeTachie (King Behimino)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


'use client'
import { supabase } from '@/config/supabaseClient'

// Upload handler for Form5 files
export async function handleFileUpload_Form5(file: File, userID: string): Promise<void> {
  if(userID) {
    const fileRenamed = new File([file], `Form_5_${userID}_Form_5.pdf`, {type: file.type});
      const { data, error } = await supabase.storage
      .from('Form_5')
      .upload(`${fileRenamed.name}`, fileRenamed, { upsert:true });
      //upsert = replace file it is exists
    if (error) {
      console.error('Upload error (Form_5):', error);
    } else {
      console.log('Upload successful (Form_5):', data);
    }
  } else {
    alert("You are not logged in! Please log in first before uploading files.");
  }
  
}

// Upload handler for Attendance files
export async function handleFileUpload_Attendance(file: File, userID: string): Promise<void> {
  if(userID) {
    const fileRenamed = new File([file], `${userID}_Attendance.pdf`, {type: file.type});
      const { data, error } = await supabase.storage
      .from('Attendance')
      .upload(`${fileRenamed.name}`, fileRenamed, { upsert:true });
      //upsert = replace file it is exists
    if (error) {
      console.error('Upload error (Attendance):', error);
    } else {
      console.log('Upload successful (Attendance):', data);
    }
  } else {
    alert("You are not logged in! Please log in first before uploading files.");
  }
}

// Upload handler for Incident files
//WARNING: Incident files MUST NOT use upsert.
export async function handleFileUpload_Incident(file: File, userID: string): Promise<void> {
  if(userID) {
    try { 
      const existingFiles = await checkFileExists (userID, 'Incident');

      //number of existing files
      let fileIndex = existingFiles?.length || 0;    

      //Upload new Incident Report File with incremental counter
      const fileRenamed = new File([file], `${userID}_Incident_${fileIndex + 1}.pdf`, {type: file.type});
      const { data, error } = await supabase.storage
        .from('Incident')
        .upload(`${fileRenamed.name}`, fileRenamed);

      if (error) {
        console.error('Upload error (Incident):', error);
      } else {
        console.log('Upload successful (Incident):', data);
      }
    } 

    catch (error) {
      console.error('Error handling file upload', error);
    }

  } else {
    alert("You are not logged in! Please log in first before uploading files.");
  } 
}

//Existing File Checker : For Incident Reports
export async function checkFileExists (userID: string, location: string){
  const { data, error } = await supabase.storage
    .from(`${location}`) 
    .list('', { limit: 100 }); 

  if (error) {
    console.error('Error listing files:', error);
    return null;
  }

  // Filter files by user ID in the name
  const userFiles = data?.filter((file) => file.name.startsWith(userID));
  return userFiles;
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

