import './Button.css';

const VARIANTS = [
    "button__primary",
    "button__danger",
    "button__success",
    "btn--close--solid",
]

const SIZES = [
    "button__small",
    "button__medium",
    "button__large",
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