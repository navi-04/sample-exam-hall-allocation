import React, { useState } from "react";
import Welcome from "../components/Welcome.js";
import Navbar from "../components/Navbar.js";
import Creation from "./Creation.js";
import Allocation from "./Allocation.js";
import Declaration from "./Declaration.js";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");

  const page = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar page={page} />
      {currentPage === "Home" && (
        <div>
          <Welcome />
        </div>
      )}
      {currentPage === "Creation" && <Creation/>}
      {currentPage === "Allocation" && <Allocation/>}
      {currentPage === "Declaration" && <Declaration/>}
    </>
  );
}
