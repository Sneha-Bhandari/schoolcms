import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  eventcategory: Yup.string().required("Category is required"),
  eventdate: Yup.string().required("Date is required"),
  eventauthor: Yup.string().required("Author is required"),
  eventdescription: Yup.string().required("Description is required"),
  imageid: Yup.number().required("Image is required"),
});

export default function AddEvent() {
  const navigate = useNavigate();

  const fileUpload = (file, setFieldValue) => {
    const id = Date.now();
    const url = URL.createObjectURL(file);

    setFieldValue("imageUrl", url);
    setFieldValue("imageid", id);
  };

  const handleSubmit = (values, { resetForm }) => {
    const newEvent = {
      title: values.title,
      eventcategory: values.eventcategory,
      eventdate: values.eventdate,
      eventauthor: values.eventauthor,
      eventdescription: values.eventdescription,
      imageUrl: values.imageUrl,
      imageid: values.imageid,
    };

    console.log("Submitted Event:", newEvent);

    toast.success("Event added successfully!");
    resetForm();
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
            eventcategory: "",
            eventdate: "",
            eventauthor: "",
            eventdescription: "",
            imageUrl: "",
            imageid: "",
          }}
          validationSchema={EventSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Image *
                </label>

                <label
                  htmlFor="event-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-52 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      className="h-full w-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                </label>

                <input
                  id="event-image"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    fileUpload(file, setFieldValue);
                  }}
                />

                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Title *</label>
                <Field className="w-full border rounded-lg px-4 py-3" name="title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2">Category *</label>
                  <Field as="select" name="eventcategory" className="w-full border rounded-lg px-4 py-3">
                    <option value="">Select</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Current">Current</option>
                    <option value="Past">Past</option>
                  </Field>
                  <ErrorMessage
                  name="eventdecategory"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2">Date *</label>
                  <Field type="date" name="eventdate" className="w-full border rounded-lg px-4 py-3" />
                  <ErrorMessage
                  name="eventdate"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Author *</label>
                <Field className="w-full border rounded-lg px-4 py-3" name="eventauthor" />
                <ErrorMessage
                  name="eventauthor"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2">Description *</label>

                <JoditEditor
                  value={values.eventdescription}
                  onBlur={(content) => setFieldValue("eventdescription", content)}
                />

                <ErrorMessage
                  name="eventdescription"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-linear-to-r from-[#0B0C28] to-cyan-400 cursor-pointer text-white px-4 py-3 rounded-xl"
                >
                  Create Event
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/events/eventlist")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl cursor-pointer"
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
