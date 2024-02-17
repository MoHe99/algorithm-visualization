# Algorithm Visualizer

This project is an interactive visualizer for various sorting algorithms, designed to visually demonstrate how InsertionSort, BubbleSort, and MergeSort work and to compare their efficiency. It provides a clear visualization of these algorithms in action, with the aim of fostering a deeper understanding of the algorithms and their differences.

## Supported Sorting Algorithms

- **InsertionSort**: A simple sorting algorithm that takes elements in sequence and inserts them at the correct position into a sorted sub-list.
- **BubbleSort**: A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- **MergeSort**: An efficient, comparison-based, divide-and-conquer sorting algorithm that divides a list into two halves, sorts each half, and then merges the sorted halves back together.

## Prerequisites
Before you begin, ensure you have 
- pnpm
- Nodejs >=20

installed on your system. These tools are necessary for installing dependencies and running the visualizer locally.

## Getting Started

Follow these steps to set up and launch the Algorithm Visualizer on your local system:

1. **Clone the Repository**

   Clone the repository to your local machine using the following command:

    `git@github.com:MoHe99/algorithm-visualization.git`
    
2. **Install Dependencies**

    Navigate to the cloned repository directory and run `pnpm install` to install all required dependencies:

    `cd algorithm-visualizer && pnpm install`


3. **Start the Development Server**

    Launch the development server using `pnpm dev`. This command starts a local vite server and watches for file changes to instantly reflect any modifications via hmr.

    After the server has started, you can visit `http://localhost:3000` and begin experimenting with the visualization of the sorting algorithms.

> [!Important]
> This project serves as a personal training and small showcase project. It is intended for my own educational purposes and to demonstrate my skills and interests in software development and algorithms. It's not aimed at wide distribution or commercial use. Contributions, feedback, and suggestions are welcome but please note that this is an older personal development project.


