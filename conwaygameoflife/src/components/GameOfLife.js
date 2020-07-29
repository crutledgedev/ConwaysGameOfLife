import React, { useState, useCallback, useRef, useEffect } from "react";
import { operations, numRows, numCols } from "./Initialize";
import produce from "immer";

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function GameOfLife() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [generation, setGeneration] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(1000);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, time);
  }, [time]);

  useEffect(() => {
    setGeneration(generation + 1);
    // setTimeout(runSimulation, time);
  }, [grid]);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
          setGeneration(0);
        }}
      >
        Random
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
          setGeneration(0);
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setTime(time - 100);
        }}
      >
        Faster
      </button>
      <button
        onClick={() => {
          setTime(time + 100);
        }}
      >
        Slower
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
          }
          rows[5][13] = 1;
          rows[5][14] = 1;
          rows[5][15] = 1;
          rows[5][19] = 1;
          rows[5][20] = 1;
          rows[5][21] = 1;
          rows[7][11] = 1;
          rows[7][16] = 1;
          rows[7][18] = 1;
          rows[7][23] = 1;
          rows[8][11] = 1;
          rows[8][16] = 1;
          rows[8][18] = 1;
          rows[8][23] = 1;
          rows[9][11] = 1;
          rows[9][16] = 1;
          rows[9][18] = 1;
          rows[9][23] = 1;
          rows[10][13] = 1;
          rows[10][14] = 1;
          rows[10][15] = 1;
          rows[10][19] = 1;
          rows[10][20] = 1;
          rows[10][21] = 1;
          //
          rows[12][13] = 1;
          rows[12][14] = 1;
          rows[12][15] = 1;
          rows[12][19] = 1;
          rows[12][20] = 1;
          rows[12][21] = 1;
          rows[13][11] = 1;
          rows[13][16] = 1;
          rows[13][18] = 1;
          rows[13][23] = 1;
          rows[14][11] = 1;
          rows[14][16] = 1;
          rows[14][18] = 1;
          rows[14][23] = 1;
          rows[15][11] = 1;
          rows[15][16] = 1;
          rows[15][18] = 1;
          rows[15][23] = 1;
          rows[17][13] = 1;
          rows[17][14] = 1;
          rows[17][15] = 1;
          rows[17][19] = 1;
          rows[17][20] = 1;
          rows[17][21] = 1;
          setGrid(rows);
          setGeneration(0);
        }}
      >
        Pulsar
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
          }
          rows[6][17] = 1;
          rows[7][17] = 1;
          rows[8][16] = 1;
          rows[8][18] = 1;
          rows[9][17] = 1;
          rows[10][17] = 1;
          rows[11][17] = 1;
          rows[12][17] = 1;
          rows[13][16] = 1;
          rows[13][18] = 1;
          rows[14][17] = 1;
          rows[15][17] = 1;
          setGrid(rows);
          setGeneration(0);
        }}
      >
        Pentadecathlon
      </button>
      <h1>Current Generation: {generation}</h1>
      <h2>Time interval: {time}ms</h2>
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
                border: "solid 1px gray",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default GameOfLife;
