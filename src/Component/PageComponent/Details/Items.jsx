import React, { useState } from "react";
import ViewItems from "./ViewItems";
import EditItems from "./EditItems";

const defaultFacilities = [
  {
    id: 1,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25c2.5 0 4.5-2 4.5-4.5S14.5 5.25 12 5.25 7.5 7.25 7.5 9.75s2 4.5 4.5 4.5z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 14.25H9c-3.3 0-6 2.7-6 6h18c0-3.3-2.7-6-6-6z"/>
    </svg>`,
    title: "Certified Teachers",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 2,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12"/>
    </svg>`,
    title: "Special Education",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 3,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5h15M4.5 4.5h15M9 4.5v15m6-15v15"/>
    </svg>`,
    title: "Book & Library",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
  {
    id: 4,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17l3-3 3 3M12 14V21M12 3v6M4.5 12h15"/>
    </svg>`,
    title: "Sport Clubs",
    description:
      "Even the all-powerful Pointing has no control about the blind texts.",
  },
];

export default function Items() {
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedItem = facilities.find((i) => i.id === viewId);
  const selectedEditItem = facilities.find((i) => i.id === editId);

  const handleUpdate = (updated) => {
    setFacilities((prev) =>
      prev.map((item) => (item.id === editId ? { ...item, ...updated } : item))
    );
    setEditId(null);
  };

  return (
    <div className="w-full gap-12 flex flex-col mx-auto md:ml-6 my-6">
      <div>
        <h2 className="text-2xl font-semibold underline">Details Section</h2>
        <p className="text-sm text-gray-400">
          This Section includes SVG, Title and Description
        </p>
      </div>

      <div className="shadow-2xl rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-11/12 mx-auto py-12">
          {facilities.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white rounded-xl p-6 border hover:shadow-xl transition"
            >
              <div className="h-[150px] flex flex-col justify-between">
                <div
                  className="w-12 h-12 text-blue-600"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />

                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>

              <div className="absolute top-3 right-3 flex gap-2  group-hover:opacity-100 transition">
                <button
                  onClick={() => setViewId(item.id)}
                  className="bg-gray-200 text-xs px-3 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => setEditId(item.id)}
                  className="bg-[#0B0C28] text-white text-xs px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <ViewItems
          item={selectedItem}
          onClose={() => setViewId(null)}
          onEdit={() => {
            setEditId(selectedItem.id);
            setViewId(null);
          }}
        />
      )}

      {selectedEditItem && (
        <EditItems
          item={selectedEditItem}
          onUpdate={handleUpdate}
          onClose={() => setEditId(null)}
        />
      )}
    </div>
  );
}
