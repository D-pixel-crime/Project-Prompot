import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Create, Find & Share
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {" "}
          A.I Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Prompot (Prompt-Bot) is a contemporary, open-source AI tool designed to
        facilitate the exploration, generation, and distribution of creative
        prompts, enabling anyone to kick-start their AI conversation.
      </p>

      <Feed />
    </section>
  );
};
export default Home;
