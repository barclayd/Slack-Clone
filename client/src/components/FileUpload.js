import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default ({ children, disableClick, forwardedRef }) => {

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: disableClick,
  });

  return (
    <div {...getRootProps()} ref={forwardedRef}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
