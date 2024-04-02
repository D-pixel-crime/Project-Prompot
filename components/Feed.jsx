"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

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
  const [isUserSearch, setIsUserSearch] = useState(false);

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
          const { data } = isUserSearch
            ? await axios.post("/api/prompt/search/users", {
                searchText: searchText,
              })
            : await axios.post("/api/prompt/search", {
                searchText: searchText,
              });

          setPrompts(data);
          return;
        } catch (error) {
          return console.log(error);
        }
      } else if (searchText === "") {
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
      <form className="relative flex-center w-full">
        <div className="flex">
          <button
            className="cursor-pointer mx-2 rounded-md border border-gray-200 bg-white p-2 text-sm shadow-lg font-medium focus:outline-none flex-center"
            onClick={(e) => {
              e.preventDefault();
              setToggleSearchOptions((preValue) => !preValue);
            }}
          >
            {isUserSearch ? (
              <Image
                src="/assets/icons/user.svg"
                alt="search by user"
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/assets/icons/script.svg"
                alt="search by user"
                width={30}
                height={30}
              />
            )}
            <Image
              src="/assets/icons/dropdown.svg"
              alt="search by user"
              width={30}
              height={30}
            />
          </button>
          {toggleSearchOptions && (
            <div className="search_dropdown z-10">
              <div
                className="dropdown_link hover:text-emerald-500"
                onClick={() => {
                  setIsUserSearch(false);
                  setToggleSearchOptions(false);
                }}
              >
                Search By Prompt or Tag
              </div>
              <div
                className="dropdown_link hover:text-amber-500"
                onClick={() => {
                  setIsUserSearch(true);
                  setToggleSearchOptions(false);
                }}
              >
                Search By Users
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder={
            isUserSearch
              ? "Search For A Username"
              : "Search For A Prompt or Tag"
          }
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
