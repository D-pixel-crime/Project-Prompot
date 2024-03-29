"use client";

import Image from "next/image";
import { useState } from "react";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copiedOrNot, setCopiedOrNot] = useState("");

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="User-Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi text-sm font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-xs text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copiedOrNot === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gary-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm text-cyan-500 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>
    </div>
  );
};
export default PromptCard;
