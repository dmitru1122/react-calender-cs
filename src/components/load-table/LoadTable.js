import PropTypes from 'prop-types';
import SpinnerCs from '../spinner-cs/Spinner';
import Table from '../table/Table';

const LoadTable = ({ data }) => {
  return (
    <>
      {data ? (
        <Table headerData={data.headerData} rowData={data.rowData} />
      ) : (
        <div className='d-flex align-items-center justify-content-center'>
          <SpinnerCs />
        </div>
      )}
    </>
  );
};

LoadTable.propTypes = {
  data: PropTypes.shape({
    headerData: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, header: PropTypes.string })),
    rowData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        purpose: PropTypes.string,
      }),
    ),
  }),
};
LoadTable.defaultProps = {
  data: null,
};

export default LoadTable;
