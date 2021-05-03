import './Button.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Button = ({ type, value, loading=false, variant="primary" }) => {

    return ( 
        <button 
            className={`button ${variant}`} 
            type={type}>{value} 
            {loading && <LoadingSpinner size="small" color="light"/>}
        </button>
    );
    
}
 
export default Button;