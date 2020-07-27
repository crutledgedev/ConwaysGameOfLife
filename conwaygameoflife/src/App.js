import React, { useState } from "react";
import produce from "immer";
// import "./App.css";

function App() {
  const numRows = 50;
  const numCols = 50;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  // console.log(grid);

  return (
    <>
      <button> Start </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "green" : undefined,
                border: "solid 1px grey",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

//   return(
//   <div>
//     {grid.map((rows, i) =>
//       rows.map((col, k) => (
//         <div
//           key={`${i}-{k}`}
//           style={{
//             width: 20,
//             height: 20,
//             backgroundColor: grid[i][k] ? "black" : undefined,
//             border: "solid 1px black",
//           }}
//         />
//       ))
//     )}
//   </div>
// )

export default App;
