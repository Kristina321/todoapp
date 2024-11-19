import './styles/TodoControlPanel.css';
import { useRef, useCallback } from "react";

export interface ComponentFilterProps {
  id: string;
  checked: boolean;
  value: string;
  onFilterChange: (newFilter: 'All' | 'Active' | 'Completed') => void;
}

export const TodoFilter:React.FunctionComponent<ComponentFilterProps> = ({
  id,
  checked,
  value,
  onFilterChange
}) => {
  const refFilter = useRef<HTMLLabelElement | null>(null);
  const refRadio = useRef<HTMLInputElement | null>(null);

  const handleFilter = useCallback(() => {
    switch (refRadio.current?.id) {
      case 'checkActive':
        onFilterChange('Active');
        break;
      case 'checkCompleted':
        onFilterChange('Completed');
        break;
      default:
        onFilterChange('All');
        break;
    }
  }, [refRadio, onFilterChange]);

  return (
    <label
      className='control-panel__label'
      ref={refFilter}
      onClick={handleFilter}
      aria-label={id}
    >
      <input className='control-panel__radio'
        type='radio'
        name='select'
        id={id}
        defaultChecked={checked}
        ref={refRadio}
      />
      <span
        className='control-panel__text'
      >
        {value}
      </span>
    </label>
  );
};
