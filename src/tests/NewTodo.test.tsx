import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { ComponentNewTodoProps, NewTodo } from '../NewTodo';

let mockCreateItem: ReturnType<typeof vi.fn>;
let formCreateNewTodo: HTMLFormElement;
let inputNewTodo: HTMLInputElement;
let buttonCreateNewTodo: HTMLButtonElement;

const renderNewTodo = (props: Partial<React.ComponentProps<typeof NewTodo>> = {}): RenderResult => {
  const defaultProps: ComponentNewTodoProps = {
    createItem: mockCreateItem,
  };

  return render(<NewTodo {...defaultProps} {...props} />);
};

const createNewTask = (task: string): void => {
  fireEvent.change(inputNewTodo, { target: { value: task } });
  fireEvent.submit(formCreateNewTodo);
}

describe('NewTodo Component', () => {
  beforeEach(() => {
    mockCreateItem = vi.fn();

    const {
      getByPlaceholderText,
      getByRole,
      getByLabelText,
    } = renderNewTodo();

    inputNewTodo = getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    buttonCreateNewTodo = getByRole('button') as HTMLButtonElement;
    formCreateNewTodo = getByLabelText('to create a new task') as HTMLFormElement;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders NewTodo component', () => {
    expect(inputNewTodo).toBeInTheDocument();
    expect(buttonCreateNewTodo).toBeInTheDocument();
  });

  it('submit, input not empty', () => {
    createNewTask('Test Task 1');

    expect(mockCreateItem).toHaveBeenCalledWith('Test Task 1');
    expect(inputNewTodo.value).toBe('');
  });

  it('submit, input empty', () => {
    fireEvent.submit(formCreateNewTodo);

    expect(mockCreateItem).not.toHaveBeenCalled();

    createNewTask(' ');

    expect(mockCreateItem).not.toHaveBeenCalledWith(' ');
  });
});
