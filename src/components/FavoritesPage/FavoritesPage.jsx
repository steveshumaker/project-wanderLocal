import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const experiences = useSelector((store) => store.experience);
  const dispatch = useDispatch();
  // const favorites = experiences.filter((experience) => {
  //   return experience.favorite === true;
  // });

  return (
    <>
      <div>
        {experiences.map((experience) => {
          const busName = experience.name.replace(/\s+/g, "");

          return (
            <div key={experience.this_id}>
              {experience.name}
              <button
                onClick={() =>
                  dispatch({
                    type: "FETCH_EXTERNAL_DATA",
                    payload: { name: busName },
                  })
                }
              >
                Click for yelp
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
