import { Itodo } from "@/models/todo-interface";
import { createSlice } from "@reduxjs/toolkit";


interface IState {
    data: Itodo[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    data: [{
        no:"id271",
        status:true,
        title:"Buy Groceries"
    }],
    isLoading: false,
    error: null
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.data.push(action.payload);
        },
        editTodo: (state, action) => {
            const { no, rest } = action.payload;
            const todoIndex = state.data.findIndex((todo) => todo.no === no);
            state.data[todoIndex] = action.payload;
        },

        deleteTodo: (state, action) => {
            const filteredData = state.data.filter((todo) => todo.no !== action.payload);
            state.data = filteredData;
        },
    },

});