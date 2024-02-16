import { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { Information } from '@interfaces/Information';

const speed = 10;
const range = 50;

const bubbleSortInformation: Information = {
	name: 'Bubble Sort',
	description: (
		<div>
			Conceptually, a merge sort works as follows:{' '}
			<ol>
				<li>
					Divide the unsorted list into n sublists, each containing one element
					(a list of one element is considered sorted).
				</li>
				<li>
					Repeatedly merge sublists to produce new sorted sublists until there
					is only one sublist remaining. This will be the sorted list.
				</li>
			</ol>
		</div>
	),
	runtime: 'O(n/log n)',
	space_complexety: 'O(n)',
};

const insertionSortInformation: Information = {
	name: 'Insertion Sort',
	description: (
		<div>
			Conceptually, a merge sort works as follows:{' '}
			<ol>
				<li>
					Divide the unsorted list into n sublists, each containing one element
					(a list of one element is considered sorted).
				</li>
				<li>
					Repeatedly merge sublists to produce new sorted sublists until there
					is only one sublist remaining. This will be the sorted list.
				</li>
			</ol>
		</div>
	),
	runtime: 'O(n/log n)',
	space_complexety: 'O(n)',
};

const mergeSortInformation: Information = {
	name: 'Merge Sort',
	description: (
		<div>
			Conceptually, a merge sort works as follows:{' '}
			<ol>
				<li>
					Divide the unsorted list into n sublists, each containing one element
					(a list of one element is considered sorted).
				</li>
				<li>
					Repeatedly merge sublists to produce new sorted sublists until there
					is only one sublist remaining. This will be the sorted list.
				</li>
			</ol>
		</div>
	),
	runtime: 'O(n/log n)',
	space_complexety: 'O(n)',
};

/**
 * This Component is meant to visualize sorting algorithms
 * like bubble sort or merge sort
 */

const SortingVisualizer = (): ReactElement => {
	const [sortingArray, setSortingArray] = useState<number[]>([]);
	const [algorithm, setAlgorithm] = useState('bubbleSort');
	const [information, setInformation] = useState<Information>(
		bubbleSortInformation,
	);
	const [buttonDisable, setButtonDisable] = useState(false);

	useEffect(() => {
		resetArray();
	}, []);

	const randomVals = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	function resetArray(): void {
		for (let i = 0; i < sortingArray.length; i++) {
			let selector = i.toString();

			let bar = document.getElementById(selector);
			if (bar !== null) {
				bar.classList.remove('sorted');
			}
		}

		let array: number[] = [];
		for (let i = 0; i < range; i++) {
			array.push(randomVals(5, 500));
		}
		setSortingArray(array);
	}

	const wait = (time: number) => {
		return new Promise(resolve => setTimeout(resolve, time));
	};

	const finishedAnimation = async () => {
		for (let i = 0; i < sortingArray.length; i++) {
			let selector = i.toString();
			let bar = document.getElementById(selector);

			if (bar) {
				bar.classList.add('sorted');
			}
			await wait(speed / 2);
		}
		setButtonDisable(false);
	};

	/**
	 *
	 * ALGORITHMS
	 *
	 * */
	const bubbleSort = async (): Promise<void> => {
		setButtonDisable(true);
		let currentArray: number[] = sortingArray;
		let sorted: boolean = false;

		while (!sorted) {
			sorted = true;

			for (let i = 0; i < currentArray.length - 1; i++) {
				for (let j = 0; j < currentArray.length - i - 1; j++) {
					if (currentArray[j] > currentArray[j + 1]) {
						let dum = currentArray[j];
						currentArray[j] = currentArray[j + 1];
						currentArray[j + 1] = dum;

						setSortingArray([...currentArray]);

						// Make a different color for the current compared bars
						await colorize(j, j + 1);

						sorted = false;
					}
				}
			}

			if (sorted) finishedAnimation();
		}
	};

	const insertionSort = async (): Promise<void> => {
		setButtonDisable(true);
		let currentArray: number[] = sortingArray;

		// Iterate over all objects (first is already sorted)
		for (let i: number = 1; i < currentArray.length; i++) {
			const sortValue: number = currentArray[i];
			let j = i;

			// Push values to the right, until sorting value is no longer smaller
			while (j > 0 && currentArray[j - 1] > sortValue) {
				currentArray[j] = currentArray[j - 1];
				j--;

				// Update sorting array
				setSortingArray([...currentArray]);

				// Make a different color for the current compared bars
				await colorize(j, j - 1);
			}
			// Insert sorting value
			currentArray[j] = sortValue;
		}
		finishedAnimation();
	};

	const mergeSort = async () => {
		setButtonDisable(true);
		await sort(sortingArray, 0, sortingArray.length - 1);
		finishedAnimation();
	};

	const sort = async (arr: number[], low: number, high: number) => {
		if (low < high) {
			let mid = Math.floor((low + high) / 2);

			//"Split" left side
			await sort(arr, low, mid);

			//"Split" right side
			await sort(arr, mid + 1, high);
			await merge(arr, low, mid, high);
		}
	};

	const merge = async (
		array: number[],
		low: number,
		mid: number,
		high: number,
	): Promise<void> => {
		let i = low;
		let j = mid + 1;
		let k = 0;
		let mergedList = [];

		while (i <= mid && j <= high) {
			//Take left side
			if (array[i] <= array[j]) {
				mergedList[k] = array[i];
				i++;
				k++;
			}

			//Take right side
			else {
				mergedList[k] = array[j];
				j++;
				k++;
			}
			setSortingArray([...sortingArray, ...mergedList]);
			await colorize(i, j);
		}

		// Add rest of left side
		while (i <= mid) {
			mergedList[k] = array[i];
			setSortingArray([...sortingArray, ...mergedList]);
			await colorize(i, j);
			i++;
			k++;
		}

		// Add rest of right side
		while (j <= high) {
			mergedList[k] = array[j];
			setSortingArray([...sortingArray, ...mergedList]);
			await colorize(i, j);
			j++;
			k++;
		}

		for (let i = low; i <= high; i++) {
			array[i] = mergedList[i - low];
			setSortingArray([...array]);
		}
	};

	const colorize = async (i: number, j: number) => {
		let selector1 = i.toString();
		let selector2 = j.toString();

		let bar1 = document.getElementById(selector1);
		let bar2 = document.getElementById(selector2);

		if (bar1 && bar2) {
			bar1.classList.add('blue');
			bar2.classList.add('red');

			await wait(speed);

			bar1.classList.remove('blue');
			bar2.classList.remove('red');
		}
	};

	const handleSorting = () => {
		switch (algorithm) {
			case 'bubbleSort':
				bubbleSort();
				break;

			case 'mergeSort':
				mergeSort();
				break;

			case 'insertionSort':
				insertionSort();
				break;

			default:
				break;
		}
	};

	const handleInformation = (algorithm: String) => {
		switch (algorithm) {
			case 'bubbleSort':
				setInformation(bubbleSortInformation);
				break;

			case 'insertionSort':
				setInformation(insertionSortInformation);
				break;

			case 'mergeSort':
				setInformation(mergeSortInformation);
				break;

			default:
				break;
		}
	};
	function refreshPage() {
		window.location.reload();
	}
	return (
		<div className="field">
			<div className="header">
				<div className="headlines">
					<h1>Algorithm Visualizer</h1>
					<h2>Sorting Algorithms</h2>
				</div>
				<div className="menu">
					<select
						disabled={buttonDisable}
						onChange={e => {
							resetArray();
							setAlgorithm(e.target.value);
							handleInformation(e.target.value);
						}}>
						<option value="bubbleSort">Bubble Sort</option>
						<option value="insertionSort">Insertion Sort</option>
						<option value="mergeSort">Merge Sort</option>
					</select>

					<button
						className="button-sort"
						disabled={buttonDisable}
						onClick={handleSorting}>
						Sort
					</button>
					<button
						className="button-reset"
						disabled={buttonDisable}
						onClick={resetArray}>
						Shuffle
					</button>
					<button
						className="button-exit"
						disabled={!buttonDisable}
						onClick={refreshPage}>
						Terminate
					</button>
				</div>
			</div>
			<div className="main-content">
				<div className="sort-bars">
					{sortingArray.slice(0, range).map((value, index) => (
						<div
							className="bar"
							id={index.toString()}
							key={index}
							style={{ height: `${value}px` }}></div>
					))}
				</div>

				<div className="algorithm-information">
					<h2 className="algorithm-name">{information?.name}</h2>
					<div className="algorithm-description">
						{information?.description}
					</div>
					<div className="stats">
						<div className="row">
							<div className="cell description">Worst-case runtime</div>
							<div className="cell">{information?.runtime}</div>
						</div>
						<div className="row">
							<div className="cell description">
								Worst-case space-complexety
							</div>
							<div className="cell">{information?.space_complexety}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SortingVisualizer;
