export type TodoItem = {
  id: number;
  title: string;
  done: boolean;
}

export const testTaskList: TodoItem[] = [
  { id: 1, title: 'Test Task 1', done: false },
  { id: 2, title: 'Test Task 2', done: true },
  { id: 3, title: 'Test Task 3', done: true },
  { id: 4, title: 'Test Task 4', done: true },
];
