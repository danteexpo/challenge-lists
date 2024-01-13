const List = ({
	numbers,
	handleToggle,
}: {
	numbers: number[];
	handleToggle: (n: number) => void;
}) => {
	return (
		<div className="flex flex-col items-center justify-center border border-black w-32 h-60">
			{numbers.map((n) => (
				<label htmlFor={`number-${n}`} key={n} className="flex gap-2">
					<input
						type="checkbox"
						id={`number-${n}`}
						onChange={() => handleToggle(n)}
					/>
					<span>{n}</span>
				</label>
			))}
		</div>
	);
};

export default List;
