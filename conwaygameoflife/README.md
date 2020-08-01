# ConwaysGameOfLife

CS Unit 1 Buildweek

### App is deployed at: https://conways-game-of-life-rho.vercel.app/

#### Cellular Automata

A cellular automaton (plural: cellular automata, abbreviated CA) is a program that operates on data typically stored in a 2D grid. (1D, 3D and n-D cellular automata run on lines, cubes, etc.)

A simple set of rules describes how the value in a cell on the grid changes over time, often as the result of the states of that cell's neighbors.

Sometimes neighbors includes the 4 orthogonally adjacent cells; sometimes it includes all 8 surrounding cells including diagonals.

Each round of the simulation examines the current state of the grid, and then produces an entirely new grid consisting of the old state. (Remember the discussion about double buffers earlier--we don't want to modify the same grid we're examining, lest we munge future results.)

This new grid becomes the "current" state of the simulation, and the process repeats. Each new grid is referred to as a generation.

The beautiful thing about cellular automata is that sometimes very complex behavior can emerge from very simple rules.

Practically speaking, CAs have been used in biological and chemical simulations and other areas of research, such as CA-based computer processors, and other numeric techniques.

#### Turing Completeness

We say a computing system is Turing Complete if it is capable of performing arbitrary, general purpose computation.

Using a construct in The Game of Life called a glider gun, it's possible to build a rudimentary NAND gate in the Game of Life. While a NAND gate by itself isn't enough to be Turing Complete, the "infinite" grid of The Game of Life allows you to use them (or any other functionally complete operator) to build any other type of logical "circuitry" and memory, as well.

Anything computable can be computed in The Game of Life given a large enough grid and enough time. Most people, however, find JavaScript to be a far easier development medium.

### immer

produce is the default function we get from Immer. Here, we pass it as a value to the setState() method. The produce function takes a function which accepts draft as an argument. It is inside this function that we can then set the draft copy with which we want to update our state.
