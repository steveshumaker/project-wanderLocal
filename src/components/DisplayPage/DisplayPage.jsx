import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function DisplayPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);
  const experiences = useSelector((store) => store.experience);

  return (
    <div>
      {experiences.map((experience) => {
        return <div key={experience.this_id}>{experience.name}</div>;
      })}
    </div>
  );
}

export default DisplayPage;
