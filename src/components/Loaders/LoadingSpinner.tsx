import React from "react";

const LoadingSpinner = () => {
	return (
		<div className='flex w-full items-center justify-center'>
			<div
				className='m-8 inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-black'
				role='status'
				aria-label='loading'
			>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
};

export default LoadingSpinner;
