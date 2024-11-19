import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { TodoFilter, ComponentFilterProps } from '../TodoFilter';

let mockOnFilterChange: ReturnType<typeof vi.fn>;
let labelFilter: HTMLLabelElement;
let inputFilter: HTMLInputElement;
let valueFilter: HTMLElement;

const renderTodoFilter = (props: Partial<React.ComponentProps<typeof TodoFilter>> = {}): RenderResult => {
  const defaultProps: ComponentFilterProps = {
    id: 'checkAll',
    checked: false,
    value: 'All',
    onFilterChange: mockOnFilterChange,
  };

  return render(<TodoFilter {...defaultProps} {...props} />);
};

describe('TodoFilter Component', () => {
  beforeEach(() => {
    mockOnFilterChange = vi.fn();

    const {
      getByLabelText,
      getByRole,
      getByText,
    } = renderTodoFilter();

    labelFilter = getByLabelText('checkAll') as HTMLLabelElement;
    inputFilter = getByRole('radio', { name: 'checkAll' }) as HTMLInputElement;
    valueFilter = getByText('All') as HTMLElement;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders TodoFilter component', () => {
    expect(labelFilter).toBeInTheDocument();
    expect(inputFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
  });

  it('calls onFilterChange after click', () => {
    fireEvent.click(labelFilter);

    expect(mockOnFilterChange).toHaveBeenCalledWith('All');
  });
});
