"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import Button from "./ui/Button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PostForm() {
  const [imagePreview, setImagePreview] = useState("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;

      if (typeof binaryStr === "string") {
        setImagePreview(binaryStr);
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form className="flex flex-col space-y-2 items-center justify-center">
      {imagePreview ? (
        <div className="flex flex-col justify-center items-center space-y-2">
          <Image
            alt="image-preview"
            width={400}
            height={500}
            src={imagePreview}
            className="rounded w-[400px] h-[500px] object-cover object-center"
          />
          <Button variants="outline" onClick={() => setImagePreview("")}>
            다른 사진 업로드 하기
          </Button>
        </div>
      ) : (
        <section
          {...getRootProps()}
          className={cn(
            "w-[400px] h-[500px] border-dashed border-2 transition-colors border-black flex flex-col justify-center items-center space-y-2 rounded-2xl",
            isDragActive ? "bg-neutral-200" : ""
          )}
        >
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faImage} className="fa-6x" />
          <span>.png 혹은 .jpg 파일을 업로드 해주세요.</span>
          <span>사진은 1장만 가능하고, 10mb 이하의 용량만 가능합니다.</span>
        </section>
      )}
      <textarea
        className="w-[400px] h-[300px]  border-2 border-black rounded-sm p-1"
        placeholder="게시글을 작성해주세요. (최대 1000자 이하)"
      />
      <div className="flex justify-start items-center space-x-0.5 w-full">
        <input type="checkbox" id="anonymous" />
        <label htmlFor="anonymous">익명 게시물</label>
      </div>
      <Button className="w-2xs">포스트</Button>
    </form>
  );
}
