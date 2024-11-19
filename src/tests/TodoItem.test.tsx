import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { TodoItem, ComponentTodoItemProps } from '../TodoItem';

let mockOnToggle: ReturnType<typeof vi.fn>;
let labelElement: HTMLLabelElement;
let toggleTaskStatus: HTMLInputElement;
let taskMarkElement: HTMLElement;
let taskTitleElement: HTMLElement;

const renderTodoItem = (props: Partial<React.ComponentProps<typeof TodoItem>> = {}): RenderResult => {
  const defaultProps: ComponentTodoItemProps = {
    id: 1,
    title: 'Test Task 1',
    done: false,
    onToggle: mockOnToggle,
  };

  return render(<TodoItem {...defaultProps} {...props} />);
};

const defaultSetUp = (): void => {
  mockOnToggle = vi.fn();

  const { getByText, getByRole, getByTestId } = renderTodoItem();

  toggleTaskStatus = getByRole('checkbox', { name: 'Test Task 1' }) as HTMLInputElement;
  taskMarkElement = getByTestId('mark') as HTMLElement;
  taskTitleElement = getByText('Test Task 1') as HTMLElement;
  labelElement = taskTitleElement.parentElement as HTMLLabelElement;
}

describe('TodoItem Component', () => {
  beforeEach(() => {
    defaultSetUp()
  })

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders TodoItem component', () => {
    expect(labelElement).toBeInTheDocument();
    expect(toggleTaskStatus).toBeInTheDocument();
    expect(taskMarkElement).toBeInTheDocument();
    expect(taskTitleElement).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is changed', () => {
    fireEvent.click(toggleTaskStatus);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });
});
