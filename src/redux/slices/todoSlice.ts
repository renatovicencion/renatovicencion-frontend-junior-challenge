import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "@/interfaces/todo";
import axios from "axios";
import { RootState } from "../store";
import { toast } from "react-toastify";

interface States {
	todos: Todo[] | [];
	isLoadingTodos: boolean;
	errorTodos: string;
	limitTodos: number;
}

const initialState = {
	todos: [],
	isLoadingTodos: false,
	errorTodos: "",
	limitTodos: 30,
} as States;

export const getTodosApi = createAsyncThunk(
	"todos/getTodosApi",
	async (_, { rejectWithValue }) => {
		try {
			const { data, status } = await axios.get(
				"https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"
			);

			if (status === 200) {
				return data;
			}

			return rejectWithValue(
				"An error occurred while trying to get the to do's :c"
			);
		} catch (error: any) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);

export const addTodoApi = createAsyncThunk(
	"todos/addTodoApi",
	async (todoLabel: string, { getState, rejectWithValue }): Promise<any> => {
		const {
			todos: { todos },
		} = getState() as RootState;

		// Aquí genero la id nueva a partir de las todos existentes, ya que el backend no la genera
		const newTodo = {
			id: todos.length,
			label: todoLabel,
			checked: false,
		};

		try {
			const { data, status } = await axios({
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
				url: `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos`,
				data: newTodo,
			});

			if (status === 201) {
				// Acá se cambia el valor del campo checked y id, ya que el backend los devuelve como string en lugar de boolean y number,
				// causando problemas con la visualización debido a la inconsistencia de datos
				let dataFormat = Object.assign({}, data);

				dataFormat.id = parseInt(dataFormat.id);

				if (dataFormat.checked === "false") dataFormat.checked = false;
				else dataFormat.checked = true;

				return dataFormat;
			}

			return rejectWithValue(
				"An error occurred while trying to add the new to do :c"
			);
		} catch (error: any) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);

export const updateTodoApi = createAsyncThunk(
	"todos/updateTodoApi",
	async (
		todo: { id: number; checked: boolean },
		{ rejectWithValue }
	): Promise<any> => {
		try {
			const { data, status } = await axios({
				method: "PATCH",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
				url: `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todo.id}`,
				data: {
					checked: !todo.checked,
				},
			});

			if (status === 200) {
				return data;
			}

			return rejectWithValue(
				"An error occurred while trying to update the to do :c"
			);
		} catch (error: any) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTodoApi = createAsyncThunk(
	"todos/deleteTodoApi",
	async (todoId: number, { rejectWithValue }): Promise<any> => {
		try {
			const { data, status } = await axios({
				method: "DELETE",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
				url: `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`,
			});

			if (status === 200) {
				// Aquí la api devuelve un objeto vacío, por lo que el payload sería vacío y debería ser el objeto eliminado, o al menos su id
				// por lo que retorno la data del backend, y además retorno el id
				return { data, id: todoId };
			}

			return rejectWithValue(
				"An error occurred while trying to delete the to do :c"
			);
		} catch (error: any) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// getTodosApi Cases
		builder.addCase(getTodosApi.fulfilled, (state, { payload }: any) => {
			state.todos = payload;
			state.isLoadingTodos = false;
			state.errorTodos = "";
		});

		builder.addCase(getTodosApi.pending, (state) => {
			state.isLoadingTodos = true;
		});

		builder.addCase(getTodosApi.rejected, (state, { payload }: any) => {
			state.errorTodos = payload;

			toast.error(payload, {
				position: toast.POSITION.TOP_RIGHT,
				theme: "dark",
				icon: "⚠",
			});

			state.isLoadingTodos = false;
		});

		// addTodoApi Cases
		builder.addCase(addTodoApi.fulfilled, (state, { payload }) => {
			state.todos = [...state.todos, payload];
			state.isLoadingTodos = false;
		});

		builder.addCase(addTodoApi.pending, (state) => {
			state.isLoadingTodos = true;
		});

		builder.addCase(addTodoApi.rejected, (state, { payload }: any) => {
			toast.error(payload, {
				position: toast.POSITION.TOP_RIGHT,
				theme: "dark",
				icon: "⚠",
			});

			state.isLoadingTodos = false;
		});

		// updateTodoApi Cases
		builder.addCase(updateTodoApi.fulfilled, (state, { payload }) => {
			const updatedTodos = state.todos.map((todo) => {
				if (todo.id === payload.id) {
					// Aquí si es que el campo checked del payload viniera con el campo tipo boolean y no tipo string desde el backend,
					// se debería solo pasar el payload a todo (todo = payload)
					todo.checked = !todo.checked;
				}

				return todo;
			});
			state.todos = updatedTodos;
			state.isLoadingTodos = false;
		});

		builder.addCase(updateTodoApi.pending, (state) => {
			state.isLoadingTodos = true;
		});

		builder.addCase(updateTodoApi.rejected, (state, { payload }: any) => {
			toast.error(payload, {
				position: toast.POSITION.TOP_RIGHT,
				theme: "dark",
				icon: "⚠",
			});
			state.isLoadingTodos = false;
		});

		// deleteTodoApi Cases
		builder.addCase(deleteTodoApi.fulfilled, (state, { payload }) => {
			state.todos = state.todos.filter((todo) => todo.id !== payload.id);
			state.isLoadingTodos = false;
		});

		builder.addCase(deleteTodoApi.pending, (state) => {
			state.isLoadingTodos = true;
		});

		builder.addCase(deleteTodoApi.rejected, (state, { payload }: any) => {
			toast.error(payload, {
				position: toast.POSITION.TOP_RIGHT,
				theme: "dark",
				icon: "⚠",
			});
			state.isLoadingTodos = false;
		});
	},
});

const todosReducer = todoSlice.reducer;

export default todosReducer;
