import styles from "./Card.module.scss";
import PropTypes from 'prop-types';


const Card = ({children,cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
      {children}
    </div>
  )
}

export default Card

Card.propTypes = {
    children: PropTypes.node,
    cardClass: PropTypes.string,
  };