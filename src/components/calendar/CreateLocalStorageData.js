import moment from 'moment';

const groupps = [
  { id: 1, title: 'group 1' },
  { id: 2, title: 'group 2' },
];

const itemms = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start: moment('01-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('10-09-2021', 'DD-MM-YYYY').valueOf(),
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start: moment('08-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('09-09-2021', 'DD-MM-YYYY').valueOf(),
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start: moment('09-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('12-09-2021', 'DD-MM-YYYY').valueOf(),
  },
];

export function createLoacalStorage() {
  const checkItem = localStorage.getItem('itemms') ? null : localStorage.setItem('itemms', JSON.stringify(itemms));
  const checkGroup = localStorage.getItem('groupps') ? null : localStorage.setItem('groupps', JSON.stringify(groupps));

  return { checkItem, checkGroup };
}

export function getStorageValues() {
  const items = localStorage.getItem('itemms') ? JSON.parse(localStorage.getItem('itemms')) : itemms;
  const groups = localStorage.getItem('groupps') ? JSON.parse(localStorage.getItem('groupps')) : groupps;
  return { items, groups };
}
