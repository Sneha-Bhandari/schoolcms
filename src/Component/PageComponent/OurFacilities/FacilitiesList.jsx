import React, { useState } from "react";
import ViewFacilities from "./ViewFacilities";
import EditFacilities from "./EditFacilities";
import AddFacilities from "./AddFacilities";
import { useNavigate } from "react-router-dom";
const defaultFacilities = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14.25c2.5 0 4.5-2 4.5-4.5S14.5 5.25 12 5.25 7.5 7.25 7.5 9.75s2 4.5 4.5 4.5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 14.25H9c-3.3 0-6 2.7-6 6h18c0-3.3-2.7-6-6-6z"
        />
      </svg>
    ),
    title: "Safety First",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-green-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12M6 12h12"
        />
      </svg>
    ),
    title: "Regular Classes",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-purple-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5h15M4.5 4.5h15M9 4.5v15m6-15v15"
        />
      </svg>
    ),
    title: "Certified Teachers",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Sufficient Classrooms",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Creative Lessons",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 6,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        className="w-12 h-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"
        />
      </svg>
    ),
    title: "Sports Facilities",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
];

export default function FacilitiesList() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedItem = facilities.find((i) => i.id === viewId);
  const selectedEditItem = facilities.find((i) => i.id === editId);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      setFacilities((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleUpdate = (updated) => {
    setFacilities((prev) =>
      prev.map((item) => (item.id === editId ? { ...item, ...updated } : item))
    );
    setEditId(null);
  };

  const normalizeSvg = (svg) => {
    if (!svg) return svg;

    return svg
      .replace(/width="[^"]*"/gi, "")
      .replace(/height="[^"]*"/gi, "")
      .replace(/fill="[^"]*"/gi, 'fill="none"')
      .replace(
        "<svg",
        `<svg class="w-12 h-12 text-blue-600" stroke="currentColor" preserveAspectRatio="xMidYMid meet"`
      );
  };

  return (
    <div className="w-11/12 mx-auto  flex flex-col md:ml-12 ml-0">
      <div className="w-full flex flex-col items-start  gap-3 mb-4">
        <h2 className="text-xl font-semibold underline">
          Facilities List Section
        </h2>
        <p className="text-sm text-gray-400">
          This Section includes SVG, Title and Description
        </p>
      </div>

      <div className="w-full flex md:justify-end justify-start">
        <button
      
          onClick={() => setShowAddForm(true)}
          className="bg-[#0B0C28] hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
        >
          Add More Facilities
        </button>
      </div>

      <div className=" md:w-full flex my-6 rounded-2xl shadow-2xl  mx-auto ">
        <div className="grid md:grid-cols-2  grid-cols-1 gap-2 px-6 py-8">
          {facilities.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white rounded-2xl border border-gray-200 
                           p-6 w-full flex flex-col items-start 
                           hover:shadow-xl transition-all duration-500"
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center">
                {typeof item.icon === "string" ? (
                  <div
                    className="w-12 h-12"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                ) : (
                  item.icon
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              <div
                className="text-sm text-gray-600 leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              <div
                className="absolute top-2 right-3 flex gap-1
             opacity-100 md:opacity-0
             translate-y-0 md:translate-y-3
             md:group-hover:opacity-100 md:group-hover:translate-y-0
             transition-all duration-300"
              >
                <button
                  onClick={() => {
                    navigate(`/ourfacilities/view/${item.id}`);
                    setViewId(item.id);  
                  }}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md cursor-pointer"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    navigate(`/ourfacilities/edit/${item.id}`);
                    setEditId(item.id);
                  }}
                  className="bg-[#0B0C28] text-white text-xs px-2 py-1 rounded-md cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-md cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
       <ViewFacilities
       item={selectedItem}
       onClose={() => {
         setViewId(null);
         navigate("/ourfacilities");
       }}
     />
     
      )}

      {selectedEditItem && (
        <EditFacilities
        item={selectedEditItem}
        onUpdate={handleUpdate}
        onClose={() => {
          setEditId(null);
          navigate("/ourfacilities");
        }}
      />
      )}
      {showAddForm && (
        <AddFacilities
          onSubmit={(values) => {
            const newFacility = {
              id: Date.now(),
              icon: normalizeSvg(values.svg),
              title: values.title,
              description: values.description,
            };

            setFacilities((prev) => [...prev, newFacility]);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
