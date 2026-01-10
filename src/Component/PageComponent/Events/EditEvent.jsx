import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditEvent({ item, onClose, onUpdate }) {
  const [image, setImage] = useState(item.image);

  if (!item) return null;
  const handleSubmit = (values) => {
    const updatedEvent = {
      ...item,
      ...values,
      image,
    };
  alert("Click Ok if you want to save this edited data");
    console.log("EDITED EVENT DATA 👉", updatedEvent); 
  
    onUpdate(updatedEvent);
    toast.success("Event updated successfully!");
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 h-full">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto h-11/12 overflow-scroll">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Event</h2>
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
            date: item.date,
            author: item.author,
            description: item.description,
          }}
          validationSchema={EventSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Image
                </label>

                <label
                  htmlFor="edit-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Event"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                </label>

                <input
                  id="edit-image"
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
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
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
                    <option value="Upcoming">Upcoming</option>
                    <option value="Current">Current</option>
                    <option value="Past">Past</option>
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
                <label className="text-sm font-medium mb-2">Author *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="author"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">
                  Description *
                </label>

                <JoditEditor
                  value={values.description}
                  onBlur={(content) =>
                    setFieldValue("description", content)
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white px-6 py-3 rounded-xl"
                >
                  Update Event
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
