import { useState } from "react";

function EntryPage() {
  const [experienceToSend, setExperienceToSend] = useState({
    exp_name: "",
    description: "",
    web_path: "",
    photo_path: "",
  });

  const sendExperience = (e) => {
    e.preventDefault();
    console.log("Sending: ", experienceToSend);
  };

  return (
    <div>
      <form onSubmit={(e) => sendExperience(e)}>
        <label htmlFor="nameIn">Name:</label>
        <input
          value={experienceToSend.exp_name}
          onChange={(e) => {
            setExperienceToSend({
              ...experienceToSend,
              exp_name: e.target.value,
            });
          }}
          id="nameIn"
          type="text"
        />
        <label htmlFor="descIn">Description:</label>
        <input
          value={experienceToSend.description}
          onChange={(e) => {
            setExperienceToSend({
              ...experienceToSend,
              description: e.target.value,
            });
          }}
          id="descIn"
          type="text"
        />
        <label htmlFor="webPathIn">Link:</label>
        <input
          value={experienceToSend.web_path}
          onChange={(e) => {
            setExperienceToSend({
              ...experienceToSend,
              web_path: e.target.value,
            });
          }}
          id="webPathIn"
          type="text"
        />
        <label htmlFor="photoPathIn">Pic:</label>
        <input
          value={experienceToSend.photo_path}
          onChange={(e) => {
            setExperienceToSend({
              ...experienceToSend,
              photo_path: e.target.value,
            });
          }}
          id="photoPathIn"
          type="text"
        />
        <button type="submit">Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

export default EntryPage;
