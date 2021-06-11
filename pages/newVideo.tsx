import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { BsUpload } from "react-icons/bs";

export default function newVideoPage() {
  const [isUploading, setIsUploading] = useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setIsUploading(true);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isUploading) {
    return (
      <>
        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <BsUpload size={64} color="#606060" />
          {isDragActive ? (
            <span>Drop the video file here...</span>
          ) : (
            <>
              <span>Drag and drop video file to upload</span>
              <span>Your video will be private until you publish it</span>
            </>
          )}
        </UploadContainer>
      </>
    );
  }

  return (
    <>
      <h2>Video Name</h2>
      <h3>Details</h3>
      <label>Title (required)</label>
      <input />
      <label>Description</label>
      <textarea />
    </>
  );
}

const UploadContainer = styled.div`
  background-color: ${(props) => props.theme.colors.foreground};
  min-height: 500px;
  padding: 12px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

