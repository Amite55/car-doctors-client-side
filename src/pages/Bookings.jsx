import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import BookingRow from "./BookingRow";
// import axios from "axios";
// import Swal from "sweetalert2";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {

        // axios.get(url, {withCredentials: true})
        // .then(res => {
        //     setBookings(res.data)
        // })

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            })
    }, [url]) 

    return (
        <div>
            <h1>this bookings {bookings.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Delete
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       
                       {
                        bookings.map(booking => <BookingRow 
                            key={booking._id} 
                            booking={booking} 
                            setBookings={setBookings}
                            bookings={bookings}
                            ></BookingRow>)
                       }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Bookings;