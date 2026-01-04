import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  eventcategory: Yup.string().required("Category is required"),
  eventdate: Yup.date().required("Date is required"),
  eventauthor: Yup.string().required("Author is required"),
  eventdescription: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

export default function AddEvent() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

    const handleSubmit = (values, { resetForm }) => {
      if (!imagePreview) {
        toast.error("Please upload an image");
        return;
      }
    const newEvent = {
      id: Date.now(),
      title: values.title,
      eventcategory: values.eventcategory,
      eventdate: values.eventdate,
      eventauthor: values.eventauthor,
      eventdescription: values.eventdescription,
      eventimageid: imagePreview,
    };

    

    toast.success("Event added successfully!");
    resetForm();
    navigate("/events/eventlist");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Event
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Create a new event or update
            </p>
          </div>
          <button
            onClick={() => navigate("/events/eventlist")}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full"
          >
            Back to Events
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            eventcategory: "",
            eventdate: "",
            eventauthor: "",
            eventdescription: "",
            image: null,
          }}
          validationSchema={EventSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Title *
                </label>
                <Field
                  name="title"
                  className="w-full border rounded-lg px-4 py-3"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <Field
                    as="select"
                    name="eventcategory"
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select category</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Current">Current</option>
                    <option value="Past">Past</option>
                  </Field>
                  <ErrorMessage
                    name="eventcategory"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Date *
                  </label>
                  <Field
                    type="date"
                    name="eventdate"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                  <ErrorMessage
                    name="eventdate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Author *
                </label>
                <Field
                  name="eventauthor"
                  className="w-full border rounded-lg px-4 py-3"
                />
                <ErrorMessage
                  name="eventauthor"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>

                <JoditEditor
                  onBlur={(content) =>
                    setFieldValue("eventdescription", content)
                  }
                />

                <ErrorMessage
                  name="eventdescription"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Image *
                </label>

                {imagePreview ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-red-600 flex items-center gap-1"
                    >
                      <MdClose /> Remove
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed rounded-lg p-6 block text-center cursor-pointer">
                    <MdCloudUpload size={40} className="mx-auto mb-2" />
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, setFieldValue)
                      }
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                 type="submit"
                 
                  className="bg-[#0B0C28] hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/events/eventlist")}
                  className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-xl transition"
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
