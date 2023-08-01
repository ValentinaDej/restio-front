import { useParams } from 'react-router-dom';

const MenuWaiterPage = () => {
  const { tableId } = useParams();
  return (
    <>
      <p>Menu Waiter Page</p>
      <p>{tableId}</p>
    </>
  );
};

export default MenuWaiterPage;
