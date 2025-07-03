"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import Button from "./ui/Button";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function PostForm() {
  const [imagePreview, setImagePreview] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        if (typeof binaryStr === "string") {
          setImagePreview(binaryStr);
          setCroppedImage(""); // Reset cropped image when new image is uploaded
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: Math.min(width, height),
      },
      1, // aspect ratio 1:1
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  async function handleCropImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const image = imgRef.current;

    if (!image || !crop || !crop.width || !crop.height) {
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    canvas.style.width = `${Math.floor(crop.width * scaleX)}px`;
    canvas.style.height = `${Math.floor(crop.height * scaleY)}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.scale(pixelRatio, pixelRatio);

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64Image);
  }

  const handleReset = () => {
    setImagePreview("");
    setCroppedImage("");
    setCrop(undefined);
  };

  return (
    <form className="flex flex-col space-y-2 items-center justify-center">
      {croppedImage ? (
        <div className="flex flex-col justify-center items-center space-y-2">
          <Image
            alt="cropped-preview"
            width={400}
            height={400}
            src={croppedImage}
            className="rounded w-[400px] h-[400px] object-cover object-center"
          />
          <div className="flex justify-center items-center space-x-0.5">
            <Button
              variants="outline"
              onClick={(e) => {
                e.preventDefault();
                setCroppedImage("");
              }}
            >
              다시 자르기
            </Button>
            <Button variants="outline" onClick={handleReset}>
              다른 사진 업로드
            </Button>
          </div>
        </div>
      ) : imagePreview ? (
        <div className="flex flex-col justify-center items-center space-y-2">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1}
            className="w-[400px] "
          >
            {/* Cannot use NextJS's Image with react image crop  */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              alt="image-preview"
              src={imagePreview}
              onLoad={onImageLoad}
              className="rounded w-[400px] object-cover object-center"
            />
          </ReactCrop>
          <div className="flex justify-center items-center space-x-0.5">
            <Button variants="outline" onClick={handleReset}>
              다른 사진 업로드
            </Button>
            <Button variants="default" onClick={handleCropImage}>
              사진 자르기
            </Button>
          </div>
        </div>
      ) : (
        <section
          {...getRootProps()}
          className={cn(
            "size-[400px] border-dashed border-2 transition-colors border-black flex flex-col justify-center items-center space-y-2 rounded-2xl",
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
      <Button type="submit" className="w-2xs">
        포스트
      </Button>
    </form>
  );
}
