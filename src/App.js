import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = id => {
    const newTour = tours.filter(tour => tour.id !== id);
    setTours(newTour);
  };
  const getTourData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.error("error occured while fetching data", error);
      setLoading(true);
      setTours([]);
    }
  };
  useEffect(() => {
    getTourData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button onClick={() => getTourData()} className="btn">
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return <main>{<Tours removeTour={removeTour} tours={tours} />}</main>;
}

export default App;
