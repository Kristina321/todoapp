import './styles/TodoItem.css';
import { useRef } from "react";

export interface ComponentTodoItemProps {
  id: number;
  title: string;
  done: boolean;
  onToggle: (id: number) => void;
}

export const TodoItem: React.FunctionComponent<ComponentTodoItemProps> = ({
  id,
  title,
  done,
  onToggle,
}) => {

  const refRadio = useRef<HTMLInputElement | null>(null);

  const handleCheckboxChange = () => {
    onToggle(id);
  };

  const handleMouseOver = () => {
    refRadio.current!.style.outlineColor = '#717171'
  }
  const handleMouseOut = () => {
    refRadio.current!.style.outlineColor = '#dedede'
  }

  return (
    <label
      className="todo"
    >
      <input
        className="todo__done"
        type="checkbox"
        checked={done}
        tabIndex={-1}
        ref={refRadio}
        onChange={handleCheckboxChange}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <span
        className='todo__mark'
        data-testid='mark'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <span className="todo__title">
        {title}
      </span>
    </label>
  );
};
