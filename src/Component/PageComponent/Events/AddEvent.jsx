import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

export default function AddEvent() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    alert("Click Ok if you want to add event data")
    console.log("New Event Data:", values);

    toast.success("Event added successfully!");
    resetForm();
    setPreviews([]);
    navigate("/events/eventlist");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Event</h2>

          <button
            onClick={() => navigate("/events/eventlist")}
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
            author: "",
            description: "",
            images: [],
          }}
          validationSchema={EventSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Images *
                </label>

                <label
                  htmlFor="event-images"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md"
                >
                  <FcEditImage className="text-5xl text-gray-300" />
                </label>

                <input
                  id="event-images"
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (!files.length) return;

                    const newPreviews = files.map((file) =>
                      URL.createObjectURL(file)
                    );

                    setFieldValue("images", [...values.images, ...files]);
                    setPreviews((prev) => [...prev, ...newPreviews]);
                  }}
                />

                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                      <div
                        key={index}
                        className="relative h-28 border rounded-md overflow-hidden"
                      >
                        <img
                          src={src}
                          className="h-full w-full object-cover"
                          alt="preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const newImages = values.images.filter(
                              (_, i) => i !== index
                            );
                            const newPreviews = previews.filter(
                              (_, i) => i !== index
                            );

                            setFieldValue("images", newImages);
                            setPreviews(newPreviews);
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                        >
                          <MdClose size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                    <option value="Upcoming">Upcoming</option>
                    <option value="Current">Current</option>
                    <option value="Past">Past</option>
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
                <label className="text-sm font-medium mb-2">Author *</label>
                <Field
                  className="w-full border rounded-lg px-4 py-3"
                  name="author"
                />

                <ErrorMessage
                  name="author"
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
                  Create Event
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/events/eventlist")}
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
