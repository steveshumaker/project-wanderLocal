import { useSelector } from "react-redux";

function DisplayPage() {
  const experiences = useSelector((store) => store.experience);

  return (
    <div>
      {experiences.map((experience) => {
        return <div key={experience.id}>{experience.name}</div>;
      })}
    </div>
  );
}

export default DisplayPage;
