export type TodoItem = {
  id: number;
  title: string;
  done: boolean;
}

export const saveList = (list: TodoItem[]): void => {
  localStorage.setItem('list', JSON.stringify(list));
};

export const restoreList = (): TodoItem[] => {
  const rawList = localStorage.getItem('list');

  if (!rawList) {
    return [];
  }

  return JSON.parse(rawList);
};
