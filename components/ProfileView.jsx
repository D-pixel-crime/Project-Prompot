import PromptCard from "./PromptCard";

const ProfileView = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-center sm:text-left">
        <span className="orange_gradient">
          {name === "My" ? name : `${name}'s`} Profile
        </span>
        <p className="desc text-center sm:text-left">{desc}</p>
      </h1>
      <div className="mt-10 prompt_layout">
        {data.length > 0 ? (
          data.map((eachPrompt) => {
            return (
              <PromptCard
                key={eachPrompt._id}
                prompt={eachPrompt}
                handleEdit={() => handleEdit && handleEdit(eachPrompt)}
                handleDelete={() => handleDelete && handleDelete(eachPrompt)}
              />
            );
          })
        ) : (
          <p className="text-gray-400 text-sm">No Posts Till Now.</p>
        )}
      </div>
    </section>
  );
};
export default ProfileView;
