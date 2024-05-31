"use client"

import TodoForm from "@/components/forms/add-todo-form";
import AddTodoForm from "@/components/forms/add-todo-form";
import TodoItem from "@/components/todo-Item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Itodo } from "@/models/todo-interface";
import { todosSlice } from "@/store/slice/todo-slice";
import { useCallback, useState } from "react";
import "./page.scss"

const TodoPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<{ show: boolean, todo: Itodo | undefined }>({
    show: false,
    todo: undefined
  });
  const [searchTerm, setSearchTerm] = useState('');


  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.data);
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleAdd(data: Itodo): void {
    setIsOpen(false);
    dispatch(todosSlice.actions.addTodo(data));
  }

  function handleUpdate(data: Itodo): void {
    setIsEdit({
      show: false,
      todo: undefined
    });
    dispatch(todosSlice.actions.editTodo(data));
  }

  const toggle = useCallback((todo:Itodo) => {
    dispatch(todosSlice.actions.editTodo({
      ...todo,
      status: !todo.status
    }));
  }, [dispatch]);

  const deleteTodo = useCallback((todo:Itodo) => {
    dispatch(todosSlice.actions.deleteTodo(todo.no));
  }, [dispatch]);

  const onEdit = useCallback((todo:Itodo) => {
    setIsEdit({
      show: true,
      todo: todo,
    });
  }, []);

  function openAddDialog(): void {
    setIsOpen(true);
  }

  return <div className="page-view">

    <div>
      <h1 className="header">Todo List</h1>
    </div>
    <div className="todo-view">

      <div className="container">
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openAddDialog}>
            Add Todo
          </button>

          <div>
            <input
            className="serch-input"
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>


      <dialog open={isOpen}>
        <TodoForm onSubmitCallback={handleAdd} edit={false}></TodoForm>
      </dialog>

      <dialog open={isEdit.show}>
        <TodoForm onSubmitCallback={handleUpdate} edit={true} todo={isEdit.todo}></TodoForm>
      </dialog>

      <div className="list-view">
        {filteredTodos.map((todo: Itodo) => <TodoItem key={todo.no} todo={todo} onDelete={deleteTodo} onEdit={onEdit}  onToggle={toggle} ></TodoItem>)}

      </div>
    </div>

  </div>

}



export default TodoPage;