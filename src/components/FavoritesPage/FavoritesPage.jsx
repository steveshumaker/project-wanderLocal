import { useSelector } from "react-redux";

function FavoritesPage() {
  const experiences = useSelector((store) => store.experience);
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  return (
    <>
      <div>
        {favorites.map((experience) => {
          return <div>{experience.name}</div>;
        })}
      </div>
    </>
  );
}

export default FavoritesPage;
