//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 15 2024 PATCH NOTES:
- Added logic for making the verification forms true
- Added user prompt for existing forms replacement

DEC 14 2024 PATCH NOTES:
- Added fetchReservation function for calendar

DEC 7 2024 PATCH NOTES:
- incident upload handler now returns the new filname to allow external use to be passed to any database table as text

LINKED FILES:
- page.tsx of verification
- page.tsx of incident

WARNINGS:
- All buckets are public
- Calendar is very much rushed. New designs must be available in the future
- Calendar only displays
- ALL ERRORS SEEN IN HERE ARE TO BE IGNORED 

- Previous updates dev: KanadeTachie (King Behimino)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



'use client'
import { supabase } from '@/config/supabaseClient'

// Upload handler for Form5 files
export async function handleFileUpload_Form5(file: File, userID: string): Promise<void> {
  if (userID) {
    // Check if a Form 5 file already exists
    const existingFiles = await checkFileExists(userID, 'Form_5');
    
    if (existingFiles?.length > 0) {
      // Ask the user if they want to replace the existing file
      const shouldReplace = window.confirm("A Form 5 file already exists. Do you want to replace it?");
      
      if (shouldReplace) {
        // User confirmed to replace the file
        const fileRenamed = new File([file], `${userID}_Form_5.pdf`, { type: file.type });
        const { data, error } = await supabase.storage
          .from('Form_5')
          .upload(`${fileRenamed.name}`, fileRenamed, { upsert: true });
        
        if (error) {
          console.error('Upload error (Form_5):', error);
        } else {
          console.log('Upload successful (Form_5):', data);
          // Update prereq_Form5 boolean to true after successful upload
          await updatePrereqStatus(userID, 'Form5');
        }
      } else {
        // User chose not to replace the file
        console.log("File upload cancelled.");
      }
    } else {
      // No existing file, proceed to upload
      const fileRenamed = new File([file], `${userID}_Form_5.pdf`, { type: file.type });
      const { data, error } = await supabase.storage
        .from('Form_5')
        .upload(`${fileRenamed.name}`, fileRenamed, { upsert: true });
      
      if (error) {
        console.error('Upload error (Form_5):', error);
      } else {
        console.log('Upload successful (Form_5):', data);
        // Update prereq_Form5 boolean to true after successful upload
        await updatePrereqStatus(userID, 'Form5');
      }
    }
  } else {
    alert("You are not logged in! Please log in first before uploading files.");
  }
}



// Upload handler for Attendance files
export async function handleFileUpload_Attendance(file: File, userID: string): Promise<void> {
  if (userID) {
    // Check if an Attendance file already exists
    const existingFiles = await checkFileExists(userID, 'Attendance');
    
    if (existingFiles?.length > 0) {
      // Ask the user if they want to replace the existing file
      const shouldReplace = window.confirm("An Attendance file already exists. Do you want to replace it?");
      
      if (shouldReplace) {
        // User confirmed to replace the file
        const fileRenamed = new File([file], `${userID}_Attendance.pdf`, { type: file.type });
        const { data, error } = await supabase.storage
          .from('Attendance')
          .upload(`${fileRenamed.name}`, fileRenamed, { upsert: true });
        
        if (error) {
          console.error('Upload error (Attendance):', error);
        } else {
          console.log('Upload successful (Attendance):', data);
          // Update prereq_Attendance boolean to true after successful upload
          await updatePrereqStatus(userID, 'Attendance');
        }
      } else {
        // User chose not to replace the file
        console.log("File upload cancelled.");
      }
    } else {
      // No existing file, proceed to upload
      const fileRenamed = new File([file], `${userID}_Attendance.pdf`, { type: file.type });
      const { data, error } = await supabase.storage
        .from('Attendance')
        .upload(`${fileRenamed.name}`, fileRenamed, { upsert: true });
        
      if (error) {
        console.error('Upload error (Attendance):', error);
      } else {
        console.log('Upload successful (Attendance):', data);
        // Update prereq_Attendance boolean to true after successful upload
        await updatePrereqStatus(userID, 'Attendance');
      }
    }
  } else {
    alert("You are not logged in! Please log in first before uploading files.");
  }
}


export async function updatePrereqStatus(userID: string, category: 'Form5' | 'Attendance'): Promise<void> {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      [`prereq_${category}`]: true,
    })
    .eq('id', userID);

  if (error) {
    console.error(`Error updating ${category} status:`, error.message);
  } else {
    console.log(`${category} status updated to true for user ${userID}`);
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
    }}

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

//----------function for fetching reservations for calendar-----------//

interface Reservation {
  id: string;
  eqname: string;
  borrow_date: string;
  return_date?: string;
  profiles: {
  name: string;
  } | null; // profiles might be null
}


export async function fetchReservations() {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id, eqname, borrow_date, return_date,
      profiles (name, email, degprog, isAdmin)
    `);

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data.map((reservation) => ({
    id: reservation.id.toString(),
    title: `${reservation.eqname} (Borrowed by: ${reservation.profiles?.name || 'Unknown'})`,
    start: new Date(reservation.borrow_date).toISOString(),
    end: reservation.return_date
      ? new Date(reservation.return_date).toISOString()
      : undefined,
    extendedProps: {
      eq: reservation.eqname,
      borrowDate: reservation.borrow_date,
      returnDate: reservation.return_date,
      borrowerName: reservation.profiles?.name || 'Unknown',
      email: reservation.profiles?.email || 'N/A',
      degprog: reservation.profiles?.degprog || 'N/A',
      isAdmin: reservation.profiles?.isAdmin ? 'Yes' : 'No',
    },
  }));
}
