import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdVisibility } from "react-icons/md";
import Pagination from "../../Ui/Pagination";
import ViewBlog from "./ViewBlog";
import EditBlog from "./EditBlog";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogsTable() {
  const navigate = useNavigate();
  const params = useParams();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [blogsData, setBlogsData] = useState([
    {
      id: 1,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
      blogimageid: "/aca2.jpg",
      
    },
    {
      id: 2,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
      blogimageid: "/aca2.jpg",
      
    },
    {
      id: 3,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
        blogimageid: "/aca2.jpg",
      
    },
    {
      id: 4,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
        blogimageid: "/aca2.jpg",
      
    },
    {
      id: 5,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
        blogimageid: "/aca2.jpg",
      
    },
    {
      id: 6,
      title: "Annual Sports Meet 2025",
      blogcategory: "Sports",
      blogdate: "2025-10-15",
      blogsupervisor: "Mr. Rajesh Shrestha",
      blogvenue: "School Playground",
      blogdescription:
        "Students showcased their athletic skills in a spirited competition Lorem hfgqyejafxzy uweyrgfzyejxf jqywefhns",
        blogimageid: "/aca2.jpg",
      
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
    setBlogsData((prev) => prev.filter((m) => m.id !== id));
    setOpen(false);
    setSelectedId(null);
    setConfirmDeleteId(null);
  };

  const getStatusColor = (blogcategory) => {
    switch (blogcategory?.toLowerCase()) {
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
      <div className="flex  flex-col md:justify-start md:items-start gap-2 justify-center items-center mb-6">
        <h2 className="text-2xl font-semibold underline underline-offset-2 text-gray-800">
          Blogs & Updates
        </h2>
        <p className="text-gray-500 text-xs">
          This section includes image, title, category, date, supervisor, venue, description
        </p>
      </div>
        <button
          onClick={() => navigate("/addblog")}
          className="bg-linear-to-r from-[#0B0C28] to-cyan-400 mb-5 cursor-pointer text-white font-semibold py-2.5 px-6 rounded-lg"
        >
          Add Blog
        </button>

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
                    src={blog.blogimageid}
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
                        blog.blogcategory
                      )}`}
                    >
                      {blog.blogcategory}
                    </span>
                  </td>

                <td className="py-3 px-3 text-gray-600">
                  {new Date(blog.blogdate).toLocaleDateString()}
                </td>

                <td className="py-3 px-3 text-gray-700">
                  {blog.blogsupervisor}
                </td>

                <td className="py-3 px-3 text-gray-700">
                  {blog.blogvenue}
                </td>

                <td className="py-3 px-3 text-gray-600 max-w-xs">
                  <div className="line-clamp-2">
                    {truncate(blog.blogdescription)}
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
              setConfirmDeleteId(selectedId);
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

{confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold cursor-pointer"
              >
                Yes
              </button>

              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold cursor-p"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}