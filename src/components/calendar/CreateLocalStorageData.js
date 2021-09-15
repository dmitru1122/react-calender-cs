import moment from 'moment';
// import itemList from '../item-title-type';

const defaultsGroup = [
  { id: 1, title: 'group 1' },
  { id: 2, title: 'group 2' },
  { id: 3, title: 'group 3' },
  { id: 4, title: 'group 4' },
  { id: 5, title: 'group 5' },
  { id: 6, title: 'group 6' },
  { id: 7, title: 'group 7' },
  { id: 8, title: 'group 8' },
  { id: 9, title: 'group 9' },
];

const defaultsItems = [
  {
    id: 1,
    group: 1,
    color: 'green',

    selectedBgColor: 'grey',
    title: 'A',
    start: moment('01-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('10-09-2021', 'DD-MM-YYYY').valueOf(),
  },
  {
    id: 2,
    color: 'purple',

    selectedBgColor: 'grey',
    group: 2,
    title: 'J',
    start: moment('08-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('09-09-2021', 'DD-MM-YYYY').valueOf(),
  },
  {
    id: 3,
    color: 'aqua',

    selectedBgColor: 'grey',
    group: 1,
    title: 'P',
    start: moment('09-09-2021', 'DD-MM-YYYY').valueOf(),
    end: moment('12-09-2021', 'DD-MM-YYYY').valueOf(),
  },
];

export function createLoacalStorage() {
  const checkItem = localStorage.getItem('itemms')
    ? null
    : localStorage.setItem('itemms', JSON.stringify(defaultsItems));
  const checkGroup = localStorage.getItem('groupps')
    ? null
    : localStorage.setItem('groupps', JSON.stringify(defaultsGroup));

  return { checkItem, checkGroup };
}

export function getStorageValues() {
  const items = localStorage.getItem('itemms') ? JSON.parse(localStorage.getItem('itemms')) : defaultsItems;
  const groups = localStorage.getItem('groupps') ? JSON.parse(localStorage.getItem('groupps')) : defaultsGroup;
  return { items, groups };
}

export function refreshLocalStorage(data) {
  localStorage.setItem('itemms', JSON.stringify(data));
}

// export function addToLocalStorage(item) {

// }
