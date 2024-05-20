import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const CheckOut = () => {
    const services = useLoaderData();
    const {_id, title, price, img } = services;
    const {user} = useContext(AuthContext);

    const handleBookServices = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const bookings = {
            customerName : name,
            email,
            date,
            img,
            services: title,
            service_id: _id,
            price: price
        };
        console.log(bookings);

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookings)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire("service book successfully");
            }
        })
    }

    return (
        <div>
            <h2 className="text-center text-3xl">Book Services: {title}</h2>

            <form onSubmit={handleBookServices} className="card-body">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">DUE Amount</span>
                    </label>
                    <input type="text" defaultValue={'$'+price} className="input input-bordered" required />
                </div>
               </div>
                <div className="form-control mt-6">
                    <input className="btn btn-block btn-primary" type="submit" value="Order confirm" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;