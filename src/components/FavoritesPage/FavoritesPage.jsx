import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const experiences = useSelector((store) => store.experience);
  const dispatch = useDispatch();
  // const favorites = experiences.filter((experience) => {
  //   return experience.favorite === true;
  // });

  useEffect(() => {
    experiences.map((experience) => {
      dispatch({
        type: "FETCH_EXTERNAL_DATA",
        payload: { name: experience.name },
      });
    });
  });

  return (
    <>
      <div>
        {experiences.map((experience) => {
          return (
            <div key={experience.this_id}>
              {experience.name}
              <button
                onClick={() =>
                  dispatch({
                    type: "FETCH_EXTERNAL_DATA",
                    payload: { name: experience.name },
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
