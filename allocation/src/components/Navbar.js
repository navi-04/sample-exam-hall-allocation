import React from "react";
import "./Navbar.css";
import searchIcon from "../assets/icons/search.ico";
import profile from "../assets/images/profile_photo.jpg";

export default function Navbar({ page }) { 
  return (
    <header>
      <div className="logo">
        <img src="logo.ico" alt="MKCE Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a onClick={() => page('Home')}>Home</a>
          </li>
          <li>
            <a onClick={() => page('Allocation')}>Allocation</a>
          </li>
          <li>
            <a onClick={() => page('Creation')}>Creation</a>
          </li>
          <li>
            <a onClick={() => page('Declaration')}>Declaration</a>
          </li>
        </ul>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="submit" id="search-button">
          <img src={searchIcon} alt="Search Icon" />
        </button>
      </div>
      <div className="user-profile">
        <img src={profile} alt="User Profile" />
      </div>
    </header>
  );
}
