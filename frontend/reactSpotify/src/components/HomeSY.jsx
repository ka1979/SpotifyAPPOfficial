import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { user } from "./LandingPage";

export default function HomeSY() {
  return (
    <>
      <NavigationBar />
      <div>
        <h1>Home</h1>
        <p>email: {user}</p>
      </div>
    </>
  );
}
