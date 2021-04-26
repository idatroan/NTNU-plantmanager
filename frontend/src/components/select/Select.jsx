import './Select.css';

const Select = ({name, id, label, value, option, required = false, onChange}) => {

    const handleChange = (e) => {
        if (onChange) onChange(e);
    }

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <select name={name} id={id} value={value} onChange={handleChange} required={required}>
                <option>{option}</option>
            </select>
        </div>
    )
}

export default Select;