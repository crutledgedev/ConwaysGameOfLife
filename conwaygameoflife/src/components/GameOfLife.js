import React, { useState, useCallback, useRef, useEffect } from "react";
import { operations, numRows, numCols } from "./Initialize";
import produce from "immer";
import "./GameOfLife.css";

///intial grid generation for out application this renders an emptyh grid where all values are 0
//inital values are imported from Initialize.js to remove clutter from this component

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

//lets create our application with a functional component
function GameOfLife() {
  //state management of our app useState values are self descriptive -

  //grid
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  // generation tracker
  const [generation, setGeneration] = useState(0);
  //running tracker
  const [running, setRunning] = useState(false);
  //time interval between generations
  const [time, setTime] = useState(1000);
  //useRef and useCallback hooks utilized to simplify implementation
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //gridCopy fullfilles the double buffering requirement - allowing the next generation to be calculated without disturbing the
    // the state currently being rendered to the screen.
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        //iterates thorugh grid checks to see if the surrounding cells are "dead" or "alive"
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //assigns new values to the surrounding cells based on the state of the cells around them at the time of iteration
              //Only cases which evaluate to greater than or equal to 0 are considered, so all edge of grid cases are the same null/dead infertile ground
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            //if over population or under population exists cells die
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
              //if 3 surrounding cells are alive - new cells are born
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    //setting for time between each generation
    setTimeout(runSimulation, time);
  }, [time]);

  //generation count updates with each iteration - resets to 0 if cleared or restarted with a new pattern
  useEffect(() => {
    generation == 0 && running == false
      ? setGeneration(0)
      : setGeneration(generation + 1);
  }, [grid]);

  return (
    <>
      <h1>Conways Game of Life</h1>
      <div className="rules">
        <h3>Rules:</h3>
        <ol>
          <li>Any live cell with two or three live neighbours survives.</li>
          <li>Any dead cell with three live neighbours becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </ol>
      </div>
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
                backgroundColor: grid[i][k] ? "#FF66FF" : undefined,
                border: "solid 1px 	#330099",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default GameOfLife;
