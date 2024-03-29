"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [postPrompt, setPostPrompt] = useState("");
  const [tag, setTag] = useState("");

  const createNewPrompt = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await axios.post("/api/prompt/new", {
        userId: session?.user.id,
        prompt: postPrompt,
        tag: tag,
      });

      if (data) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      postPrompt={postPrompt}
      setPostPrompt={setPostPrompt}
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleSubmit={createNewPrompt}
    />
  );
};
export default CreatePrompt;
