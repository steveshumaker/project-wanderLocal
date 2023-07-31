import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay.jsx";

function DisplayPage() {
  // init dispatch
  const dispatch = useDispatch();

  // fetch user's experiences on page load
  // TODO - this should happen after a succesful login
  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);

  // pulls the experiences array from the store
  const experiences = useSelector((store) => store.experience);

  return (
    <div>
      {experiences.map((experience) => {
        return (
          <div key={experience.this_id}>
            <ExperienceToDisplay experience={experience} />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default DisplayPage;
