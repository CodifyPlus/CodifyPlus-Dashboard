import React from "react";
import { Hero } from "../Fragments/HomeFragments/Hero";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FeaturesSection } from "../Fragments/HomeFragments/Featured";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import featuredData from "../data/featuredData";
import { BackedBy } from "../Fragments/HomeFragments/BackedBy";

function Home() {
  return (
    <>
      <Hero/>
      <BackedBy/>
    </>
  );
}

export default Home;
