import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({
    imageSrc = "assets/img/default-plant.jpg", 
    altText = "default plant",
    header,
    subheader,
    watering,
    fertilizing
}) => {

    const warning = (fertilizing < 0) || (watering < 0) || (fertilizing === 0) || (watering === 0);
    const wateringToday = watering === 0;
    const wateringOverdue = watering < 0;
    const fertilizingToday = fertilizing === 0;
    const fertilizingOverdue = fertilizing < 0;

    return (
        <div className={`card ${warning && 'warning'}`}>
            <div className="card__info">
                <div className="card__header">{header}</div>
                <div className="card__subheader">{subheader}</div>

                {wateringToday && <div>Plant need watering today!</div>}
                {wateringOverdue && <div>{`Watering is overdue by ${watering} days!`}</div>}
                {watering > 0 && <div>{`Next watering in ${watering} days`}</div>}

                {fertilizingToday && <div>Plant need fertilizing today!</div>}
                {fertilizingOverdue && <div>{`Fertilizing is overdue by ${fertilizing} days!`}</div>}
                {fertilizing > 0 && <div>{`Next fertilizing in ${fertilizing} days`}</div>}

                <Link className="card__link" to="#">View details</Link>
            </div>
            <img className="card__image" src={imageSrc} alt={altText} />
        </div>
    )
}

export default Card;