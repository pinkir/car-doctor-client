import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsRow from "./BookingsRow";
import { Navigate } from "react-router-dom";


const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const url = `http://localhost:5000/checkouts?email=${user?.email}`

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)

                }
                else{
                    // logout and then navigate
                    Navigate('/')
                }
            })
    }, [url])

    const handleDelete = id => {
        const proceed = confirm('are you sure you want to delete?')
        if (proceed) {
            fetch(`http://localhost:5000/checkouts/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('deleted success')
                        const remaining = bookings.filter(booking => booking._id !==id);
                        setBookings(remaining)
                    }
                })

        }
    }


    const handleBookingConfirm =(id) =>{
        fetch(`http://localhost:5000/checkouts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining]
                setBookings(newBookings);

            }
        })
    }
    return (
        <div className="overflow-x-auto w-full">
            <h3 className="text-orange-600 font-bold text-3xl">Bookings: {bookings.length}</h3>
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Image</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(booking => <BookingsRow
                            key={booking._id}
                            booking={booking}
                            handleDelete={handleDelete}
                            handleBookingConfirm={handleBookingConfirm}
                        ></BookingsRow>)
                    }
                </tbody>


            </table>
        </div>
    );
};

export default Bookings;