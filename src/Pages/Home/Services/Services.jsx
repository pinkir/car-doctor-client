import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([])

    useEffect(()=>{
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data))

    },[])


    return (
        <div className=" mt-4">
            <div className="text-center">
            <h3 className="text-orange-600 text-3xl">Our Services</h3>
            <h2 className="text-5xl">Our Services Area</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, earum ut molestiae ab magni eum numquam quam facilis. <br /> Enim hic possimus sit similique dolor cupiditate praesentium aspernatur vel ducimus quod.
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard 
                    key ={service._id}
                    service={service}
                    >

                    </ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;