import Link from "next/link";

const Form = ({
  type,
  postPrompt,
  setPostPrompt,
  tag,
  setTag,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="w-full max-w-ful flex-center flex-col mb-5">
      <h1 className="head_text text-left">
        <span className="green_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share extraordinary prompts for the global audience, allowing
        your creativity to kick-start someone's AI conversation.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 green_glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={postPrompt}
            onChange={(event) => {
              setPostPrompt(event.target.value);
            }}
            placeholder="Enter Your Prompt Here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags {` `}
            <span className="text-normal">
              (#webdevelopment, #creative, #informative, etc.)
            </span>
          </span>
          <input
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            placeholder="#placeYourTagsHere"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mb-5 gap-4 mx-3">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="green_btn text-sm"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
