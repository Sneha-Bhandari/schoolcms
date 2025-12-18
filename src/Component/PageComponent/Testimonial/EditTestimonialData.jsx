
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  imageid: Yup.string().required("Image is required"),
  name: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditTestimonialData({ data, onUpdate, onClose }) {
  const editor = useRef(null);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/70 md:left-60 md:top-18 top-16 flex items-center justify-center z-30 p-4">
      <div className="bg-white w-full md:w-11/18  rounded-lg shadow-lg p-6 space-y-3 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-center">Edit Testimonial</h2>

        <Formik
          enableReinitialize
          initialValues={data}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onUpdate(values);
            toast.success("Testimonial updated successfully!");
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-500">Image Upload</label>
                <label htmlFor="imageid" className="w-fit cursor-pointer">
                  <img
                    src={values.imageid}
                    className="h-32 w-40 object-cover rounded-md border"
                  />
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
                      reader.onloadend = () => setFieldValue("imageid", reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Name</label>
                <Field name="name" className="border px-3 py-2 rounded-md" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Grade</label>
                <Field name="grade" className="border px-3 py-2 rounded-md" />
                <ErrorMessage
                  name="grade"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Description</label>
                <Field name="description">
                  {({ field, form }) => (
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(content) => form.setFieldValue("description", content)}
                      config={{ readonly: false, height: 200 }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-between">
              <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
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
