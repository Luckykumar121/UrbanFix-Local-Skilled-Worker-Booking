import { useEffect, useState } from "react";
import axios from "axios";

function Category_count() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/workers/category-counts",
      );

      // convert array → object
      const data = {};
      res.data.forEach((item) => {
        data[item._id] = item.count;
      });

      setCounts(data);
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <h3>Categories</h3>

      <button>Plumber ({counts.plumber || 0})</button>

      <button>Electrician ({counts.electrician || 0})</button>

      <button>Carpenter ({counts.carpenter || 0})</button>
      <button>Painter ({counts.painter || 0})</button>
      <button>Mechanic ({counts.mechanic || 0})</button>
      <button>AC_Repair({counts.ac_repair || 0})</button>
    </div>
  );
}

export default Category_count;
