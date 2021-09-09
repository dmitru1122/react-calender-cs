import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useGetOneRequest } from '../../../cusom-hooks/GetOneRequest';
import ReturnToListButton from '../../buttons/LinkButton';
import LoadTable from '../../load-table/LoadTable';

const Request = () => {
  const params = useParams();
  const requestData = useGetOneRequest(params.id);
  return (
    <main className='home'>
      <Container>
        <Row>
          <Col className='d-flex justify-content-end'>
            <ReturnToListButton link='/' />
          </Col>
        </Row>
      </Container>
      <LoadTable data={requestData} />
    </main>
  );
};

export default Request;
