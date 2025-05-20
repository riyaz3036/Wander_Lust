import RouteConstants from "../constants/RouteConstants";

export const generateRoute = {
    balancePay: (id: string) => RouteConstants.balancePay.replace(':id', id),
    payment: (id: string) => RouteConstants.payment.replace(':id', id),
    tourDetails: (id: string) => RouteConstants.tours.replace(':id', id),
}