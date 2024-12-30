import React from 'react';
import './FileStack.css';

const FolderDownload = ({ folderName }) => {
  const downloadUrl = `http://localhost:5000/api/download/${folderName}`;

  return (
    <div className="download-container">
      <h1>Download Folder</h1>
      <p>{folderName}</p>
      <a href={downloadUrl} download>
        Download
      </a>
    </div>
  );
};

export default FolderDownload;
