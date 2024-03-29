"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const ListPrompt = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout">
      {data.map((eachPrompt) => {
        return (
          <PromptCard
            key={eachPrompt._id}
            prompt={eachPrompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data } = await axios.get("/api/prompt");

      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search For A Prompt or Tag or Username"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          required
          className="search_input peer"
        />
      </form>

      <ListPrompt data={prompts} />
    </section>
  );
};
export default Feed;
