import React, { useState, useEffect } from "react";
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


  useEffect(() => {
    if (viewItem || editItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [viewItem, editItem]);

  const handleUpdate = (updated) => {
    setItems((prev) =>
      prev.map((i) => (i.id === editId ? { ...i, ...updated } : i))
    );
    setEditId(null);
  };

  return (
    <div className="pb-12 w-11/12 mx-auto space-y-6">

      <div>
        <h2 className="text-xl font-semibold underline">
          Vision & Mission Details
        </h2>
        <p className="text-sm text-gray-500">
          This is the main vision and mission content
        </p>
      </div>

      <div className="overflow-x-auto border rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {["Image", "Icon", "Title", "Description", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-sm">

                <td className="px-5 py-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                </td>

                <td className="px-5 py-3">
                  <div
                    className="w-8 h-8 text-blue-600"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </td>

                <td className="px-5 py-3 font-semibold">
                  {item.title}
                </td>

                <td className="px-5 py-3 text-gray-600 line-clamp-2">
                  {item.description}
                </td>

                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewId(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-xs px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditId(item.id)}
                      className="bg-[#0B0C28] hover:bg-[#1e1f4d] text-white text-xs px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
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
