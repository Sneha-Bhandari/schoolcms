import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

export default function AddFacilities({ initialValues, onSubmit, onCancel }) {
  const editor = useRef(null);

  const validationSchema = yup.object({
    svg: yup.string().required("SVG code is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto border-2 border-gray-500">
        <h2 className="text-xl font-semibold text-center mb-4">
          {initialValues ? "Edit Facility" : "Add New Facility"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={
            initialValues || {
              svg: "",
              title: "",
              description: "",
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            toast.success(
              initialValues ? "Facility updated!" : "Facility added!"
            );
            resetForm();
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">

              <div className="flex flex-col gap-2">
                <label className="font-medium">SVG Code</label>
                <Field
                  as="textarea"
                  name="svg"
                  rows="5"
                  placeholder="<svg>...</svg>"
                  className="border px-3 py-2 rounded-md"
                />
                {errors.svg && touched.svg && (
                  <span className="text-red-500 text-sm">{errors.svg}</span>
                )}

                {values.svg && (
                  <div
                    className="mt-2 border p-2 rounded-md"
                    dangerouslySetInnerHTML={{ __html: values.svg }}
                  />
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Title</label>
                <Field name="title" className="border px-3 py-2 rounded-md" />
                {errors.title && touched.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Description</label>
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
                {errors.description && touched.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  {initialValues ? "Update Facility" : "Add Facility"}
                </button>

                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer"
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
