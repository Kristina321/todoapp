import './styles/TodoControlPanel.css';
import { TodoFilter } from './TodoFilter';

export interface ComponentControlPanelProps {
  list: {
    id: number;
    title: string;
    done: boolean;
  }[];
  deleteComplitedItem: () => void;
  onFilterChange: (newFilter: 'All' | 'Active' | 'Completed') => void;
}

type FilterElement = {
  value: string;
  id: string;
  checked: boolean;
}

export const TodoControlPanel: React.FunctionComponent<ComponentControlPanelProps> = ({
  list,
  deleteComplitedItem,
  onFilterChange,
}) => {
  const inputFilterArr: FilterElement[] = [
    { value: 'All', id: 'checkAll', checked: true },
    { value: 'Active', id: 'checkActive', checked: false },
    { value: 'Completed', id: 'checkCompleted', checked: false },
  ];

  const count: number = list.filter(item => !item.done).length;

  const handleClearBotton = () => {
    const itemToDel: number = list.filter(item => item.done).length;
    if (itemToDel > 0) {
      deleteComplitedItem();
    }
  }

  return (
    <div
    className='control-panel'
    data-testid='control-panel'
    >

      <span className='control-panel__text'>{count} items left</span>

      <div className='control-panel__radio-wrapper'>
        {inputFilterArr.map(({ id, value, checked }) => {
          return (
            <TodoFilter
              key={id}
              id={id}
              checked={checked}
              value={value}
              onFilterChange={onFilterChange}
            />
          );
        })}
      </div>

      <button
        className='control-panel__btn control-panel__text'
        type='button'
        onClick={handleClearBotton}
      >Clear completed
      </button>
    </div>
  );
};
