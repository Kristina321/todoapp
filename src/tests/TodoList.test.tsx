import { render, RenderResult, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { TodoList, ComponentTodoListProps } from '../TodoList';
import { testTaskList } from '../constant';

let mockOnItemToggle: ReturnType<typeof vi.fn>;
let listElement: HTMLUListElement;
let itemListElement: HTMLLIElement[];

const renderControlPanel = (props: Partial<React.ComponentProps<typeof TodoList>> = {}): RenderResult => {
  const defaultProps: ComponentTodoListProps = {
    list: testTaskList,
    onItemToggle: mockOnItemToggle,
  };

  return render(<TodoList {...defaultProps} {...props} />);
};

describe('TodoList Component', () => {

  beforeEach(() => {
    mockOnItemToggle = vi.fn();

    const {
      getByRole,
      getAllByRole,
    } = renderControlPanel();

    listElement = getByRole('list') as HTMLUListElement;
    itemListElement = getAllByRole('listitem') as HTMLLIElement[];
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders TodoList component', () => {
    expect(listElement).toBeInTheDocument();
    itemListElement.forEach(el => expect(el).toBeInTheDocument());
  });
});
