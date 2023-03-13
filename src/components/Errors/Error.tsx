import React from "react";

import { MdErrorOutline } from "react-icons/md";

interface Props {
	message: string;
}

const Error = ({ message }: Props) => {
	return (
		<div className='flex h-full w-full items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-2 text-white'>
			<MdErrorOutline />
			{message}
		</div>
	);
};

export default Error;
