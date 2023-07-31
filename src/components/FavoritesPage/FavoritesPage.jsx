import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const experiences = useSelector((store) => store.experience);
  const dispatch = useDispatch();
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  useEffect(() => {
    favorites.map((experience) => {
      dispatch({
        type: "FETCH_EXTERNAL_DATA",
        payload: { name: experience.name, id: experience.this_id },
      });
    });
  }, []);

  return (
    <>
      <div>
        {favorites.map((experience) => {
          return (
            <div key={experience.this_id}>
              {experience.name} | Reviews: {experience.rating} |{" "}
              {experience.stars}*
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
