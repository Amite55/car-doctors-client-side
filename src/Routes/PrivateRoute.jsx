import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate} from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    // const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner text-neutral"></span>
    }

    if(user?.email){
       return children;
    }
// state={location.pathname}
    return <Navigate  to='/login' replace></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.any
  };