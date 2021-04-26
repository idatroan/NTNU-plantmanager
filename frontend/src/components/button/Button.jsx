import './Button.css';

const VARIANTS = [
    "btn--primary--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--close--solid",
]

const SIZES = [
    "btn--small",
    "btn--medium",
    "btn--large",
]

const Button = ({value, type, variant, size, onClick}) => {

    const checkButtonVariant = VARIANTS.includes(variant) ? variant : VARIANTS[0];
    const checkButtonSize = SIZES.includes(size) ? size : SIZES[1];

    return (
        <button className={`btn ${checkButtonVariant} ${checkButtonSize}`} onClick={onClick} type={type}>
            {value}
        </button>
    )
}

export default Button;