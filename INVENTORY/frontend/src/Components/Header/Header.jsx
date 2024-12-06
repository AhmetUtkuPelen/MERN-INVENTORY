import { useDispatch, useSelector } from "react-redux"
import { LogoutUser } from "../../Services/AuthService"
import { selectName, SET_LOGIN } from "../../Redux/Slices/AuthSlice"
import { useNavigate } from "react-router-dom"



const Header = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const name = useSelector(selectName)

  const LogOut = async () => {
    await LogoutUser()
    dispatch(SET_LOGIN(false))
    navigate('/login')
  }


  return (
    <div className="--pad header">
        <div className="--flex-between">
            <h3>
                <span className="--fw-thin">Welcome , </span>
                <span className="text-blue-600 uppercase">{name}</span>
            </h3>
            <button className="--btn bg-red-700 text-white hover:bg-red-500" onClick={LogOut}>LOGOUT</button>
        </div>
        <hr/>
    </div>
  )
}

export default Header
