import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
import ViewEvent from "./ViewEvent";
import EditEvent from "./EditEvent";
import { useNavigate, useParams } from "react-router-dom";

export default function EventsTable() {
  const navigate = useNavigate();
  const params = useParams();
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: "Highlights from the Annual Sports Day 2025",
      eventcategory: "Current",
      eventdate: "2025-01-05",
      eventauthor: "School Activities Team",
      eventdescription: "A major tech event with speakers from all over Nepal.",
      eventimageid: "/aca2.jpg",
    },
    {
      id: 2,
      title: "How Our Students Learn Beyond the Classroom",
      eventcategory: "Upcoming",
      eventdate: "2025-02-12",
      eventauthor: "School Activities Team",
      eventdescription: "Learn full-stack development in 2 weeks.",
      eventimageid: "/aca2.jpg",
    },
    {
      id: 3,
      title: "Design Workshop",
      eventcategory: "Current",
      eventdate: "2024-12-10",
      eventauthor: "School Activities Team",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: "/aca2.jpg",
    },
    {
      id: 4,
      title: "Design Workshop",
      eventcategory: "Past",
      eventdate: "2024-12-10",
      eventauthor: "School Activities Team",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: "/aca2.jpg",
    },
    {
      id: 5,
      title: "Design Workshop",
      eventcategory: "Upcoming",
      eventdate: "2024-12-10",
      eventauthor: "School Activities Team",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: "/aca2.jpg",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedViewItem = eventsData.find((m) => m.id === viewId);
  const selectedEditItem = eventsData.find((m) => m.id === editId);

  const itemsPerPage = 3;

  const totalPages = Math.ceil(eventsData.length / itemsPerPage);
  const paginatedEvents = eventsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);

    if (window.location.pathname.includes("/eventlist/view")) setViewId(id);
    if (window.location.pathname.includes("/eventlist/edit/")) setEditId(id);
  }, [params]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        !e.target.closest(".dropdown-button") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setOpen(false);
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleDropdown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left - 100,
    });
    setSelectedId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEventsData((prev) => prev.filter((m) => m.id !== id));
      setOpen(false); 
      setSelectedId(null);
    }
  };

  const getStatusColor = (category) => {
    switch (category?.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "current":
        return "bg-green-100 text-green-700";
      case "past":
        return "bg-red-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "—";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-full py-8 relative">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Events & Updates</h2>
          <button
            onClick={() => navigate("/addevent")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg"
          >
            Add Event
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Image",
                  "Title",
                  "Category",
                  "Date",
                  "Author",
                  "Description",
                  "Actions",
                ].map((header, i) => (
                  <th
                    key={i}
                    className={`py-4 px-5 text-center text-xs font-semibold uppercase text-gray-600 ${
                      header === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 text-start">
                  <td className="py-3 px-5">
                    <img
                      src={event.eventimageid}
                      alt={event.title}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="py-3 px-2 text-sm text-gray-800 truncate max-w-52 ">
                    {event.title}
                  </td>

                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        event.eventcategory
                      )}`}
                    >
                      {event.eventcategory}
                    </span>
                  </td>

                  <td className="py-3 px-5 text-gray-600">
                    {new Date(event.eventdate).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-5 text-gray-700  text-sm ">
                    {event.eventauthor}
                  </td>

                  <td className="py-3 px-5 text-gray-600 max-w-xs">
                    <div className="line-clamp-2">
                      {truncateDescription(event.eventdescription)}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center relative">
                    <button
                      onClick={(e) => toggleDropdown(e, event.id)}
                      className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-full"
                    >
                      <MdMoreVert size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {eventsData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {open && (
          <div
            className="dropdown-menu fixed z-50 w-40 bg-white border rounded-lg shadow"
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
          >
            <button
              onClick={() => navigate(`/events/eventlist/view/${selectedId}`)}
              className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
            >
              <MdVisibility /> View
            </button>

            <button
              onClick={() => navigate(`/events/eventlist/edit/${selectedId}`)}
              className="w-full px-4 py-2 flex gap-2 text-green-700 items-center"
            >
              <MdEdit /> Edit
            </button>

            <button
              onClick={() => {
                handleDelete(selectedId);
                setOpen(null);
              }}
              className="w-full px-4 py-2 flex gap-2 text-red-600 items-center"
            >
              <MdDelete /> Delete
            </button>
          </div>
        )}
      </div>

      {selectedViewItem && (
        <ViewEvent
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/events/eventlist");
          }}
        />
      )}

      {selectedEditItem && (
        <EditEvent
          item={selectedEditItem}
          onUpdate={(updated) =>
            setEventsData((prev) =>
              prev.map((m) => (m.id === updated.id ? updated : m))
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/events/eventlist");
          }}
        />
      )}
    </div>
  );
}
