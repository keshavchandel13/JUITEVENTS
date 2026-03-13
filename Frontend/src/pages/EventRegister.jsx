import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventRegister = () => {

  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([""]);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {

    const res = await axios.get(`http://localhost:3000/api/events/${id}`);

    setEvent(res.data);
  };

  const handleMemberChange = (index, value) => {

    const updated = [...teamMembers];
    updated[index] = value;

    setTeamMembers(updated);
  };

  const addMember = () => {

    setTeamMembers([...teamMembers, ""]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post("http://localhost:3000/api/events/register", {

      eventId: id,
      studentName,
      teamName,
      teamMembers: teamMembers.map(name => ({ name }))

    });

    alert("Registered Successfully");

  };

  if (!event) return <p className="text-white">Loading...</p>;

  return (

    <div className="max-w-2xl mx-auto p-6">

      {/* EVENT INFO */}
      <div className="border p-4 rounded-xl mb-6">

        <img
          src={event.image}
          className="h-48 w-full object-cover rounded"
        />

        <h2 className="text-xl font-bold mt-3">
          {event.title}
        </h2>

        <p>{event.location}</p>

        <p>{event.startDate}</p>

      </div>


      {/* REGISTRATION FORM */}
      <h2 className="text-xl font-bold mb-4">
        Register for Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Team Name (optional)"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="border p-2 w-full"
        />

        <div>

          <p className="font-bold mb-2">
            Team Members
          </p>

          {teamMembers.map((member, index) => (

            <input
              key={index}
              type="text"
              placeholder={`Member ${index + 1}`}
              value={member}
              onChange={(e) =>
                handleMemberChange(index, e.target.value)
              }
              className="border p-2 w-full mb-2"
            />

          ))}

          <button
            type="button"
            onClick={addMember}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          >
            Add Member
          </button>

        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          Register
        </button>

      </form>

    </div>

  );
};

export default EventRegister;