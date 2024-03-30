"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copiedOrNot, setCopiedOrNot] = useState("");
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = () => {
    setCopiedOrNot(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopiedOrNot("");
    }, 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer hover:underline"
          onClick={() => router.push(`/viewProfile?id=${prompt.creator._id}`)}
        >
          <Image
            src={prompt.creator.image}
            alt="User-Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="text-xs text-gray-400">{prompt.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copiedOrNot === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={20}
            height={20}
            alt="Copy Icon"
          />
        </div>
      </div>
      <p className="my-4 text-sm text-black mt-7">{prompt.prompt}</p>
      <p
        className="text-sm text-cyan-500 cursor-pointer hover:underline w-fit"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathname === "/profile" ? (
        <div className="flex-between mt-5 mb-2 mx-1">
          <Image
            src="/assets/icons/edit.svg"
            width={22}
            height={22}
            alt="Edit Prompt"
            onClick={handleEdit}
            className="cursor-pointer bg-white p-1.5 rounded-full size-8"
          />
          <Image
            src="/assets/icons/delete.svg"
            width={22}
            height={22}
            alt="Delete Prompt"
            onClick={handleDelete}
            className="cursor-pointer bg-white p-1.5 rounded-full size-8"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default PromptCard;
