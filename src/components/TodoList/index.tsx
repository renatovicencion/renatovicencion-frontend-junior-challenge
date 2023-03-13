import {
	deleteTodoApi,
	getTodosApi,
	updateTodoApi,
} from "./../../redux/slices/todoSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import TodoListItem from "../TodoListItem";
import Error from "../Errors/Error";
import TodoResults from "../TodoResults";
import TodoForm from "../TodoForm";

const TodoList = () => {
	const { todos, isLoadingTodos, errorTodos } = useSelector(
		(state: RootState) => state.todos
	);

	const dispatch = useDispatch<AppDispatch>();
	const todoListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(getTodosApi());
	}, [dispatch]);

	const handleDelete = (todoId: number) => {
		// Fix an ability to delete task

		dispatch(deleteTodoApi(todoId));
	};

	const toggleCheck = (todoId: number, isChecked: boolean) => {
		// Fix an ability to toggle task
		const todo = {
			id: todoId,
			checked: isChecked,
		};

		dispatch(updateTodoApi(todo));
	};

	return (
		<div className='mt-10 w-full px-20 md:mt-20'>
			<div className='flex items-center'>
				<span className='mb-2.5 flex w-full justify-center px-1.5 text-xl font-medium uppercase md:justify-start md:text-2xl'>
					Things to do:
				</span>

				<div className='hidden md:flex'>
					<TodoForm />
				</div>
			</div>

			<div className='mb-5 h-[1px] w-full bg-gray-500 md:mt-5'></div>
			{!errorTodos && (
				<div className='flex justify-center'>
					<TodoResults />
				</div>
			)}
			<div
				ref={todoListRef}
				className={`flex columns-3 flex-col items-center md:h-[500px] md:flex-wrap ${
					errorTodos && "justify-center"
				}`}
			>
				{/* Fix an ability to render todos */}
				{errorTodos ? (
					<div className='w-1/3'>
						<Error message={errorTodos} />
					</div>
				) : isLoadingTodos ? (
					<LoadingSpinner />
				) : todos.length > 0 ? (
					todos?.map((todo) => (
						<div key={todo.id}>
							<TodoListItem
								id={todo.id}
								checked={todo.checked}
								label={todo.label}
								onCheck={toggleCheck}
								onDelete={handleDelete}
							/>
						</div>
					))
				) : (
					<div className='px-2.5 text-center text-sm text-gray-500'>
						Looks like you&apos;re absolutely free today!
					</div>
				)}
			</div>

			<div className='md:hidden'>
				<TodoForm />
			</div>
		</div>
	);
};

export default TodoList;
