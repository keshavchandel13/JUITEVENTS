import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEventRegistrations = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/admin/event-registrations"
      );

      setData(res.data);

    } catch (error) {
      console.error("Error fetching registrations");
    }

  };

  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Event Registrations
      </h2>

      {data.map((event) => (

        <div
          key={event._id}
          className="border rounded-xl p-5 mb-6 bg-slate-900/40"
        >

          {/* Event Title */}
          <h3 className="text-xl font-bold mb-4 text-cyan-400">
            {event.eventTitle}
          </h3>

          {/* Student List */}
          {event.students.map((student, i) => (

            <div
              key={i}
              className="border-b border-slate-700 pb-3 mb-3"
            >

              <p>
                <b>Name:</b> {student.studentName}
              </p>

              {student.teamName && (
                <p>
                  <b>Team:</b> {student.teamName}
                </p>
              )}

              {student.teamMembers?.length > 0 && (
                <>
                  <p><b>Members:</b></p>

                  <ul className="ml-4 list-disc">

                    {student.teamMembers.map((m, idx) => (
                      <li key={idx}>{m.name}</li>
                    ))}

                  </ul>
                </>
              )}

            </div>

          ))}

        </div>

      ))}

    </div>

  );
};

export default AdminEventRegistrations;
