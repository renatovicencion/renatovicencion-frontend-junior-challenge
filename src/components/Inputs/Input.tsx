import React, { ChangeEvent } from "react";

interface Props {
	type: string;
	name: string;
	value: string;
	error: boolean;
	onChange: {
		(e: ChangeEvent<any>): void;
		<T_1 = string | ChangeEvent<any>>(
			field: T_1
		): T_1 extends ChangeEvent<any>
			? void
			: (e: string | ChangeEvent<any>) => void;
	};
	placeholder: string;
}

const Input = ({ type, name, value, error, placeholder, onChange }: Props) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`rounded-md border border-gray-500 px-3 py-2 ${
				error
					? "border-2 border-red-500 outline-none"
					: "focus:outline-black"
			}`}
		/>
	);
};

export default Input;
