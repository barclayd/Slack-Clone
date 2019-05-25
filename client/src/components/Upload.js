import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { filesQuery } from './Files';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }],
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here...</p>
      ) : (
        <p>
          Drag and drop some files here, or alternatively click to select files
          from folder
        </p>
      )}
    </div>
  );
};

export default Upload;
