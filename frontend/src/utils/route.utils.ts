import { secureRoutes } from "../constants/RouteConstants";

export const isSecureRoute = (pathname: string) => {
  return secureRoutes.some(routePattern => {
    const regex = new RegExp('^' + routePattern.replace(/:[^/]+/g, '[^/]+') + '$');
    return regex.test(pathname);
  });
};
