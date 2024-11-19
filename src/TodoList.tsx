import { TodoItem } from "./TodoItem";
import "./styles/TodoList.css";

export interface ComponentTodoListProps {
  list: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onItemToggle: (id: number) => void;
}

export const TodoList:React.FunctionComponent<ComponentTodoListProps> = ({
  list,
  onItemToggle,
}) => {
  return (
    <ul className="todo-list">
      {list.map(({ id, title, done }) => {
        return (
          <li key={id} className="todo-list__item">
            <TodoItem
              id={id}
              title={title}
              done={done}
              onToggle={onItemToggle}
            />
          </li>
        );
      })}
    </ul>
  );
};
