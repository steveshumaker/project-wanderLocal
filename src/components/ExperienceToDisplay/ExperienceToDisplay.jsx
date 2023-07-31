import { useDispatch } from "react-redux";
import { useState } from "react";

function ExperienceToDisplay({ experience }) {
  // local states for editing
  const [editToSend, setEditToSend] = useState({});
  const [editingId, setEditingId] = useState(null);

  // init dispatch
  const dispatch = useDispatch();

  const isEditing = experience.this_id === editingId;

  // handles the save button click; cancel handled in jsx
  const sendUpdate = (id) => {
    setEditingId(null);
    dispatch({ type: "UPDATE_EXPERIENCE", payload: editToSend });
  };

  // updates the local state after edit button is clicked
  const handleEditClick = (experience) => {
    setEditingId(experience.this_id);
    setEditToSend({
      id: experience.this_id,
      name: experience.name,
      description: experience.description,
      web_path: experience.web_path,
    });
  };

  // handles the delete button click
  const handleDeleteClick = (id) => {
    dispatch({ type: "DELETE_EXPERIENCE", payload: { delId: id } });
  };

  // toggle functionality for favorite button
  const handleFavoriteClick = (experience) => {
    console.log("favoriting id: ", experience.this_id);
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { favId: experience.this_id, favorite: experience.favorite },
    });
  };

  return (
    <>
      {isEditing ? (
        <>
          <p>{experience.name}</p>
          <input
            value={editToSend.web_path}
            onChange={(e) => {
              setEditToSend({
                ...editToSend,
                web_path: e.target.value,
              });
            }}
          />
          <input
            value={editToSend.description}
            onChange={(e) => {
              setEditToSend({
                ...editToSend,
                description: e.target.value,
              });
            }}
          />
          <button onClick={() => sendUpdate(experience.this_id)}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{experience.name}</p>
          <p>{experience.description}</p>
          <p>
            {" "}
            {experience.web_path ? (
              <a target="_blank" href={experience.web_path}>
                Link
              </a>
            ) : (
              <a
                target="_blank"
                href={`https://www.google.com/search?q=${experience.name}`}
              >
                Search
              </a>
            )}
          </p>
          {experience.favorite ? <p>Fav</p> : null}
          <button onClick={() => handleFavoriteClick(experience)}>Heart</button>
          <button onClick={() => handleEditClick(experience)}>Edit</button>
          <button onClick={() => handleDeleteClick(experience.this_id)}>
            Delete
          </button>
        </>
      )}
    </>
  );
}

export default ExperienceToDisplay;
