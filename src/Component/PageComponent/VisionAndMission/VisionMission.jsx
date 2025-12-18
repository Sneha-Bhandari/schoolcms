import React, { useState } from "react";
import ViewVisionMission from "./ViewVisionMission";
import EditVisionMission from "./EditVisionMission";

const defaultData = [
  {
    id: 1,
    type: "vision",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
    </svg>`,
    image: "/banner1.jpg",
    title: "Our Vision",
    description:
      "To be a leading institution in fostering innovation, critical thinking and global citizenship.",
  },
  {
    id: 2,
    type: "mission",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18"/>
    </svg>`,
    image: "/play.jpg",
    title: "Our Mission",
    description:
      "To empower students with knowledge, skills and values for lifelong success.",
  },
];

export default function VisionMission() {
  const [items, setItems] = useState(defaultData);
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const viewItem = items.find((i) => i.id === viewId);
  const editItem = items.find((i) => i.id === editId);

  const handleUpdate = (updated) => {
    setItems((prev) =>
      prev.map((i) => (i.id === editId ? { ...i, ...updated } : i))
    );
    setEditId(null);
  };

  return (
    <div className=" pb-12 w-11/12 flex flex-col items-center justify-center mx-auto space-y-8">
      <h2 className="text-xl font-semibold underline flex items-start w-full">
        Vision & Mission Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 shadow-2xl rounded-2xl  md:py-12 md:px-4 px-3 py-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group bg-white rounded-xl border-gray-200 border p-8 hover:shadow-xl transition cursor-pointer"
          >
            <img
              src={item.image}
              className="h-42 w-full object-cover rounded-lg mb-4"
            />
                <div className="flex gap-2">
                <div
              className="w-10 h-10 text-blue-600 mb-2"
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />

            <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
            
            <p className="text-sm text-gray-600 line-clamp-3">
              {item.description}
            </p>

            <div className="absolute top-1 right-8 flex gap-2  group-hover:opacity-100 transition">
              <button
                onClick={() => setViewId(item.id)}
                className="bg-gray-200 text-xs px-3 py-1 rounded cursor-pointer"
              >
                View
              </button>
              <button
                onClick={() => setEditId(item.id)}
                className="bg-[#0B0C28] text-white text-xs px-3 py-1 rounded cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewItem && (
        <ViewVisionMission
          item={viewItem}
          onClose={() => setViewId(null)}
          onEdit={() => {
            setEditId(viewItem.id);
            setViewId(null);
          }}
        />
      )}

      {editItem && (
        <EditVisionMission
          item={editItem}
          onUpdate={handleUpdate}
          onClose={() => setEditId(null)}
        />
      )}
    </div>
  );
}
