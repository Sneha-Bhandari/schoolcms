import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Ui/Pagination";

export default function EventsTable() {
  const navigate = useNavigate();


  const [eventsData] = useState([
    {
      id: 1,
      title: "Tech Conference 2025",
      eventstatus: "Active",
      eventdate: "2025-01-05",
      eventlocation: "Birgunj",
      eventdescription: "A major tech event with speakers from all over Nepal.",
      eventimageid: { imageurl: "https://via.placeholder.com/150" }
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      eventstatus: "Upcoming",
      eventdate: "2025-02-12",
      eventlocation: "Kathmandu",
      eventdescription: "Learn full-stack development in 2 weeks.",
      eventimageid: { imageurl: "https://via.placeholder.com/150" }
    },
    {
      id: 3,
      title: "Design Workshop",
      eventstatus: "Completed",
      eventdate: "2024-12-10",
      eventlocation: "Pokhara",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: { imageurl: "https://via.placeholder.com/150" }
    },
    {
      id: 4,
      title: "Design Workshop",
      eventstatus: "Completed",
      eventdate: "2024-12-10",
      eventlocation: "Pokhara",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: { imageurl: "https://via.placeholder.com/150" }
    },
    {
      id: 5,
      title: "Design Workshop",
      eventstatus: "Completed",
      eventdate: "2024-12-10",
      eventlocation: "Pokhara",
      eventdescription: "A creative workshop focusing on UI/UX.",
      eventimageid: { imageurl: "https://via.placeholder.com/150" }
    }
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 3;

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

  const totalPages = Math.ceil(eventsData.length / itemsPerPage);
  const paginatedEvents = eventsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleDropdown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left - 100
    });
    if (open && selectedId === id) {
      setOpen(false);
      setSelectedId(null);
    } else {
      setOpen(true);
      setSelectedId(id);
    }
  };


  const handleDelete = (id) => {
    console.log("Deleting event with id:", id);
    setShowDeleteModal(false);
    setOpen(false);
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "—";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="w-full py-8 relative">
      <div>
      
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Events & Updates</h2>
          <button
            onClick={() => navigate("/addevent")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-200"
          >
            Add Event
          </button>
        </div>


        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Image", "Title", "Status", "Date", "Location", "Description", "Actions"].map(
                  (header, i) => (
                    <th
                      key={i}
                      className={`py-4 px-5 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 ${
                        header === "Actions" ? "text-center" : ""
                      }`}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 text-sm">
                  <td className="py-3 px-5">
                    <img
                      src={event.eventimageid.imageurl}
                      alt={event.title}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  </td>

                  <td className="py-3 px-5 font-medium text-gray-800 max-w-xs truncate">
                    {event.title}
                  </td>

                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        event.eventstatus
                      )}`}
                    >
                      {event.eventstatus}
                    </span>
                  </td>

                  <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                    {new Date(event.eventdate).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-5 text-gray-700">{event.eventlocation}</td>

                  <td className="py-3 px-5 text-gray-600 max-w-xs">
                    <div className="line-clamp-2">{truncateDescription(event.eventdescription)}</div>
                  </td>

                 
                  <td className="py-3 px-3 text-center relative">
                    <button
                      onClick={(e) => toggleDropdown(e, event.id)}
                      className="dropdown-button inline-flex items-center justify-center h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition duration-200"
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
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
       
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-2xl w-[60vh] shadow-2xl border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Event
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Are you sure you want to delete this event?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete(selectedId)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {open && (
          <div
            className="dropdown-menu fixed z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1"
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
          >
            <button
              onClick={() => {
                navigate(`/events/view/${selectedId}`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-blue-700 text-sm"
            >
              <MdVisibility size={16} /> View
            </button>

            <button
              onClick={() => {
                navigate(`/events/edit/${selectedId}`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-green-700 text-sm"
            >
              <MdEdit size={16} /> Edit
            </button>

            <button
              onClick={() => {
                setShowDeleteModal(true);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-red-600 text-sm"
            >
              <MdDelete size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}