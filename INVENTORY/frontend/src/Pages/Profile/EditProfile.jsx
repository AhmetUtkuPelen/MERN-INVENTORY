import { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/Slices/AuthSlice'
import Loader from '../../Components/Loader/Loader'
import Card from '../../Components/Card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UpdateProfile } from '../../Services/AuthService'
import ChangePassword from './../../Components/ChangePassword/ChangePassword';



const EditProfile = () => {

  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const {email} = user

  useEffect(()=>{
    if(!email){
      navigate('/profile')
    }
  },[email,navigate])

  const initialState = {
    name:user?.name,
    email:user?.email,
    phone:user?.phone,
    bio:user?.bio,
    photo:user?.photo,
  }

  const [profile,setProfile] = useState(initialState)
  const [profileImage,setProfileImage] = useState("")


  const handleInputChange = (e) => {
    const {name,value} = e.target
    setProfile({...profile,[name]:value})
  }

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // ? image upload ? \\
      let imageURL
      if(profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/png" || profileImage.type === "image/jpg")){
        const image = new FormData()
        image.append("file",profileImage)
        image.append("cloud_name","dgfuqkgwb")
        image.append("upload_preset","ji9r57yc")
        // ? save image into cloudinary ? \\
        const response = await fetch("https://api.cloudinary.com/v1_1/dgfuqkgwb/image/upload",{
          method:'POST',
          body:image
        })
        const imageData = await response.json()
        imageURL = imageData.url.toString()
      }
        // ? save profile ? \\
        const formData = {
          name:profile.name,
          email:profile.email,
          phone:profile.phone,
          bio:profile.bio,
          photo:profileImage ? imageURL : profile.photo
        }
        const data = await UpdateProfile(formData)
        console.log(data)
        toast.success("Profile Updated Successfully!")
        navigate('/profile')
        setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <div className='profile --my-2'>
      
      {isLoading && <Loader/>}

      <Card cardClass={"card --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src={user?.photo}/>
                    </span>

                <form className='--form-control --m' onSubmit={saveProfile}>
                  <span className='profile-data'>
                        <p>
                            <label>Name : </label>
                            <input type='text' name='name' value={profile?.name} onChange={handleInputChange}/>
                        </p>
                        <p>
                          <label>Email : </label>
                          <input type='email' name='email' value={profile?.email} disabled/>
                        </p>
                        <p>
                          <label>Phone : </label>
                          <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
                        </p>
                        <p>
                          <label>Bio : </label>
                          <textarea name='bio' value={profile?.bio} onChange={handleInputChange} cols="30" rows="10" className='mx-5'></textarea>
                        </p>
                        <p>
                          <label>Photo : </label>
                          <input type='file' name='photo' onChange={handleImageChange}/>
                        </p>

                        <div>
                          <button className='--btn --btn-primary'>SAVE</button>
                        </div>

                  </span>

                </form>

                </Card>

                <br/>

              <ChangePassword/>

    </div>
  )
}

export default EditProfile