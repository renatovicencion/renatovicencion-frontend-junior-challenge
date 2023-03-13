import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TodoResults = () => {
	// Fix an ability to calculate completed tasks
	const [totalDoneTodos, setTotalDoneTodos] = useState<number>(0);

	const { todos } = useSelector((state: RootState) => state.todos);

	const calculateDoneTodos = useCallback(() => {
		setTotalDoneTodos(todos.filter((todo) => todo.checked === true).length);
	}, [todos]);

	useEffect(() => {
		calculateDoneTodos();
	}, [calculateDoneTodos]);

	return (
		<div className='mb-5 flex w-24 items-center justify-center gap-2 rounded-full bg-green-500 px-2 py-2 text-sm font-medium uppercase text-white md:text-base'>
			Done: <span>{totalDoneTodos}</span>
		</div>
	);
};

export default TodoResults;
