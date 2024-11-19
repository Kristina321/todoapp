import { saveList, restoreList } from '../localStorage';
import { testTaskList } from '../constant';

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('save and restore list', () => {
    saveList(testTaskList);

    const restoredList = restoreList();

    expect(restoredList).toEqual(testTaskList);
  });

  it('return empty array if list empty', () => {
    const restoredList = restoreList();

    expect(restoredList).toEqual([]);
  });
});
