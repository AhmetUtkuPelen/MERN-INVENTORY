import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../Redux/Slices/AuthSlice"
import PropTypes from "prop-types"



export const ShowLinksOnLogin = ({children}) => {

    const IsLoggedIn = useSelector(selectIsLoggedIn)

    if(IsLoggedIn){
        return <>{children}</>
    }

    return null

}




export const ShowLinksOnLogOut = ({children}) => {

    const IsLoggedIn = useSelector(selectIsLoggedIn)

    if(!IsLoggedIn){
        return <>{children}</>
    }

    return null

}





ShowLinksOnLogin.propTypes = {
    children: PropTypes.node.isRequired,
  };

  ShowLinksOnLogOut.propTypes = {
    children: PropTypes.node.isRequired,
  };