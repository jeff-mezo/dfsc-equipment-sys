//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 7 2024 PATCH NOTES:
- Added some frontend. Still need better frontend functions
- Added usage manual 
- Search engine can now find files accross any bucket
- Backend is done, but ideally, it should not be a separate search page. It should only link the webpage instead (backlogged)
- Renamed PDFViewer as viewPDF

WARNINGS:
- This page is a temporary placement for pdf viewing. Future upgrades should only have this page as a link instead of a search engine
- When the user/admin wants to view a pdf, IT SHOULD redirect here with their current userID as the file name upon query (backlogged)
- Final page MUST NOT ask for input from the user/admin. Query must be automatic (backlogged)

- Previous updates dev: KanadeTachie (King Behimino)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

'use client'
import React, { useEffect, useState } from 'react';
import { searchFileInBuckets } from '@/utils/clientActions';
import useUser from '@/app/hook/useUser';
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'



const PdfSearchViewer: React.FC = () => {
  const [fileName, setFileName] = useState<string>(''); //input filename
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // fetched url storage
  const [error, setError] = useState<string | null>(null); //error storage
  const [userID, setUserId] = useState<string | null>(null)
  const { isFetching, data } = useUser();

//fetching userid of current user login. UID parsed to string and passed as filename for pdf
  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);

  const handleSearch = async () => {
    setError(null); // Reset any previous error
    setPdfUrl(null); // Reset the PDF URL
    if (!fileName.trim()) {
      setError('Please enter a valid file name.');
      return;
    }

    const url = searchFileInBuckets(fileName + '.pdf')
    .then(fileUrl => {
      if (fileUrl) {
        console.log('File found at:', fileUrl);
        setPdfUrl(fileUrl)
      } else {
        console.log('File not found in any bucket.');
      }
    })
  .catch(err => console.error('Error searching for file:', err));

  };

  return (
    <div>
       <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Documents Viewer</h1>
            <p className="mt-1 text-md text-gray-600 dark:text-gray-400">
                View uploaded documents from you, or other users (admin only).
                
            </p>
            
      <div>
        <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                  className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm focus:border-[#9B151E] focus:ring-[#9B151E] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
                  placeholder="Search equipment..."
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}

              />
            </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <p className="mt-1 text-md text-gray-600 dark:text-gray-400">
        <b>Usage:</b> [yourUserID]_[Attendance/Form_5]
        <br></br><b>Usage for Incident Reports (Admin only):</b> [UserID]_Incident_[number]
        <br></br><b>Your userID: </b> <span className="mt-3 font-medium text-gray-900 dark:text-gray-100">{userID || 'Loading...'}</span>
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pdfUrl ? (
        <div id="pdf-viewer">
          <iframe src={pdfUrl} width="100%" height="1000px" title="PDF Viewer"></iframe>
        </div>
      ) : (
        !error
      )}
    </div>
  );
};

export default PdfSearchViewer;
