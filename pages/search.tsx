import React from "react";
import SearchSectionCard from "../src/Components/SearchSectionCard";
import GroovyLayout from "../src/Layout/GroovyLayout";

const search = () => {
  return (
    <GroovyLayout source="search">
      <div
        style={{
          marginTop: "5.5%",
          height: "80vh",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "600",
          }}
        >
          Browse all
        </p>
        <div
          style={{
            display: "grid",
            rowGap: "20px",
            grid: "auto auto / auto auto auto auto auto auto auto auto ",
          }}
        >
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
          <SearchSectionCard />
        </div>
      </div>
    </GroovyLayout>
  );
};

export default search;
