import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const FacilitySchema = Yup.object().shape({
  icon: Yup.string().required("SVG icon is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function AddItems() {
  const navigate = useNavigate();
  const [iconPreview, setIconPreview] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    const newFacility = {
      id: Date.now(),
      ...values,
    };

    console.log("New Facility 👉", newFacility);
    toast.success("Facility added successfully!");

    resetForm();
    setIconPreview("");
    navigate("/details");
  };

  return (
    <div className="w-11/13 mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Facility</h2>
          <button
            onClick={() => navigate("/details")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            icon: "",
            title: "",
            description: "",
          }}
          validationSchema={FacilitySchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  SVG Icon *
                </label>

                <Field
                  as="textarea"
                  name="icon"
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3 font-mono text-sm"
                  placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...></svg>"
                  onChange={(e) => {
                    setFieldValue("icon", e.target.value);
                    setIconPreview(e.target.value);
                  }}
                />

                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {iconPreview && (
                  <div className="mt-3 border rounded-lg p-4 flex justify-center">
                    <div
                      className="w-12 h-12"
                      dangerouslySetInnerHTML={{ __html: iconPreview }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Title *
                </label>
                <Field
                  name="title"
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Enter title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description *
                </label>
                <JoditEditor
                  value={values.description}
                  onBlur={(content) =>
                    setFieldValue("description", content)
                  }
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
                  className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white px-6 py-3 rounded-xl"
                >
                  Add Facility
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/details")}
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
