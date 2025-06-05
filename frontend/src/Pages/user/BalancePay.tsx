import { message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../service/user.service';
import { authStore } from '../../store/auth.store';
import { useAuth } from '../../auth/AuthProvider';
import LoadingOverlay from '../../components/common/LoadingOverlay/LoadingOverlay';
import Payment from '../../components/common/Payment/Payment';
import RouteConstants from '../../constants/RouteConstants';


const BalancePay = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const AddBalance = () => {
      if(user === null) return;
      setLoading(true);
      const amount = id ? parseFloat(id) : 0;
      UserService.editUser(user?.id, {balance: user?.balance + amount})
          .then((response) => {
              authStore.setUser({
                  id: response.data.id,
                  username: response.data.username,
                  email: response.data.email,
                  phone: response.data.phone,
                  image: response.data.image,
                  balance: response.data.balance,
                  membership: response.data.membership,
                  role: response.data.role
              });
          })
          .catch((error) => {
              console.error('Error while adding balance.', error);
              message.error(error.message || 'Error while login.');
          })
          .finally(() => {
              setLoading(false);
              setSuccess(true);
          });
  };

  return (
    <>
      {user && 
      <Payment 
          handlePay={AddBalance} 
          amount={id ? Math.round(parseFloat(id)) : 0}
          success={success}
          backTo={RouteConstants.profile}
      />}

      {loading && <LoadingOverlay />}
    </>
  );
};

export default BalancePay;
