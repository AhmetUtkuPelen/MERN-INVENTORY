import './Loader.scss'
import LoadingImage from "../../Assets/loader.gif"
import ReactDOM from "react-dom"


const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src={LoadingImage}/>
        </div>
    </div>,
    document.getElementById('loader')
  )
}

export const SpinnerImage = () => {
    return (
        <div className='--center-all'>
            <img src={LoadingImage}/>
        </div>
    )
}

export default Loader