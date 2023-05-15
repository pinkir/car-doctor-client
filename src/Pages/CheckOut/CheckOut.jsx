import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const CheckOut = () => {

    const service = useLoaderData()
    const { _id, title, price, img } = service;

    const { user } = useContext(AuthContext);

    // const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());




    const handleCheckOut = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const checkOuts = {
            customerName: name,
            img,
            date,
            email,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(checkOuts);


        fetch('http://localhost:5000/checkouts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(checkOuts)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('service added')
                }
            })
    }
    return (

        <div>

            <h3 className="text-center font-bold text-orange-600 p-5">BOOK SERVICE : {title}</h3>

            <form onSubmit={handleCheckOut}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" className="input input-bordered" />
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" />

                    </div> */}
                    {/* <div>
                        <DayPicker
                            selected={selectedDate}
                            onDayClick={day => setSelectedDate(day)}
                        />
                    </div> */}
                    <div>
                        <h3>Pick a Date when you want our service.</h3>
                        <DatePicker
                        className="mt-5 border-4"
                        name="date" 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text"
                            defaultValue={user?.email}
                            placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount </span>
                        </label>
                        <input type="text" defaultValue={'$' + price} className="input input-bordered" />

                    </div>
                </div>

                <div className="form-control mt-6 mb-5">
                    <input type="submit" value="Book Now" className="btn btn-error btn-block" />
                </div>
            </form>
        </div>


    );
};

export default CheckOut;