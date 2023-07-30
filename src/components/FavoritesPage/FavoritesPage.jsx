import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const [userFavs, setUserFavs] = useState([]);
  const experiences = useSelector((store) => store.experience);
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  useEffect(() => {
    setUserFavs(favorites);
  }, []);

  return (
    <>
      <div>
        {favorites.map((experience) => {
          return <div key={experience.this_id}>{experience.name}</div>;
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
