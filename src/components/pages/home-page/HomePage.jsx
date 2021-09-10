// import { useGetRequestData } from '../../../cusom-hooks/GetListRequests';
// import LoadTable from '../../load-table/LoadTable';
import Calendar from '../../StyledCalendar';

function Home() {
  // const listRequests = useGetRequestData();

  return (
    <main className='home'>
      {/* <LoadTable data={listRequests} /> */}
      <Calendar />
    </main>
  );
}

export default Home;
