import React from "react";
import { Hero } from "../Fragments/HomeFragments/Hero";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FeaturesSection } from "../Fragments/HomeFragments/Featured";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import featuredData from "../data/featuredData";

function Home() {
  return (
    <>
      <Hero></Hero>
      {/* <FeaturesSection {...featuredData} /> */}
    </>
  );
}

export default Home;
