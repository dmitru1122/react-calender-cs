import { useGetRequestData } from '../../../cusom-hooks/GetListRequests';
import LoadTable from '../../load-table/LoadTable';
import Calendar from '../../calendar/index';

function Home() {
  const listRequests = useGetRequestData();

  return (
    <main className='home'>
      <LoadTable data={listRequests} />
      <Calendar />
    </main>
  );
}

export default Home;
