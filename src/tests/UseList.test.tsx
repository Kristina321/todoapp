import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { useList } from '../useList';
import { saveList, restoreList } from '../localStorage';
import { TodoItem, testTaskList } from '../constant';

type UseListType = ReturnType<typeof useList>;
let hookResult: RenderHookResult<UseListType, unknown>;
let list: TodoItem[];
let filteredItems: TodoItem[];
let newTodo: string[];

const initHook = (initList?: TodoItem[]): void => {
  if (initList) {
    saveList(initList);
  }

  hookResult = renderHook(() => useList());

  updateState();
};

const createTodos = (titles: string[]) => {
  titles.forEach(title => {
    act(() => hookResult.result.current.createItem(title));
  });

  updateState();
};

const toggleTodo = (index: number) => {
  act(() => hookResult.result.current.toggleItem(hookResult.result.current.list[index].id));

  updateState();
};

const changeFilter = (filter: 'All' | 'Active' | 'Completed') => {
  act(() => hookResult.result.current.onFilterChange(filter));

  updateState();
};

const deleteCompletedTodo = () => {
  act(() => hookResult.result.current.deleteComplitedItem());

  updateState();
}

const checkTodosTitles = (arr: TodoItem[], expectedTitle: string[]) => {
  arr.forEach((item, index) => expect(item.title).toBe(expectedTitle[index]));
}

const checkTodosDone = (arr: TodoItem[], expectedDone: boolean[]) => {
  arr.forEach((item, index) => expect(item.done).toBe(expectedDone[index]));
}

const updateState = () => {
  list = hookResult.result.current.list;
  filteredItems = hookResult.result.current.filteredItems;
};

describe('useList', () => {
  beforeEach(() => {
    localStorage.clear();
    initHook();
    newTodo = ['Test Task 1', 'Test Task 2', 'Test Task 3'];
  });

  it('create new item', () => {
    createTodos(newTodo);


    expect(list.length).toBe(3);

    list.forEach((item, index) => {
      expect(item.title).toBe(newTodo[index]);
      expect(item.done).toBe(false);
      expect(typeof item.id).toBe('number');
    });
  });

  it('filter items', async () => {
    createTodos(newTodo);

    toggleTodo(1);
    toggleTodo(2)

    changeFilter('Completed');

    expect(filteredItems.length).toBe(2);
    checkTodosTitles(filteredItems, ['Test Task 2', 'Test Task 3']);

    changeFilter('Active');

    expect(filteredItems.length).toBe(1);
    checkTodosTitles(filteredItems, ['Test Task 1']);

    changeFilter('All');

    expect(filteredItems.length).toBe(3);
    checkTodosTitles(filteredItems, newTodo);
  });

  it('check toggle', () => {
    createTodos(newTodo);

    checkTodosDone(list, [false, false, false]);

    toggleTodo(0);
    checkTodosDone(list, [true, false, false]);

    toggleTodo(0);
    checkTodosDone(list, [false, false, false]);
  });

  it('delete completed items', () => {
    createTodos(newTodo);

    toggleTodo(0);
    toggleTodo(1);

    deleteCompletedTodo();

    expect(list.length).toBe(1);
    checkTodosTitles(list, ['Test Task 3']);
  });

  it('init restored list and save update list', () => {
    initHook(testTaskList);

    expect(list).toEqual(testTaskList);

    createTodos(['Test Task 5']);

    const savedList = restoreList();

    expect(savedList).toEqual(list);
  });
});
