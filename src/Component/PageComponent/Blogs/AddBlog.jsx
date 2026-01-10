import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const BlogSchema = Yup.object().shape({
  // image: Yup.mixed().required("Image is required"),
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
  supervisor: Yup.string().required("Supervisor is required"),
  venue: Yup.string().required("Venue is required"),
  description: Yup.string().required("Description is required"),
});

export default function AddBlog() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    const newBlog = { ...values, image };
    alert("Click OK to add this blog");
    console.log("New Blog Data 👉", newBlog);
    toast.success("Blog added successfully!");
    resetForm();
    setImage(null);
    setPreview(null);
    navigate("/blogs/bloglist");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Blog</h2>
          <button
            onClick={() => navigate("/blogs/bloglist")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            category: "",
            date: "",
            supervisor: "",
            venue: "",
            description: "",
            image: null,
          }}
          validationSchema={BlogSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blog Image *
                </label>
                <label
                  htmlFor="blog-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                </label>

                <input
                  id="blog-image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setImage(file); // ✅ store File
                    setPreview(URL.createObjectURL(file)); // ✅ preview only
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Title *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2">Category *</label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Cultural">Technology</option>
                    <option value="Cultural">Field Visit</option>
                    <option value="Academic">Art</option>
                    <option value="Cultural">Exhibitions</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2">Date *</label>
                  <Field
                    type="date"
                    name="date"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Supervisor *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="supervisor"
                />
                <ErrorMessage
                  name="supervisor"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Venue *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="venue"
                />
                <ErrorMessage
                  name="venue"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">
                  Description *
                </label>
                <JoditEditor
                  value={values.description}
                  onBlur={(content) => setFieldValue("description", content)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white px-4 py-3 rounded-xl"
                >
                  Add Blog
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/blogs/bloglist")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
