import React from "react";

import { MdDeleteOutline } from "react-icons/md";

interface Props {
	id: number;
	onCheck: (todoId: number, isChecked: boolean) => void;
	checked: boolean;
	onDelete: (todoId: number) => void;
	label: string;
}

const TodoListItem = ({ id, onCheck, checked, onDelete, label }: Props) => (
	<div className='flex w-[300px] cursor-pointer items-center justify-between hover:bg-gray-200 md:w-[400px]'>
		<div
			tabIndex={0}
			role='checkbox'
			aria-checked
			className='flex flex-nowrap items-center gap-2 rounded-md p-2.5 pt-1'
		>
			<input
				tabIndex={-1}
				type='checkbox'
				checked={checked}
				onChange={() => onCheck(id, checked)}
			/>
			<span className={checked ? "line-through" : ""}>{label}</span>
		</div>
		<button type='button' onClick={() => onDelete(id)}>
			<MdDeleteOutline className='text-xl text-red-500 hover:text-red-600' />
		</button>
	</div>
);

export default TodoListItem;
