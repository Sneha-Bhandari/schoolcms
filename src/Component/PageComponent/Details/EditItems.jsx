import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const FacilitySchema = Yup.object().shape({
  icon: Yup.string().required("SVG Icon is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditItems({ item, onUpdate, onClose }) {
  if (!item) return null;

  const handleSubmit = (values) => {
    const updatedItem = { ...item, ...values };
    alert("Click OK to save edited details");
    console.log("Edited Item :", updatedItem);
    onUpdate(updatedItem);
    toast.success("Facility updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 h-full">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto h-11/12 overflow-scroll">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Facility</h2>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            icon: item.icon,
            title: item.title,
            description: item.description,
          }}
          validationSchema={FacilitySchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">SVG Icon *</label>
                <Field
                  as="textarea"
                  name="icon"
                  rows={4}
                  className="border w-full p-2 rounded mb-2 font-mono text-xs resize-none"
                />
                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
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

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <JoditEditor
                  value={values.description}
                  onBlur={(content) => setFieldValue("description", content)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4 justify-start">
                <button
                  type="submit"
                  className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white px-4 py-3 rounded-xl"
                >
                  Update Facility
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
