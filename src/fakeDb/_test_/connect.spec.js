import createLocalStorage from '../connect';

describe('LocalStorage', () => {
  it('check localStorage dosn"t exist', () => {
    const expected = { checkRowData: undefined, checkHeaderData: undefined, checkFullHeaderData: undefined };
    const storage = createLocalStorage();
    expect(storage).toEqual(expected);
  });
  it('check localStorage exist', () => {
    localStorage.setItem('rowData', 'test');
    localStorage.setItem('headerData', 'test');
    localStorage.setItem('fullHeaderData', 'test');
    const expected = { checkRowData: null, checkHeaderData: null, checkFullHeaderData: null };
    const storage = createLocalStorage();
    expect(storage).toEqual(expected);
  });
});
