import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay";

function FavoritesPage() {
  const dispatch = useDispatch();
  const experiences = useSelector((store) => store.experience);
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);

  return (
    <div>
      {favorites.map((experience) => {
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

export default FavoritesPage;
