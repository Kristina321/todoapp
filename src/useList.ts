import { useState, useEffect, useCallback, useMemo } from 'react';
import { TodoItem, saveList, restoreList } from './localStorage'

export function useList() {
  const [list, setList] = useState<TodoItem[]>(restoreList);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const createItem = (title: string) => {
    const newItem: TodoItem = {
      id: Date.now() + Math.random(),
      title: title,
      done: false,
    };

    setList([...list, newItem]);
  };

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'Active':
        return list.filter(item => !item.done);
      case 'Completed':
        return list.filter(item => item.done);
      default:
        return list;
    }
  }, [list, filter]);

  const onFilterChange = (newFilter: 'All' | 'Active' | 'Completed') => {
    setFilter(newFilter);
  };

  const toggleItem = (id: number) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteComplitedItem = () => {
    setList(list.filter((item) => !item.done));
  };

  const updateLocalStorage = useCallback(() => {
    saveList(list);
  }, [list]);

  useEffect(updateLocalStorage, [updateLocalStorage]);

  return {
    list,
    filteredItems,
    createItem,
    toggleItem,
    onFilterChange,
    deleteComplitedItem,
  };
}
