import React from "react";

interface Props {
	formikError: string;
}

const InputErrorSpan = ({ formikError }: Props) => {
	return (
		<span className='text-start text-xs font-light text-red-500'>
			{formikError}
		</span>
	);
};

export default InputErrorSpan;
