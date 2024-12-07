//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 7 2024 PATCH NOTES:
- incident upload handler now returns the new filname to allow external use to be passed to any database table as text

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
export async function handleFileUpload_Incident(file: File, userID: string): Promise<string | null> {
  if (userID) {
    try {
      const existingFiles = await checkFileExists(userID, 'Incident');
      let fileIndex = existingFiles?.length || 0;

      // Generate the new filename
      const newFilename = `${userID}_Incident_${fileIndex + 1}.pdf`;
      const fileRenamed = new File([file], newFilename, { type: file.type });

      const { data, error } = await supabase.storage
        .from('Incident')
        .upload(newFilename, fileRenamed);

      if (error) {
        console.error('Upload error (Incident):', error);
        return null;
      } else {
        console.log('Upload successful (Incident):', data);
        return newFilename; // Return the new filename
      }
    } catch (error) {
      console.error('Error handling file upload', error);
      return null;
    }
  } else {
    alert('You are not logged in! Please log in first before uploading files.');
    return null;
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
//search in multiple buckets
export async function searchFileInBuckets(filename: string): Promise<string | null> {
  const buckets = ['Attendance', 'Form_5', 'Incident']
  for (const bucket of buckets) {
    const { data, error } = await supabase.storage.from(bucket).list('', { search: filename });

    if (error) {
      console.error(`Error fetching files from bucket "${bucket}":`, error.message);
      continue;
    }

    if (data?.some(file => file.name === filename)) {
      // Construct and return the public URL if the file is found
      return supabase.storage.from(bucket).getPublicUrl(filename).data.publicUrl;
    }
  }

  // Return null if the file is not found in any bucket
  return null;
}