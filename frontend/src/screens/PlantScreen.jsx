import Plant from "../components/plant/Plant";


const PlantScreen = (props) => {

    return (
        <div className="component-container">
            <Plant { ...props} />
        </div>
    )
}

export default PlantScreen;