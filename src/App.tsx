import React from "react";
import TodoList from "./components/TodoList";
import "./styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		// La app es responsive
		<Provider store={store}>
			<div className='flex w-full flex-col items-start justify-center'>
				<TodoList />
			</div>
			<ToastContainer />
		</Provider>
	);
};

export default App;
