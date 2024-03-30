"use client";

import Form from "@components/Form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const promptId = useSearchParams().get("id");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [postPrompt, setPostPrompt] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/prompt/update/${promptId}`);
        setPostPrompt(data.prompt);
        setTag(data.tag);
      } catch (error) {
        return console.log(error);
      }
    };
    if (promptId) fetchData();
  }, [promptId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await axios.patch(`/api/prompt/update/${promptId}`, {
        prompt: postPrompt,
        tag: tag,
      });
      router.push("/profile");
    } catch (error) {
      return console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      postPrompt={postPrompt}
      setPostPrompt={setPostPrompt}
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleSubmit={handleUpdate}
    />
  );
};
export default UpdatePrompt;
