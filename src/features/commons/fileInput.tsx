import { FC } from "react";

export interface FileInputProps {
  onChange: (file: File) => void;
  allowedFileTypes?: string;
}

export const FileInput: FC<FileInputProps> = ({
  onChange,
  allowedFileTypes,
}) => {
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const image = e.target.files?.[0];
    if (image) {
      onChange(image);
    }
  };

  return (
    <input
      value=""
      onChange={handleImageChange}
      hidden
      required
      accept={allowedFileTypes}
      type="file"
    />
  );
};

export default FileInput;
