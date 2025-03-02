import { Spin } from "antd";
import React, { useEffect, useState } from "react";

const FileUploader = ({ url, onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreviewUrl(url);
  }, [url]);
  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (onUpload) onUpload(file);
    if (file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Please upload a valid image file.");
        return;
      }

      setLoading(true); // Set loading state

      // Simulate a fake upload process
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setPreviewUrl(reader.result); // Update preview
          setLoading(false); // Stop loading
        }, 500); // Simulate a delay for uploading
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Image Previewer as Button */}
      <label
        htmlFor="file-input"
        className={`w-32 h-32 border-2 border-black border-solid rounded-full overflow-hidden bg-gray-200 cursor-pointer flex items-center justify-center transition-all ${
          loading ? "bg-gray-300 animate-pulse" : "hover:bg-gray-300"
        }`}
      >
        {loading ? (
          <Spin />
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Click to Upload</span>
        )}
        {/* Hidden Input */}
        <input
          id="file-input"
          type="file"
          name="logo"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUploader;
