import styles from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"
import PropTypes from 'prop-types';



const Search = ({value,onChange}) => {
  return (
    <div className={styles.search}>
      
        <BiSearch size={18} className={styles.icon}/>
        <input type="text" placeholder="Search Product" value={value} onChange={onChange}/>

    </div>
  )
}

export default Search


Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}