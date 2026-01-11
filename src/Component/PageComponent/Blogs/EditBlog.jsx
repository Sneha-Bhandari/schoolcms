import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";
import { ImSpinner2 } from "react-icons/im";
import { Toaster } from "react-hot-toast";

const BlogSchema = Yup.object().shape({
  image: Yup.mixed().required("Required"),
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
  supervisor: Yup.string().required("Supervisor is required"),
  venue: Yup.string().required("Venue is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditBlog({ item, onClose, onUpdate }) {
  const [image, setImage] = useState(item.image);

  if (!item) return null;

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
  
      const updatedBlog = { ...item, ...values, image };
      console.log("Edited Blog Data ", updatedBlog);
  
      await new Promise((res) => setTimeout(res, 1200));
  
      toast.success("Blog updated successfully!", {
        duration: 3000,
        style: { zIndex: 99999 },
      });
  
      setTimeout(() => {
        onUpdate(updatedBlog);
        onClose();
      }, 500);
    } catch (error) {
      toast.error("Failed to update blog", { style: { zIndex: 99999 } });
    } finally {
      setLoading(false);
    }
  };
  
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 h-full">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto h-11/12 overflow-scroll">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Blog</h2>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            title: item.title,
            category: item.category,
            image:item.image,
            date: item.date,
            supervisor: item.supervisor,
            venue: item.venue,
            description: item.description,
          }}
          validationSchema={BlogSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blog Image
                </label>
                <label
                  htmlFor="edit-blog-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Blog"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                </label>
                <input
                  id="edit-blog-image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setImage(URL.createObjectURL(file));
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
                </div>
                <div>
                  <label className="text-sm font-medium mb-2">Date *</label>
                  <Field
                    type="date"
                    name="date"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Supervisor *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="supervisor"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Venue *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="venue"
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
              </div>

              <div className="flex gap-3 pt-4">
              <button
  type="submit"
  disabled={loading}
  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white
    ${loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-linear-to-r from-[#0B0C28] to-cyan-400"
    }`}
>
  {loading ? (
    <>
      <ImSpinner2 className="animate-spin text-lg" />
      Updating...
    </>
  ) : (
    "Update Blog"
  )}
</button>

                <button
                  type="button"
                  onClick={onClose}
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
