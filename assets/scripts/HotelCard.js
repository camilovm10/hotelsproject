

const HotelCard = ({photo, name, description, city, country, rooms, price}) => {

    // const iterablePrice = () => {
    //     if (price === 4) {
    //         return [1, 2, 3, 4];
    //     } else if (price === 3) {
    //         return [1, 2, 3];
    //     } else if (price === 2) {
    //         return [1, 2];
    //     } else if (price === 1) {
    //         return [1];
    //     } 
    // };

    // const dollarIcon = iterablePrice();

    return (
        <div className="hotel-card hay">
            <img src={photo}/>
            <h3>{name} </h3>
            <p>{description} </p>
            <div className="flex1">
                <div className="container-icon">
                    <span><i className="fas fa-map-marker-alt"></i></span>
                </div>
                <p className="city"> {city}, {country} </p>
            </div>
            

            <div className="flex">
                <div className="flex1">
                    <div className="container-icon">
                        <span><i className="fas fa-bed"></i></span>
                    </div>
                    <p className="city"> {rooms} habitaciones</p>
                </div>
                
               
                    {/* {dollarIcon.map(dollar => <span><i className="fas fa-dollar-sign"></i></span> )} */}
                {
                    price === 4 &&
                    <div className="container-icon2">
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                    </div>
                }
                {
                    price === 3 &&
                    <div className="container-icon2">
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                    </div>
                }
                {
                    price === 2 &&
                    <div className="container-icon2">
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                    </div>
                }
                {
                    price === 1 &&
                    <div className="container-icon2">
                        <span><i className="fas fa-dollar-sign white"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                        <span><i className="fas fa-dollar-sign grey"></i></span>
                    </div>
                }
                
            </div>
            

            <button className="btn">Reservar</button>
        </div>
    )
}


