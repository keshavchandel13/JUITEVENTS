import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingEvents = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    const res = await axios.get("http://localhost:3000/api/events/upcoming");

    setEvents(res.data);
  };

  return (

    <div className="grid grid-cols-3 gap-6">

      {events.map((event) => (

        <div key={event._id} className="border p-4 rounded-xl">

          <img src={event.image} className="h-40 w-full object-cover rounded"/>

          <h3 className="font-bold mt-2">{event.title}</h3>

          <p>{event.location}</p>

          <p>{event.startDate}</p>

          <button
            className="bg-purple-600 px-4 py-2 mt-2 rounded"
            onClick={() => window.location.href = `/register-event/${event._id}`}
          >
            Register
          </button>

        </div>

      ))}

    </div>

  );
};

export default UpcomingEvents;