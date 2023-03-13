import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./slices/todoSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			todos: todosReducer,
		},
	});
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
