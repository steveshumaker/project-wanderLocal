import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const experiences = useSelector((store) => store.experience);
  const dispatch = useDispatch();
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  return (
    <>
      <div>
        {favorites.map((experience) => {
          return (
            <div key={experience.this_id}>
              {experience.name} | Reviews: {experience.rating} |{" "}
              {experience.stars}*'s | Path:{" "}
              <a
                href={experience.web_path}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
