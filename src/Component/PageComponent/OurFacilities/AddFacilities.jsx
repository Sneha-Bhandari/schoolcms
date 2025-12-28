import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FacilitySchema = Yup.object().shape({
  svg: Yup.string().required("SVG code is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function AddFacilities({ initialValues, onSubmit, onCancel }) {
  const editor = useRef(null);
  const [svgPreview, setSvgPreview] = useState(initialValues?.svg || "");
  const navigate = useNavigate();
  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {initialValues ? "Edit Facility" : "Add New Facility"}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {initialValues
                ? "Update facility details"
                : "Create a new facility"}
            </p>
          </div>
          <button
            onClick={() => navigate("/ourfacilities")}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full"
          >
            Back
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={
            initialValues || {
              svg: "",
              title: "",
              description: "",
            }
          }
          validationSchema={FacilitySchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            toast.success(
              initialValues ? "Facility updated!" : "Facility added!"
            );
            resetForm();
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-2">
                  <label className="font-medium">SVG Code *</label>
                  <Field
                    as="textarea"
                    name="svg"
                    rows="5"
                    placeholder="<svg>...</svg>"
                    className="border px-3 py-2 rounded-md resize-none"
                    onChange={(e) => {
                      setFieldValue("svg", e.target.value);
                      setSvgPreview(e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="svg"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  {svgPreview && (
                    <div
                      className="mt-2 border w-24 h-24 p-2 rounded-md"
                      dangerouslySetInnerHTML={{ __html: svgPreview }}
                    />
                  )}
                </div>


                <div className="flex flex-col">
                  <label className="font-medium">Title *</label>
                  <Field
                    name="title"
                    className="border px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Description *</label>
                <Field name="description">
                  {({ field, form }) => (
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(content) =>
                        form.setFieldValue("description", content)
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                onClick={() => navigate("/ourfacilities")}
                  type="submit"
                  className="bg-[#0B0C28] hover:bg-blue-700 text-white px-8 py-3 rounded-xl cursor-pointer duration-500"
                >
                  {initialValues ? "Update Facility" : "Add Facility"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/ourfacilities")}
                 
                  className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-xl cursor-pointer duration-500"
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
