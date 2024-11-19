//!!!!!!!!!!!!!!!!!!!!! WARNING : THIS PAGE IS NOT FINAL FOR PDF VIEWING - NO FRONTEND HAS BEEN DEVELOPED YET AS OF NOVEMBER 19, 2024!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!! ALL BUCKET STORAGES ARE SET TO PUBLIC !!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!! WHEN THE ADMIN/USER WANTS TO VIEW A PDF, IT SHOULD DIRECT HERE WITH THEIR NAMES ALREADY SET AUTOMATICALLY UPON QUERY.!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!! PAGE SHOULD NOT ASK FOR INPUT FROM USER/ADMIN !!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!! Test Usage: [filename] + .pdf (CASE SENSITIVE) !!!!!!!!!!!!!!!!!!!!!!!!
'use client'
import React, { useState } from 'react';
import { fetchBucketURL_Public } from '@/utils/clientActions';


const PdfSearchViewer: React.FC = () => {
  const [fileName, setFileName] = useState<string>(''); //input filename
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // fetched url storage
  const [error, setError] = useState<string | null>(null); //error storage

  const handleSearch = async () => {
    setError(null); // Reset any previous error
    setPdfUrl(null); // Reset the PDF URL
    if (!fileName.trim()) {
      setError('Please enter a valid file name.');
      return;
    }

    const url = await fetchBucketURL_Public(fileName+'.pdf'); // function located in clientActions.ts
    if (url) {
      setPdfUrl(url);
    } else {
      setError('PDF not found or could not be fetched.');
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1 >Search and View PDF</h1>
      <div>
        <input
          type="text"
          placeholder="Enter PDF file name (e.g., document.pdf)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pdfUrl ? (
        <div id="pdf-viewer">
          <iframe src={pdfUrl} width="100%" height="1000px" title="PDF Viewer"></iframe>
        </div>
      ) : (
        !error && <p>Please enter a file name to search for its PDF.</p>
      )}
    </div>
  );
};

export default PdfSearchViewer;
