import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { TodoApp } from '../TodoApp';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock, });

let getByRole: (role: string, options?: Record<string, unknown>) => HTMLElement;
let getByText: (text: string) => HTMLElement;
let getByTestId: (id: string) => HTMLElement;
let queryByText: (id: string) => HTMLElement | null;
let formElement: HTMLFormElement;
let inputNewTodo: HTMLInputElement;
let toggleTaskStatus: HTMLInputElement;

const defaultSetUp = (): RenderResult => {
  const renderTodoApp: RenderResult = render(<TodoApp />);
  getByRole = renderTodoApp.getByRole;
  getByText = renderTodoApp.getByText;
  getByTestId = renderTodoApp.getByTestId;
  queryByText = renderTodoApp.queryByText;

  formElement = renderTodoApp.getByRole('form', { name: 'to create a new task' }) as HTMLFormElement;
  inputNewTodo = renderTodoApp.getByPlaceholderText('What needs to be done?') as HTMLInputElement;

  return renderTodoApp;
}

const createNewTask = (arr: string[]): void => {
  arr.forEach(task => {
    fireEvent.change(inputNewTodo, { target: { value: task } });
    fireEvent.submit(formElement);
  });
}

describe('TodoApp Component', () => {
  beforeEach(() => {
    localStorage.clear();
    defaultSetUp();
    createNewTask(['Test Task 1', 'Test Task 2']);
    toggleTaskStatus = getByRole('checkbox', { name: 'Test Task 1' }) as HTMLInputElement;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders TodoApp component', () => {
    expect(getByRole('heading', { name: 'todos' })).toBeInTheDocument();
    expect(getByRole('form', { name: 'to create a new task' })).toBeInTheDocument();
    expect(getByRole('list')).toBeInTheDocument();
    expect(getByTestId('control-panel')).toBeInTheDocument();
    expect(getByRole('radio', { name: 'checkAll' })).toBeInTheDocument();
  });

  it('render new task', () => {
    expect(getByText('Test Task 1')).toBeInTheDocument();
    expect(getByText('Test Task 2')).toBeInTheDocument();
  });

  it('check toggle if click, change done and count', () => {
    expect(toggleTaskStatus).not.toBeChecked();
    expect(getByText('2 items left')).toBeInTheDocument();

    fireEvent.click(toggleTaskStatus);

    expect(toggleTaskStatus).toBeChecked();
    expect(getByText('1 items left')).toBeInTheDocument();

    fireEvent.click(toggleTaskStatus);

    expect(toggleTaskStatus).not.toBeChecked();
    expect(getByText('2 items left')).toBeInTheDocument();
  });

  it('status check task filter', () => {
    const activeFilter = getByText('Active');
    const completedFilter = getByText('Completed');
    const allFilter = getByText('All');

    fireEvent.click(toggleTaskStatus);
    fireEvent.click(activeFilter);

    expect(getByText('Test Task 2')).toBeInTheDocument();
    expect(queryByText('Test Task 1')).not.toBeInTheDocument();

    fireEvent.click(completedFilter);

    expect(getByText('Test Task 1')).toBeInTheDocument();
    expect(queryByText('Test Task 2')).not.toBeInTheDocument();

    fireEvent.click(allFilter);

    expect(getByText('Test Task 2')).toBeInTheDocument();
    expect(queryByText('Test Task 1')).toBeInTheDocument();
  });

  it('delete complited tasks', () => {
    const btnClearCompleted = getByRole('button', { name: 'Clear completed' });

    fireEvent.click(toggleTaskStatus);
    fireEvent.click(btnClearCompleted);

    expect(queryByText('Test Task 1')).not.toBeInTheDocument();
    expect(queryByText('Test Task 2')).toBeInTheDocument();
  });
});
