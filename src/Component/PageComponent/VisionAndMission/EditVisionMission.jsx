import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image URL is required"),
  icon: Yup.string()
    .required("SVG icon required")
    .test("svg", "Invalid SVG", (v) => v?.startsWith("<svg")),
  description: Yup.string().required("Description is required"),
});

export default function EditVisionMission({ item, onUpdate, onClose }) {
  const editor = useRef(null);
  const fileInputRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-30 top-18 overflow-auto">
      <div className="bg-white md:w-1/2 w-4/5 px-6 py-4 rounded-xl max-h-[90vh] overflow-y-auto md:ml-50 ml-0 mt-12 ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit {item.type}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            title: item.title,
            image: item.image,
            icon: item.icon,
            description: item.description,
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            onUpdate(values);
            toast.success("Updated successfully");
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">

              <div className="text-center">
                {values.image && (
                  <img
                    src={values.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto cursor-pointer rounded"
                    onClick={() => fileInputRef.current.click()}
                  />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setFieldValue("image", reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label>SVG Icon *</label>
                <Field
                  as="textarea"
                  name="icon"
                  rows={3}
                  className="border w-full px-3 py-1 rounded font-mono text-xs"
                />
                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {values.icon.startsWith("<svg") && (
                <div
                  className="w-10 h-10"
                  dangerouslySetInnerHTML={{ __html: values.icon }}
                />
              )}

              <div>
                <label>Title *</label>
                <Field
                  name="title"
                  className="border w-full px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Description *</label>
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(c) => setFieldValue("description", c)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-start gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-[#0B0C28] text-white px-4 py-2 rounded cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
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
