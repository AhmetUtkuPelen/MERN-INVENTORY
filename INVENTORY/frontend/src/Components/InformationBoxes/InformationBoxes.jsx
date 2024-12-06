import './InformationBoxes.scss'
import PropTypes from 'prop-types';


const InformationBoxes = ({bgColor,title,count,icon}) => {



  return (
    <div className={`info-box ${bgColor}`}>
      
        <span className='info-icon --color-white'>{icon}</span>

        <span className='info-text'>
            <p>{title}</p>
            <h4>{count}</h4>
        </span>

    </div>
  )
}

export default InformationBoxes


InformationBoxes.propTypes = {
  bgColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};