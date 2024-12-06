import { useEffect, useState } from 'react'
import RedirectLoggedOutUser from '../../Hook/RedirectLoggedOutUser'
import './Profile.scss'
import { useDispatch } from 'react-redux'
import { GetUser } from '../../Services/AuthService'
import { SET_NAME, SET_USER } from '../../Redux/Slices/AuthSlice'
import { SpinnerImage } from '../../Components/Loader/Loader'
import Card from '../../Components/Card/Card'
import { Link } from 'react-router-dom'



const Profile = () => {

    RedirectLoggedOutUser("/login")

    const dispatch = useDispatch()

    const [profile,setProfile] = useState(null)

    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        async function getUserData(){
            const data = await GetUser()
            setProfile(data)
            setIsLoading(false)
            dispatch(SET_USER(data))
            dispatch(SET_NAME(data.name))
        }
        getUserData()
    },[dispatch])


  return (
    <div className='profile --my2'>
        {isLoading && <SpinnerImage/>}
    
        <>
            {!isLoading && profile === null ? (
                <p>SOMETHING WENT WRONG. PLEASE RELOAD THE PAGE</p>
            ) : (
                <Card cardClass={"card --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src={profile?.photo}/>
                    </span>
                    <span className='profile-data'>
                        <p>
                            <b> Name : </b> {profile?.name}
                        </p>
                        <p>
                            <b> Email : </b> {profile?.email}
                        </p>
                        <p>
                            <b> Phone : </b> {profile?.phone}
                        </p>
                        <p>
                            <b> Bio : </b> {profile?.bio}
                        </p>

                        <div>
                            <Link to="/editProfile">
                                <button className='--btn --btn-primary'>EDIT PROFILE</button>
                            </Link>
                        </div>

                    </span>
                </Card>
            )}
        </>

    </div>
  )
}

export default Profile