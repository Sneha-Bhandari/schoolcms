import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import JoditEditor from "jodit-react";

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  eventcategory: Yup.string().required("Category is required"),
  eventdate: Yup.date().required("Date is required"),
  eventauthor: Yup.string().required("Author is required"),
  eventdescription: Yup.string().required("Description is required"),
  imageid: Yup.number().required("Image is required"),
});

export default function EditEvent({ item, onClose, onUpdate }) {
  const [imagePreview, setImagePreview] = useState(item?.imageUrl);

  if (!item) return null;

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const id = Date.now();

    setImagePreview(url);
    setFieldValue("imageUrl", url);
    setFieldValue("imageid", id);
  };

  const handleSubmit = (values) => {
    const updatedEvent = {
      ...item,
      title: values.title,
      eventcategory: values.eventcategory,
      eventdate: values.eventdate,
      eventauthor: values.eventauthor,
      eventdescription: values.eventdescription,

      imageUrl: values.imageUrl,
      imageid: values.imageid,
    };

    console.log("UPDATED EVENT:", updatedEvent);

    onUpdate(updatedEvent);
    toast.success("Event updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button onClick={onClose}>
            <div className="bg-red-500 text-white rounded-full p-1.5 hover:bg-black transition">
              <MdClose size={20} />
            </div>
          </button>
        </div>

        <div className="p-6">
          <Formik
            enableReinitialize
            initialValues={{
              title: item.title || "",
              eventcategory: item.eventcategory || "",
              eventdate: item.eventdate || "",
              eventauthor: item.eventauthor || "",
              eventdescription: item.eventdescription || "",
              imageUrl: item.imageUrl || "",
              imageid: item.imageid || "",
            }}
            validationSchema={EventSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Image *
                  </label>

                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 mx-auto rounded-lg object-cover mb-3"
                      />
                    )}

                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
                      <BsImages /> Change Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                    </label>

                    <ErrorMessage
                      name="imageid"
                      component="div"
                      className="text-red-600 text-sm mt-2"
                    />
                  </div>
                </div>

         
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Title *
                  </label>
                  <Field
                    name="title"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                   <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Author *
                  </label>
                  <Field
                    name="eventauthor"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                   <ErrorMessage
                  name="eventauthor"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Category *
                  </label>
                  <Field
                    as="select"
                    name="eventcategory"
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
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
                  <label className="block text-sm font-semibold mb-1">
                    Date *
                  </label>
                  <Field
                    type="date"
                    name="eventdate"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                   <ErrorMessage
                  name="eventdate"
                  component="div"
                  className="text-red-500 text-sm"
                />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Description *
                  </label>

                  <JoditEditor
                    value={values.eventdescription}
                    onBlur={(content) =>
                      setFieldValue("eventdescription", content)
                    }
                  />

                  <ErrorMessage
                    name="eventdescription"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-linear-to-r from-[#0B0C28] to-cyan-400 cursor-pointer text-white px-4 py-2.5 rounded-lg"
                  >
                    Update Event
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2.5 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
