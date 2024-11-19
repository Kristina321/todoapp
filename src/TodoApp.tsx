import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';
import { TodoControlPanel } from './TodoControlPanel';
import { useList } from './useList';
import React from 'react';
import './styles/TodoApp.css';

export const TodoApp: React.FunctionComponent = () => {
  const {
    list,
    filteredItems,
    createItem,
    toggleItem,
    onFilterChange,
    deleteComplitedItem,
  } = useList();



  return (
    <div className="todo-app">

      <h1 className='todo-app__title'>todos</h1>

      <NewTodo
        createItem={createItem}
      />

      <TodoList
        list={filteredItems}
        onItemToggle={toggleItem}
      />

      <TodoControlPanel
        list={list}
        deleteComplitedItem={deleteComplitedItem}
        onFilterChange={onFilterChange}
      />


      <div className='decor-page decor-page--1'></div>
      <div className='decor-page decor-page--2'></div>

    </div>

  );
};
