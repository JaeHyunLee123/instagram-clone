"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import Button from "./ui/Button";

export default function PostForm() {
  return (
    <form className="flex flex-col space-y-2 items-center justify-center">
      <section className="w-[500px] h-[400px] border-dashed border-2 border-black flex flex-col justify-center items-center space-y-2 rounded-2xl">
        <FontAwesomeIcon icon={faImage} className="fa-6x" />
        <span>.png 혹은 .jpg 파일을 업로드 해주세요.</span>
        <span>사진은 1장만 가능하고, 10mb 이하의 용량만 가능합니다.</span>
      </section>
      <textarea
        className="w-[500px] h-[300px]  border-2 border-black rounded-sm p-1"
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
