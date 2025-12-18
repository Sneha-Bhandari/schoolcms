import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import AddStudentForm from "./AddStudentForm";
import ViewTestimonialData from "./ViewTestimonialData";
import EditTestimonialData from "./EditTestimonialData";

function TestimonialComponent({ initialData }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState("down"); 
  const [showAddForm, setShowAddForm] = useState(false);

  const menuRef = useRef(null);

  const [imageList, setImageList] = useState(
    initialData || [
      {
        imageid: "/stuone.jpg",
        name: "Sample Image 1",
        grade: "Grade 8 Student",
        rating: 4,
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        imageid: "/stutwo.jpg",
        name: "Sample Image 2",
        grade: "Grade 10 Student",
        rating: 5,
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        imageid: "/stuthree.jpeg",
        name: "Sample Image 3",
        grade: "Grade 7 Student",
        rating: 3,
        description: "Lorem ipsum dolor sit amet.",
      },
      {
        imageid: "/stufour.jpg",
        name: "Sample Image 4",
        grade: "Grade 9 Student",
        rating: 4,
        description: "Lorem ipsum dolor sit amet.",
      },
    ]
  );

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const toggleMenu = (index, event) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
      return;
    }

    setOpenMenuIndex(index);

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;

    if (spaceBelow < 150) {
      setMenuPosition("up");
    } else {
      setMenuPosition("down");
    }
  };

  const handleDelete = (index) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
    toast.success("Deleted successfully!");
  };

  return (
    <div className="md:w-11/12 w-full flex flex-col items-center justify-center md:ml-16 ml-0 py-12 mx-auto">
      {showAddForm && (
        <AddStudentForm
          onSubmit={(newStudent) => {
            setImageList([...imageList, newStudent]);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="pt-16 bg-white flex flex-col gap-4 p-4 sm:p-6 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="ml-2 sm:ml-0">
            <h3 className="text-3xl sm:text-4xl font-semibold text-[#0B0C28]">
              Voices of Our Students
            </h3>
            <p className="text-xs sm:text-sm font-thin">
              Image, Name, Grade, Description and Rating
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#0B0C28] hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-xl cursor-pointer"
          >
            Add More Students
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-3 border border-gray-300">Image</th>
                <th className="p-2 sm:p-3 border border-gray-300">Name</th>
                <th className="p-2 sm:p-3 border border-gray-300">Grade</th>
                <th className="p-2 sm:p-3 border border-gray-300">Rating</th>
                <th className="p-2 sm:p-3 border border-gray-300">
                  Description
                </th>
                <th className="p-2 sm:p-3 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {imageList.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-200 text-center"
                >
                  <td className="p-2 sm:p-3 border border-gray-300">
                    <img
                      src={item.imageid}
                      className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="p-2 sm:p-3 border border-gray-300">
                    {item.name}
                  </td>
                  <td className="p-2 sm:p-3 border border-gray-300">
                    {item.grade}
                  </td>
                  <td className="p-2 sm:p-3 border border-gray-300">
                    {item.rating}
                  </td>
                  <td className="p-2 sm:p-3 border border-gray-300 truncate max-w-[200px] sm:max-w-[250px]">
                    {item.description}
                  </td>

                  <td className="p-2 sm:p-3 border border-gray-300 relative">
                    <button
                      onClick={(e) => toggleMenu(index, e)}
                      className="p-1 sm:p-2 hover:bg-gray-800 rounded-full cursor-pointer bg-[#0B0C28] text-white"
                    >
                      <PiDotsThreeOutlineVerticalFill size={18} />
                    </button>

                    {openMenuIndex === index && (
                      <div>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuIndex(null)}
                        />
                        <div
                          ref={menuRef}
                          className={`absolute right-0 ${
                            menuPosition === "down" ? "top-8" : "bottom-8"
                          } sm:right-4 shadow-lg border rounded-md w-28 bg-white z-20`}
                        >
                          <button
                            onClick={() => {
                              setViewData(item);
                              setOpenMenuIndex(null);
                            }}
                            className="w-full px-2 sm:px-4 py-2 text-left hover:bg-[#0B0C28] hover:text-white"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setEditData({ ...item, index });
                              setOpenMenuIndex(null);
                            }}
                            className="w-full px-2 sm:px-4 py-2 text-left hover:bg-[#0B0C28] hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="w-full px-2 sm:px-4 py-2 text-left text-red-600 hover:bg-[#0B0C28] hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewData && (
        <ViewTestimonialData
          item={viewData}
          onClose={() => setViewData(null)}
        />
      )}

      {editData && (
        <EditTestimonialData
          data={editData}
          onUpdate={(updatedData) => {
            const updatedList = [...imageList];
            updatedList[editData.index] = updatedData;
            setImageList(updatedList);
          }}
          onClose={() => setEditData(null)}
        />
      )}
    </div>
  );
}

export default TestimonialComponent;
