import React from "react";
import CenterSectionItems from "./CenterSectionItems";
import GroovyLayout from "../Layout/GroovyLayout";

const CenterSection = () => {
  return (
    <GroovyLayout source="/">
      <CenterSectionItems title="Spotify original & exclusive shows" />
      <CenterSectionItems title="Trending now" />
      <CenterSectionItems title="Try something else" />
      <CenterSectionItems title="Featured Charts" />
      <CenterSectionItems title="Shows to try" />
    </GroovyLayout>
  );
};

export default CenterSection;
