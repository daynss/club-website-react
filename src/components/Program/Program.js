import React from "react";
import EventCard from "./EventCard";
import events from "../Data/data";

const Program = () => {
  const eventCards = events.map((evt) => <EventCard key={evt.id} evt={evt} />);
  return (
    <div className="program-outline">
      <h2>August 2022</h2>
      {eventCards}
    </div>
  );
};

export default Program;
