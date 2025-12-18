import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdCalendarToday, MdLocationOn } from "react-icons/md";

export default function ViewEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  const eventsData = [
    {
      id: "1",
      title: "Tech Conference 2025",
      eventstatus: "Active",
      eventdate: "2025-01-05",
      eventlocation: "Birgunj",
      eventdescription: "A major tech event with speakers from all over Nepal.",
      eventimageid: { imageurl: "https://via.placeholder.com/600x400" }
    },
    {
      id: "2",
      title: "Coding Bootcamp",
      eventstatus: "Upcoming",
      eventdate: "2025-02-12",
      eventlocation: "Kathmandu",
      eventdescription: "Learn full-stack development in 2 weeks.",
      eventimageid: { imageurl: "https://via.placeholder.com/600x400" }
    },
    {
      id: "3",
      title: "Design Workshop",
      eventstatus: "Completed",
      eventdate: "2024-12-10",
      eventlocation: "Pokhara",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: { imageurl: "https://via.placeholder.com/600x400" }
    }
  ];

  useEffect(() => {
    const foundEvent = eventsData.find((e) => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  if (!event) return <p>Event not found</p>;

  return (
    <div className="w-full py-10 px-4 md:px-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <MdArrowBack size={18} /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 flex flex-col gap-6">
        {/* Event Image */}
        <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
          {event.eventimageid?.imageurl ? (
            <img
              src={event.eventimageid.imageurl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <MdArrowBack size={48} />
            </div>
          )}
        </div>

        {/* Event Content */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>

          <p className="text-gray-600 whitespace-pre-line">
            {event.eventdescription || "No description provided."}
          </p>

          <div className="flex justify-between text-gray-500 text-sm items-center">
            <div className="flex items-center gap-2">
              <MdCalendarToday size={16} />{" "}
              {new Date(event.eventdate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn size={16} /> {event.eventlocation}
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
              Status: {event.eventstatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}