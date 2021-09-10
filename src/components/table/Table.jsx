import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Table.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataTable,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import { deleteOneRequest, deleteOneRequestReset } from '../../redux/actions/index';
import Modal from '../modal/Modal';
import SpinnerCS from '../spinner-cs/Spinner';

function TableRequests(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { rowData, headerData } = props;
  const [deleting, setDeleting] = useState({ status: 'beforeAction', id: 0 });
  const status = useSelector((state) => state.deleteRequestStatus);

  const openFullRequestInfo = (id) => {
    history.push(`/request/${id}`);
  };
  const handleClickDelete = (id) => {
    setDeleting({ status: 'working', id });
    dispatch(deleteOneRequest(id));
  };
  const reset = () => {
    dispatch(deleteOneRequestReset());
    setDeleting({ status: false, id: 0 });
  };
  useEffect(() => {
    let callReset = 0;
    setDeleting({ status, id: 0 });
    callReset = setTimeout(reset, 5000);

    return () => {
      clearTimeout(callReset);
    };
  }, [status]);

  return (
    <div className='table'>
      <DataTable rows={rowData} headers={headerData} isSortable>
        {({ rows, headers, getHeaderProps, getTableProps, onInputChange, getBatchActionProps }) => (
          <TableContainer title='List of requests'>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                  onChange={onInputChange}
                />
                <Modal type='add' buttonLabel='Add request' description='hi' action='Delete' />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                  ))}
                  <TableHeader className='bx--table-sort-v2__ico'>Edit</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} className='table__row'>
                    {deleting.status === 'working' && deleting.id === row.id ? (
                      <td id='spin' className='table__row__cell--spinner' colSpan={row.cells.length + 1}>
                        <SpinnerCS />
                      </td>
                    ) : (
                      <>
                        {row.cells.map((cell) => (
                          <TableCell
                            className='table__row__cell'
                            key={cell.id}
                            onClick={() => openFullRequestInfo(row.id)}>
                            {cell.value}
                          </TableCell>
                        ))}
                        <TableCell className='table__row__cell--short'>
                          <Modal
                            type='delete'
                            title='Delete'
                            description='Are you sure you want to go on?'
                            action='Delete'
                            continueAction={() => handleClickDelete(row.id)}
                          />
                          <Modal type='edit' title='Edit row' action='Delete' id={row.id} />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <Modal
        type='notice'
        isShowModal={deleting.status === 'resolve'}
        closeAction={reset}
        title='Warning'
        description='Request was deleted'
      />
    </div>
  );
}

TableRequests.propTypes = {
  headerData: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, header: PropTypes.string })),
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      purpose: PropTypes.string,
    }),
  ),
};
TableRequests.defaultProps = {
  headerData: [
    { key: 'purpose', header: 'Purpose' },
    { key: 'firstName', header: 'First Name' },
  ],
  rowData: [{ id: '', firstName: '', purpose: '' }],
};

export default TableRequests;
