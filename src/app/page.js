"use client"
import React from "react";
import { useGenders } from '../context/GendersContext'
import { GenderCard } from "../components/GenderCard";

function Page() {
  const { genders } = useGenders();
  return (
    <div className="d-flex flex-column align-items-center mt-3 ">
      {genders.map((gender) => (
        <GenderCard gender = {gender} key={gender.id}></GenderCard>
      ))}
    </div>
  )
}

export default Page