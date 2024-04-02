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
  const [toggleSearchOptions, setToggleSearchOptions] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data } = await axios.get("/api/prompt");

      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchText) {
        try {
          const { data } = await axios.post("/api/prompt/search", {
            searchText: searchText,
          });

          setPrompts(data);
          return;
        } catch (error) {
          return console.log(error);
        }
      } else {
        try {
          const { data } = await axios.get("/api/prompt");

          setPrompts(data);
          return;
        } catch (error) {
          return console.log(error);
        }
      }
    };
    handleSearch();
  }, [searchText]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <form
        className="relative flex-center w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex">
          <button
            className="rounded-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setToggleSearchOptions((preValue) => !preValue);
            }}
          >
            SET
          </button>
          {toggleSearchOptions && (
            <div className="dropdown z-50">
              <div
                className="dropdown_link"
                onClick={() => setToggleSearchOptions(false)}
              >
                Search By Username or Tag
              </div>
              <div
                className="dropdown_link"
                onClick={() => setToggleSearchOptions(false)}
              >
                Search By Users
              </div>
            </div>
          )}
        </div>
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

      <ListPrompt data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
