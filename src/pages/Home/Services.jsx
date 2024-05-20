import { useEffect } from "react";
import { useState } from "react";
import ServicesCard from "./ServicesCard";


const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => {
            setServices(data)
        })
    },[])
    console.log(services);

    return (
        <div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-orange-500">Services</h2>
                <h2 className="text-3xl">Our services Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don,t look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(services => <ServicesCard key={services._id} services={services}/>)
                }
            </div>
        </div>
    );
};

export default Services;