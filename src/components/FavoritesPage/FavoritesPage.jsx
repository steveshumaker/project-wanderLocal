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
              <a
                href={experience.web_path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {experience.name}
              </a>{" "}
              | Reviews: {experience.rating} | {experience.stars}{" "}
              <img src="/yelp_images/small_5.png" /> | Path:{" "}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
