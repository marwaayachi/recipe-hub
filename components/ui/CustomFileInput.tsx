"use client";

import { useState } from "react";

interface CustomFileInputProps {
  name: string;
}

export default function CustomFileInput({ name }: CustomFileInputProps) {
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="bg-white/90 text-gray-800 p-3 rounded-lg text-center cursor-pointer border hover:bg-gray-100 transition">
        {fileName || "Upload Image"}
        <input
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) setFileName(e.target.files[0].name);
          }}
        />
      </label>
    </div>
  );
}
