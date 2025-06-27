import { message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import Payment from '../../Components/common/Payment/Payment';
import RouteConstants from '../../constants/RouteConstants';
import { UserMembership } from '../../enums/user-membership.enum';
import UserService from '../../service/user.service';
import { authStore } from '../../store/auth.store';
import PageLoader from '../../Components/common/FullPageLoader/PageLoader';


const MembershipPayment = () => {
  const { user } = useAuth();
  const { id } = useParams(); 

  const [success, setSuccess] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Determine amount based on plan 
  const getAmount = (planId: UserMembership) => {
    if (planId === UserMembership.GENERAL) return 0;
    else if (planId === UserMembership.GOLD) return 499;
    else if (planId === UserMembership.PREMIUM) return 999;
    else return 0; 
  };


  // update membership
  const updateMembership = () => {
    if(user === null) return;
      setLoading(true);
      UserService.editUser(user?.id, {membership: id})
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
              setSuccess(true);
          })
          .catch((error) => {
              console.error('Error while updating membership.', error);
              message.error(error.message || 'Error while updating membership.');
          })
          .finally(() => {
              setLoading(false);
          });
  };

  return (
      <>
      {user && 
      <Payment 
          handlePay={updateMembership} 
          amount={getAmount(id as UserMembership)} 
          success={success}
          backTo={RouteConstants.pricing}
      />}

      {loading && <PageLoader />}
      </>
  );
};

export default MembershipPayment;
