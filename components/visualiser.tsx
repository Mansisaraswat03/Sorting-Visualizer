"use client";

import React, { useEffect, useState } from "react";
import { sortingAlgorithms } from "@/utils/sortingAlgorithms"; 

interface VisualiserProps {
  array: number[];
  algorithm: keyof typeof sortingAlgorithms;
}


const Visualiser: React.FC<VisualiserProps> = ({ array, algorithm }) => {
  const [sortedArray, setSortedArray] = useState<number[]>(array);

  useEffect(() => {
    setSortedArray(array);
    setTimeout(() => {
      sortArray();
      
    }, 2000);
    const sortArray = async () => {
      const newArr = await sortingAlgorithms[algorithm](
        array,
        (updatedArray) => {
          setSortedArray(updatedArray);
        }
      );
      setSortedArray(newArr);
    };

    
  }, [array]);

  const generateBlueShade = (value: number, max: number) => {
    const hue = 240;
    const saturation = 100;
    const lightness = 100 - Math.floor((value / max) * 70);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const maxValue = Math.max(...sortedArray);
  let size = 500 / maxValue;
  if (size < 1) {
    size = 1;
  } else if (size > 5) {
    size = 5;
  }

  return (
    <div className="flex flex-wrap">
      {sortedArray.map((value, index) => (
        <div
          key={index}
          className="flex "
          style={{
            width: size + "rem",
            height: size + "rem",
            backgroundColor: generateBlueShade(value, maxValue),
            margin: "0rem",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Visualiser;
