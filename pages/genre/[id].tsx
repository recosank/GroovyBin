import React from "react";
import GroovyLayout from "../../src/Layout/GroovyLayout";
import CenterSectionItems from "../../src/Components/CenterSectionItems";

const genreSelection = () => {
  return (
    <GroovyLayout source="/">
      <div
        style={{
          marginTop: "8%",
          height: "80vh",
        }}
      >
        <h1 style={{ color: "white", fontSize: "95px", fontWeight: "900" }}>
          Punk
        </h1>
        <div>
          <CenterSectionItems title="Popular Punk playlists" />
          <CenterSectionItems title="Felt Emo Might Delete" />
          <CenterSectionItems title="Punk Rock honchos" />
        </div>
      </div>
    </GroovyLayout>
  );
};

export default genreSelection;
