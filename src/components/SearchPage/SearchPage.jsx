import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SearchPage() {
  const experiences = useSelector((store) => store.experience);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    experiences.map((experience) => {
      if (experience.tags !== null) {
        setTagList((oldTags) => [...oldTags, experience.tags]);
      }
    });
  }, []);

  const flatTags = tagList.flat();
  const finalTags = [...new Set(flatTags)];

  return (
    <div>
      {finalTags.map((tag) => {
        return <span>{tag}{" "}</span>;
      })}
      <input type="text" />
    </div>
  );
}

export default SearchPage;
