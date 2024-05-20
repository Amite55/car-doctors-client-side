import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const BookingRow = ({ booking, setBookings, bookings }) => {
    const {_id, img, date, services, price, status } = booking;

    
    const handleDelete = (id) => {
        console.log(id);

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
              method: "DELETE"
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                  });

                  const remaining = bookings.filter(booking => booking._id !== id)
                  setBookings(remaining)
                }
              })
          }
        })
        }



        const handleBookingConfirm = (id) => {
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( {status: 'confirm'})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    // Swal.fire({
                    //     title: "successfully",
                    //     text: "Your item has been Confirm.",
                    //     icon: "success"
                    //   });

                      const remaining = bookings.filter(booking => booking._id !== id );
                      const updated = bookings.find(booking._id == id);
                      updated.status = 'confirm';
                      const newBookings  = [updated, ...remaining];
                      setBookings(newBookings);
                }
            })
           }


    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="avatar">
                    <div className=" rounded w-24 h-24">
                        {
                            img && <img src={img} alt="Avatar Tailwind CSS Component" />
                        }
                    </div>
                </div>
            </td>
            <td>
                {services}
            </td>
            <td>{date}</td>
            <td>${price}</td>
            <th>
                {
                    status == 'confirm' ? <span className='font-bold text-primary'>Confirmed</span> : <button onClick={() => handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>
                }
            </th>
        </tr>
    );
};

export default BookingRow;

BookingRow.propTypes = {
    booking: PropTypes.object,
    bookings: PropTypes.any,
    setBookings: PropTypes.any
 
};