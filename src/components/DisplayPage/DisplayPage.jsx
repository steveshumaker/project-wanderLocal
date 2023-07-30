import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function DisplayPage() {
  // init dispatch
  const dispatch = useDispatch();

  // fetch user's experiences on page load
  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);

  // pulls the experiences array from the store
  const experiences = useSelector((store) => store.experience);

  // local states for editing
  const [editingId, setEditingId] = useState(null);
  const [editToSend, setEditToSend] = useState({});
  // const [localExperiences, setLocalExperiences] = useState([]);

  // handles the save button click; cancel handled in jsx
  const sendUpdate = (id) => {
    console.log("updating number ", id);
    console.log("sending updates: ", editToSend);
    setEditingId(null);
    // send put
    dispatch({ type: "UPDATE_EXPERIENCE", payload: editToSend });
  };

  // updates the local state after edit button is clicked
  const handleEditClick = (experience) => {
    setEditingId(experience.this_id);
    setEditToSend({
      id: experience.this_id,
      name: experience.name,
      description: experience.description,
    });
  };

  const handleDeleteClick = (id) => {
    console.log("deleting id: ", id);
    dispatch({ type: "DELETE_EXPERIENCE", payload: {delId: id} });
  };

  return (
    <div>
      {experiences.map((experience) => {
        const isEditing = experience.this_id === editingId;

        return (
          <div key={experience.this_id}>
            {isEditing ? (
              <>
                <input
                  value={editToSend.name}
                  onChange={(e) =>
                    setEditToSend({ ...editToSend, name: e.target.value })
                  }
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
                <button onClick={() => sendUpdate(experience.this_id)}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{experience.name}</p>
                <p>{experience.description}</p>
                <button onClick={() => handleEditClick(experience)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(experience.this_id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayPage;
