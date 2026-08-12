import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.info/api/species";
const PAGE_SIZE = 10;
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sw-species"],
    queryFn: () => fetchUrl(initialUrl),
  });

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.toString()}</div>;
  }

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={visibleCount < data.length}
    >
      {data.slice(0, visibleCount).map((species) => (
        <Species
          key={species.name}
          name={species.name}
          language={species.language}
          averageLifespan={species.average_lifespan}
        />
      ))}
    </InfiniteScroll>
  );
}