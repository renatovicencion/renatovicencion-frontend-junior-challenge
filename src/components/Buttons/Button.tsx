import React from "react";

type ButtonTypes = "submit" | "reset" | "button";

interface Props {
	type: ButtonTypes;
	text: string;
	bgColor: string;
	bgColorHover: string;
}

const Button = ({ type, text, bgColor, bgColorHover }: Props) => {
	return (
		<button
			type={type}
			className={`h-full w-full ${bgColor} hover:${bgColorHover} rounded-md text-sm font-bold text-white md:text-base`}
		>
			{text}
		</button>
	);
};

export default Button;
