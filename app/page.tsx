"use client";
import React, { useState } from "react";
import Visualiser from "../components/visualiser";
import { sortingAlgorithms } from "../utils/sortingAlgorithms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [algorithm, setAlgorithm] =
    useState<keyof typeof sortingAlgorithms>("bubbleSort");
  const [condition, setCondition] = useState("Random");
  const [n, setN] = useState(50);
  const [array, setArray] = useState<number[]>([]);

  const generateScrambledArray = (size: number, condition: string) => {
    if (size < 3 || size > 5000) {
      throw new Error("Invalid array size");
    }
    const newArray = Array.from({ length: size }, (_, i) => i + 1);

    if (condition === "Random") {
      return newArray.sort(() => Math.random() - 0.5);
    }
    return newArray.reverse();
  };

  const handleStart = () => {
    setShowWarning(false);
    setArray(generateScrambledArray(n, condition));
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-4 font-bold mt-6 lg:mt-20">
        Sorting Algorithm Visualiser
      </h1>

      <div className="flex justify-center my-4 flex-col lg:flex-row">
        <label className="m-4">Algorithm</label>
        <select
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md bg-white text-black"
          value={algorithm}
          onChange={(e) =>
            setAlgorithm(e.target.value as keyof typeof sortingAlgorithms)
          }
        >
          {Object.keys(sortingAlgorithms).map((alg) => (
            <option key={alg} value={alg}>
              {alg}
            </option>
          ))}
        </select>

        <label className="m-4">Condition</label>

        <select
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md bg-white text-black"
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="Random">Random</option>
          <option value="Reverse">Reverse</option>
        </select>

        <label className="m-4">{"Array size (3-5000)"}</label>
        <input
          className="border border-gray-300 p-4 py-2 mx-4 rounded-md text-black"
          type="number"
          min="3"
          max="5000"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-center my-4 w-full">
        <button
          className="bg-green-500 hover:bg-green-400 text-white rounded-md px-4 py-2 mx-2 w-1/2 lg:w-1/3"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-400 text-white rounded-md px-4 py-2 mx-2 w-1/2 lg:w-1/3"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {showWarning && (
        <div className="text-black border border-black rounded-lg bg-white p-4 mx-6 my-6 lg:my-20 lg:mx-20">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-4xl text-yellow-500 mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">{"Warning"}</h2>
          <p className="mb-6">
            {
              "This visualiser contains rapid animations that may be harmful to individuals with photosensitive epilepsy or other conditions that can be triggered by flashing lights. Viewer discretion is advised"
            }
          </p>
        </div>
      )}
      <Visualiser array={array} algorithm={algorithm} />
    </div>
  );
};

export default Home;
