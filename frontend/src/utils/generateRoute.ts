import RouteConstants from "../constants/RouteConstants";

export const generateRoute = {
    balancePay: (id: string) => RouteConstants.balancePay.replace(':id', id),
    membershipPayment: (id: string) => RouteConstants.membershipPayment.replace(':id', id),
    tourDetails: (id: string) => RouteConstants.tours.replace(':id', id),
}