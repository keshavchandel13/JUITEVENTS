import { useEffect, useState } from "react";
// import { getRegistrationCounts } from "../api/createevent";

export default function Registration() {

  const [counts, setCounts] = useState([]);

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    // const data = await getRegistrationCounts();
    setCounts(data);
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Registration Counts</h2>

      {counts.map((item) => (
        <div key={item._id} className="border p-4 mb-2">

          Event ID: {item._id} <br />
          Registrations: {item.count}

        </div>
      ))}

    </div>
  );
}