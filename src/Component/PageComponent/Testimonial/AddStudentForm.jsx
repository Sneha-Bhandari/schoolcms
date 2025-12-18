
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

export default function AddStudentForm({ initialValues, onSubmit, onCancel }) {
  const editor = useRef(null);

  const validationSchema = yup.object({
    imageid: yup.string().required("Image is required"),
    name: yup.string().required("Name is required"),
    grade: yup.string().required("Grade is required"),
    rating: yup
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Rating is required"),
    description: yup.string().required("Description is required"),
  });

  return (
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto border-2 border-gray-500">
        <h2 className="text-xl font-semibold text-center mb-4">
          {initialValues ? "Edit Student" : "Add New Student"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={
            initialValues || {
              imageid: "",
              name: "",
              grade: "",
              rating: 1,
              description: "",
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            toast.success(
              initialValues ? "Updated successfully!" : "Student added!"
            );
            resetForm();
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-900">Image Upload</label>
                <label htmlFor="imageid" className="w-fit cursor-pointer">
                  {values.imageid ? (
                    <img
                      src={values.imageid}
                      className="h-32 w-40 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-100 h-32 w-40 rounded-md border-2 border-gray-300 hover:bg-gray-200 transition-colors">
                      Upload
                    </div>
                  )}
                </label>

                <input
                  id="imageid"
                  name="imageid"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("imageid", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {errors.imageid && touched.imageid && (
                  <div className="text-red-500 text-sm">{errors.imageid}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Name</label>
                <Field name="name" className="border px-3 py-2 rounded-md" />
                {errors.name && touched.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Grade</label>
                <Field name="grade" className="border px-3 py-2 rounded-md" />
                {errors.grade && touched.grade && (
                  <span className="text-red-500 text-sm">{errors.grade}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Rating (1-5)</label>
                <Field
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  className="border px-3 py-2 rounded-md"
                />
                {errors.rating && touched.rating && (
                  <span className="text-red-500 text-sm">{errors.rating}</span>
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
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
              </div>

              <div className="flex justify-between mt-4">
              <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:"
                >
                  Add New Student
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
