import './styles/NewTodo.css'
import { useRef } from 'react';

export interface ComponentNewTodoProps {
  createItem: (title: string) => void;
}

export const NewTodo: React.FunctionComponent<ComponentNewTodoProps> = ({ createItem }) => {
  const refInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (refInput.current!.value.trim()) {

      createItem(refInput.current!.value);

      refInput.current!.value = '';
    }
  }

  return (
    <form
        className='todo-app__form'
        id='todo-form'
        aria-label='to create a new task'
        onSubmit={handleSubmit}
      >
    <label
      className='todo-creation'
    >
      <button
        className='todo-creation__btn'
        form='todo-form'
        type='submit'
        aria-label="Add new todo"
        onClick={handleSubmit}
      />
      <input
        className='todo-creation__input'
        id='newTodo'
        form='todo-form'
        type='text'
        placeholder='What needs to be done?'
        ref={refInput}
      />
    </label>
    </form>
  )
}
