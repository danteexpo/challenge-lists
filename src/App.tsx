import { useEffect, useState } from "react";
import List from "./components/List";

enum Calculations {
	FromLeftToRight = "fromlefttoright",
	FromRightToLeft = "fromrighttoleft",
}

function App() {
	const [leftNumbers, setLeftNumbers] = useState<number[]>([1, 2, 3, 4]);
	const [rightNumbers, setRightNumbers] = useState<number[]>([]);
	const [checkedItems, setCheckedItems] = useState<number[]>([]);
	const [calculation, setCalculation] = useState<Calculations | undefined>(
		undefined
	);

	useEffect(() => {
		if (checkedItems.length === 0) {
			setCalculation(undefined);
			return;
		}

		if (leftNumbers.includes(checkedItems[0])) {
			setCalculation(Calculations.FromLeftToRight);
		} else {
			setCalculation(Calculations.FromRightToLeft);
		}
	}, [checkedItems, leftNumbers]);

	const handleToggle = (n: number) => {
		if (checkedItems.includes(n)) {
			setCheckedItems((checkedItems) => checkedItems.filter((i) => i !== n));
		} else {
			setCheckedItems((checkedItems) => [...checkedItems, n]);
		}
	};

	const handleClick = (option: "fromlefttoright" | "fromrighttoleft") => {
		if (calculation === Calculations.FromLeftToRight) {
			if (option === "fromrighttoleft") {
				console.log("You can't take numbers from the left to the left");
				return;
			}

			if (
				checkedItems
					.map((n) => rightNumbers.includes(n))
					.some((x) => x === true)
			) {
				console.log("There is a number from the right, so this is invalid.");
				return;
			}
		} else {
			if (option === "fromlefttoright") {
				console.log("You can't take numbers from the right to the right");
				return;
			}

			if (
				checkedItems.map((n) => leftNumbers.includes(n)).some((x) => x === true)
			) {
				console.log("There is a number from the left, so this is invalid.");
				return;
			}
		}

		if (option === "fromlefttoright") {
			setLeftNumbers((leftNumbers) => [
				...leftNumbers.filter((n) => !checkedItems.includes(n)),
			]);
			setRightNumbers((rightNumbers) => [...rightNumbers, ...checkedItems]);
		} else {
			setRightNumbers((rightNumbers) => [
				...rightNumbers.filter((n) => !checkedItems.includes(n)),
			]);
			setLeftNumbers((leftNumbers) => [...leftNumbers, ...checkedItems]);
		}

		setCheckedItems([]);
		setCalculation(undefined);
	};

	return (
		<div className="min-h-screen grid place-items-center grid-cols-3 max-w-xs mx-auto">
			<List numbers={leftNumbers} handleToggle={handleToggle} />
			<div className="flex flex-col gap-4">
				<button
					className="border border-black px-4"
					onClick={() => handleClick("fromlefttoright")}
				>
					{">"}
				</button>
				<button
					className="border border-black px-4"
					onClick={() => handleClick("fromrighttoleft")}
				>
					{"<"}
				</button>
			</div>
			<List numbers={rightNumbers} handleToggle={handleToggle} />
		</div>
	);
}

export default App;
