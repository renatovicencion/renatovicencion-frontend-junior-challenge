import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";
import { addTodoApi } from "../../redux/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import InputErrorSpan from "../Errors/InputErrorSpan";

const TodoForm = () => {
	const { limitTodos, todos } = useSelector(
		(state: RootState) => state.todos
	);

	const dispatch = useDispatch<AppDispatch>();

	// Añadí un límite de 30 tareas para agregar
	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (limitTodos > todos.length) formik.handleSubmit();
		else {
			formik.errors.label =
				"To do limit has been reached!, take it easy!";
			formik.handleReset(formik.initialValues);
		}
	};

	const formik = useFormik({
		initialValues: {
			label: "",
		},
		validationSchema: Yup.object({
			label: Yup.string().required("The to do field is required."),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (formValues) => {
			const { label } = formValues;

			formik.handleReset(formik.initialValues);
			dispatch(addTodoApi(label));
		},
	});

	return (
		<form
			className='mt-5 flex flex-col gap-5 md:mt-0 md:flex-row'
			onSubmit={handleSubmit}
		>
			<div className='flex flex-col justify-center'>
				<Input
					type='text'
					name='label'
					value={formik.values.label}
					onChange={formik.handleChange}
					placeholder='Enter new to do'
					error={formik.errors.label ? true : false}
				/>
				{formik.errors.label && (
					<InputErrorSpan formikError={formik.errors.label} />
				)}
			</div>
			<div className='h-12 md:w-32'>
				<Button
					type='submit'
					text='ADD TO DO'
					bgColor='bg-blue-500'
					bgColorHover='bg-blue-600'
				/>
			</div>
		</form>
	);
};

export default TodoForm;
