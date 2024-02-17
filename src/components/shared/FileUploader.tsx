import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex cursor-pointer flex-col flex-1 justify-center bg-dark-3 p-5 w-full">
          <img src={fileUrl} alt="image" className="file_uploader-img" />
          <p className="text-zinc-600 text-center pt-5 font-bold">Click or drag to replace image</p>
        </div>
      ) : (
        <div className="file_uploader-box rounded-xl cursor-pointer bg-dark-3">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={76}
            alt="file upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag your file</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
