import { useParams } from 'react-router-dom';
import './DonationView.scss';

function DonationView() {
  const params = useParams();
  console.log(params.subview);

  return (
    <>
      <div>Donation View</div>
      <div>{params.subview}</div>
    </>
  );
}

export default DonationView;
