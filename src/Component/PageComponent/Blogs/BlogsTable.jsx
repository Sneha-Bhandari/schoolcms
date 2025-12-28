import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
import ViewBlog from "./ViewBlog";
import EditBlog from "./EditBlog";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogsTable() {
  const navigate = useNavigate();
  const params = useParams();

  const [blogsData, setBlogsData] = useState([
    {
      id: 1,
      title: "Annual Sports Meet 2025",
      category: "Sports",
      date: "2025-10-15",
      supervisor: "Mr. Rajesh Shrestha",
      venue: "School Playground",
      description:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
      image: "/aca2.jpg",
    },
    {
      id: 2,
      title: "Science Exhibition Highlights",
      category: "Technology",
      date: "2025-08-05",
      supervisor: "Mrs. Sita Gurung",
      venue: "Main Hall",
      description:
        "Students presented innovative science models that impressed visitors...",
      image: "/aca2.jpg",
    },
    {
      id: 3,
      title: "Science Exhibition Highlights",
      category: "Field Visit",
      date: "2025-08-05",
      supervisor: "Mrs. Sita Gurung",
      venue: "Main Hall",
      description:
        "Students presented innovative science models that impressed visitors...",
      image: "/aca2.jpg",
    },
    {
      id: 4,
      title: "Science Exhibition Highlights",
      category: "Arts",
      date: "2025-08-05",
      supervisor: "Mrs. Sita Gurung",
      venue: "Main Hall",
      description:
        "Students presented innovative science models that impressed visitors...",
      image: "/aca2.jpg",
    },
    {
      id: 5,
      title: "Science Exhibition Highlights",
      category: "Exhibition",
      date: "2025-08-05",
      supervisor: "Mrs. Sita Gurung",
      venue: "Main Hall",
      description:
        "Students presented innovative science models that impressed visitors...",
      image: "/aca2.jpg",
    },
    {
      id: 6,
      title: "Science Exhibition Highlights",
      category: "Cultural",
      date: "2025-08-05",
      supervisor: "Mrs. Sita Gurung",
      venue: "Main Hall",
      description:
        "Students presented innovative science models that impressed visitors...",
      image: "/aca2.jpg",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);

  const selectedViewItem = blogsData.find((m) => m.id === viewId);
  const selectedEditItem = blogsData.find((m) => m.id === editId);

  const totalPages = Math.ceil(blogsData.length / itemsPerPage);
  const paginatedBlogs = blogsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!params.id) return;
    const id = parseInt(params.id);

    if (window.location.pathname.includes("/bloglist/view")) setViewId(id);
    if (window.location.pathname.includes("/bloglist/edit/")) setEditId(id);
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
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogsData((prev) => prev.filter((m) => m.id !== id));
      setOpen(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (category) => {
    switch (category?.toLowerCase()) {
      case "sports":
        return "bg-blue-100 text-blue-700";
      case "technology":
        return "bg-green-100 text-green-700";
        case "arts":
          return "bg-red-100 text-gray-700";
          case "exhibition":
        return "bg-teal-100 text-gray-700";
        case "cultural":
        return "bg-pink-200 text-gray-700";
        case "field visit":
        return "bg-yellow-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const truncate = (t, max = 100) =>
    t?.length > max ? t.substring(0, max) + "..." : t;

  return (
    <div className="w-full py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blogs & Stories</h2>

        <button
          onClick={() => navigate("/addblog")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg"
        >
          Add Blog
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
                "Supervisor",
                "Venue",
                "Description",
                "Actions",
              ].map((h, i) => (
                <th
                  key={i}
                  className="py-4 px-5 text-center text-xs font-semibold uppercase text-gray-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 text-center">
                <td className="py-3 px-5">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                </td>

                <td className="py-3 px-1 font-medium text-gray-800 truncate max-w-40">
                  {blog.title}
                </td>

                <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        blog.category
                      )}`}
                    >
                      {blog.category}
                    </span>
                  </td>

                <td className="py-3 px-3 text-gray-600">
                  {new Date(blog.date).toLocaleDateString()}
                </td>

                <td className="py-3 px-3 text-gray-700">
                  {blog.supervisor}
                </td>

                <td className="py-3 px-3 text-gray-700">
                  {blog.venue}
                </td>

                <td className="py-3 px-3 text-gray-600 max-w-xs">
                  <div className="line-clamp-2">
                    {truncate(blog.description)}
                  </div>
                </td>

                <td className="py-3 px-3 relative">
                  <button
                    onClick={(e) => toggleDropdown(e, blog.id)}
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

      {blogsData.length > itemsPerPage && (
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
            onClick={() => navigate(`/blogs/bloglist/view/${selectedId}`)}
            className="w-full px-4 py-2 flex gap-2 text-blue-700 items-center"
          >
            <MdVisibility /> View
          </button>

          <button
            onClick={() => navigate(`/blogs/bloglist/edit/${selectedId}`)}
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

      {selectedViewItem && (
        <ViewBlog
          item={selectedViewItem}
          onClose={() => {
            setViewId(null);
            navigate("/blogs/bloglist");
          }}
        />
      )}

      {selectedEditItem && (
        <EditBlog
          item={selectedEditItem}
          onUpdate={(updated) =>
            setBlogsData((prev) =>
              prev.map((m) => (m.id === updated.id ? updated : m))
            )
          }
          onClose={() => {
            setEditId(null);
            navigate("/blogs/bloglist");
          }}
        />
      )}
    </div>
  );
}