
class App extends React.Component {
    
    state = {
        datos : {
            date1: '',
            date2: '2020-09-20',
            pais: 'Todos los paises',
            precio: 'Cualquier precio',
            tamaño: 'Cualquier tamaño'
        },
        arrayHotels: hotelsData,
        thereHotels: false
    };

    tenemosHoteles = false
    
    obtenerInformacion = e => {
        const datos = this.state.datos;

        this.setState({
            
            datos: {...datos, [e.target.name] : e.target.value}

        })
    }

    obtenerFechas = e => {
        const datos = this.state.datos;
        this.setState({
            
            datos: {...datos, [e.target.name] : e.target.value.valueOf()}

        })

        
    }

    hayHoteles = () => {

        return this.tenemosHoteles = true;

    }

    noHayHoteles = () => {
        return this.tenemosHoteles = false;
    }


    render(){

        
        return (
            <div>
                <header className="hero">
                    <div className="header">
                        <div className="contenedor-logo">
                            <img className="logo" src="../public/img/w-hotels.png"/>
                        </div>
                        <div >
                            <nav>
                                <a href="#" className="nav-item">Nosotros</a>
                                <a href="#" className="nav-item">Políticas</a>
                                <a href="#" className="nav-item">Blog</a>
                                <a href="#" className="nav-item">Contacto</a>
                            </nav>
                        </div>
                    </div>
                    
                </header>
                
                <div className="container-filters" onChange={this.noHayHoteles}>
                    {
                    this.state.datos.date1 === '' ? 
                    <p>Escoge tus fechas de viaje</p> : 
                    <p>Viaja desde el <strong className="italic">{moment(this.state.datos.date1).format('dddd')}, {moment(this.state.datos.date1).format('LL')}</strong>  al <strong className="italic">{moment(this.state.datos.date2).format('dddd')}, {moment(this.state.datos.date2).format('LL')}</strong> </p>
                    }
                    <form className="filters">
                        <input 
                            type="date" 
                            className="filter-item"
                            name="date1"
                            value={this.state.datos.date1}
                            onChange={this.obtenerFechas}
                        ></input>
                        <input 
                            type="date" 
                            className="filter-item"
                            name="date2"
                            value={this.state.datos.date2}
                            onChange={this.obtenerFechas}
                        ></input>
                        <select 
                            className="filter-item"
                            name="pais"
                            value={this.state.datos.pais}
                            onChange={this.obtenerInformacion}
                        >
                            <option>Todos los paises </option>
                            <option>Argentina</option>
                            <option>Brasil</option>
                            <option>Chile</option>
                            <option>Uruguay</option>
                        </select>
                        <select 
                            className="filter-item"
                            name="precio"
                            value={this.state.datos.precio}
                            onChange={this.obtenerInformacion}
                        >
                            <option> Cualquier precio </option>
                            <option> $ </option>
                            <option> $$ </option>
                            <option> $$$ </option>
                            <option> $$$$ </option>
                        </select>
                        <select 
                            className="filter-item"
                            name="tamaño"
                            value={this.state.datos.tamaño}
                            onChange={this.obtenerInformacion}
                        >
                            <option>Cualquier tamaño</option>
                            <option>Pequeño</option>
                            <option>Mediano</option>
                            <option>Grande</option>
                        </select>
                    </form>
                    
                </div>
                <div className="hotel-card-container" onLoad={this.hayHoteles}>
                    <span className="border"></span>
                    { this.state.arrayHotels.map(hotel => {
                        
                        let maxRooms = () => {

                            if (this.state.datos.tamaño === 'Pequeño') {
                                return 10;
                            } else if (this.state.datos.tamaño === 'Mediano') {
                                return 20;
                            } else if (this.state.datos.tamaño === 'Grande') {
                                return 45;
                            } else {
                                return 100;
                            }
                        };

                        let minRooms = () => {

                            if (this.state.datos.tamaño === 'Pequeño') {
                                return 0;
                            } else if (this.state.datos.tamaño === 'Mediano') {
                                return 10;
                            } else if (this.state.datos.tamaño === 'Grande') {
                                return 20;
                            } else {
                                return 100;
                            }
                        };

                        let pricing = () => {

                            if (this.state.datos.precio === '$') {
                                return 1;
                            } else if (this.state.datos.precio === '$$') {
                                return 2;
                            } else if (this.state.datos.precio === '$$$') {
                                return 3;
                            } else if (this.state.datos.precio === '$$$$') {
                                return 4;
                            } 
                        }

                        

                        let date1InMili = () => {

                            const date1 = new Date(this.state.datos.date1);

                            return  date1.valueOf()
                                
                        }

                        let date2InMili = () => {

                            const date2 = new Date(this.state.datos.date2);

                            return  date2.valueOf()

                        }

                        let funcRestMili = () => {

                            const date = new Date()

                            let actualDate = new Date(`${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`) ;


                            return(
                                hotelsData[0].availabilityFrom - actualDate.valueOf()
                            ) 

                        }

                        const renderHotel = () => {
                            return <HotelCard 
                            key={hotel.slug}
                            photo={hotel.photo}
                            name={hotel.name}
                            description={hotel.description}
                            city={hotel.city}
                            country={hotel.country}
                            rooms={hotel.rooms}
                            price={hotel.price}
                            />
                        }

                    
                        const LargeOfRooms = maxRooms();
                        const limitRooms = minRooms();
                        const priceConverted = pricing();
                        const date1 = date1InMili();
                        const date2 = date2InMili();
                        const restMili = funcRestMili();

                        if(this.state.datos.pais === 'Todos los paises' && this.state.datos.precio === 'Cualquier precio' && this.state.datos.tamaño === 'Cualquier tamaño' && this.state.datos.date1 === ''){
                            this.hayHoteles()
                            return renderHotel()
                               
                        } 
                        // Fechas incluido
                        else if(this.state.datos.pais === 'Todos los paises' && this.state.datos.precio === 'Cualquier precio' && this.state.datos.tamaño === 'Cualquier tamaño' && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)){
                            this.hayHoteles()
                            return renderHotel() 
                               
                        } else if(this.state.datos.pais === hotel.country && this.state.datos.precio === 'Cualquier precio' && this.state.datos.tamaño === 'Cualquier tamaño' && this.state.datos.date1 === '') {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido         
                        } else if(this.state.datos.pais === hotel.country && this.state.datos.precio === 'Cualquier precio' && this.state.datos.tamaño === 'Cualquier tamaño' && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel() 

                        } else if(this.state.datos.pais === hotel.country && priceConverted === hotel.price && this.state.datos.tamaño === 'Cualquier tamaño'  && this.state.datos.date1 === '') {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido 
                        }  else if(this.state.datos.pais === hotel.country && priceConverted === hotel.price && this.state.datos.tamaño === 'Cualquier tamaño'  && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel()

                        } else if(this.state.datos.pais === hotel.country && priceConverted === hotel.price && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms && this.state.datos.date1 === '') {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido 
                        }  else if(this.state.datos.pais === hotel.country && priceConverted === hotel.price && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel()

                        }  else if(this.state.datos.pais === 'Todos los paises' && this.state.datos.precio === 'Cualquier precio' && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms  && this.state.datos.date1 === '' ) {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido         
                        }  else if(this.state.datos.pais === 'Todos los paises' && this.state.datos.precio === 'Cualquier precio' && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms  && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel()

                        } else if(this.state.datos.pais === 'Todos los paises' && priceConverted === hotel.price && this.state.datos.tamaño === 'Cualquier tamaño'  && this.state.datos.date1 === '') {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido 
                        }  else if(this.state.datos.pais === 'Todos los paises' && priceConverted === hotel.price && this.state.datos.tamaño === 'Cualquier tamaño'  && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel()

                        } else if(this.state.datos.pais === 'Todos los paises' && priceConverted === hotel.price && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms  && this.state.datos.date1 === '') {
                            this.hayHoteles()
                            return renderHotel()

                        // Fechas incluido 
                        }  else if(this.state.datos.pais === 'Todos los paises' && priceConverted === hotel.price && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms  && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            this.hayHoteles()
                            return renderHotel()

                        } else if (this.state.datos.pais === hotel.country && this.state.datos.precio === 'Cualquier precio' && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms  && this.state.datos.date1 === '') {
                            
                            this.hayHoteles()
                            return renderHotel()

                        } else if (this.state.datos.pais === hotel.country && this.state.datos.precio === 'Cualquier precio' && LargeOfRooms >= hotel.rooms && limitRooms < hotel.rooms && date1 >= (hotel.availabilityFrom - restMili) && date2 <= (hotel.availabilityTo - restMili)) {
                            
                            this.hayHoteles()
                            return renderHotel() 
                        } 

                    })}
                    {
                        this.tenemosHoteles ? 
                        null : 
                        (
                        <div>
                            <hr className="border"></hr>
                            <h2>Lo sentimos, no tenemos hoteles disponibles bajo estos parametros. Por favor intenta otra categoria diferente.</h2>
                            <hr className="border"></hr>
                        </div>
                        )
                    }
                    <span className="border"></span>  
                    
                    
                </div>
                <Footer />
            </div>
        )
    }
};