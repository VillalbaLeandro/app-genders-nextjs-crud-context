"use client"
import React from "react";
import { useGenders } from '../context/GendersContext'
import { GenderCard } from "../components/GenderCard";

function Page() {
  const { genders } = useGenders();
  return (
    <div>
      {genders.map((gender) => (
        <GenderCard gender = {gender} key={gender.id}></GenderCard>
      ))}
    </div>
  )
}

export default Page