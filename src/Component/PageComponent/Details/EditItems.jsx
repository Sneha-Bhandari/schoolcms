import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  svg: Yup.string()
    .required("SVG is required")
    .test("is-svg", "Invalid SVG code", (value) =>
      value?.trim().startsWith("<svg")
    ),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditItems({ item, onUpdate, onClose }) {
  const editor = useRef(null);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-30 top-16">
      <div className="bg-white w-11/14 max-w-lg p-6 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit Facility
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            svg: typeof item.icon === "string" ? item.icon : "",
            title: item.title || "",
            description: item.description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onUpdate({
              icon: values.svg,
              title: values.title,
              description: values.description,
            });
            toast.success("Facility updated successfully");
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">SVG Code *</label>
                <Field
                  as="textarea"
                  name="svg"
                  rows={4}
                  placeholder="<svg>...</svg>"
                  className="border rounded-md px-3 py-2 font-mono text-xs"
                />
                <ErrorMessage
                  name="svg"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {values.svg?.trim().startsWith("<svg") && (
                <div className="mt-2 border rounded-md p-3 flex justify-center">
                  <div
                    className="w-12 h-12"
                    dangerouslySetInnerHTML={{ __html: values.svg }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title *</label>
                <Field
                  name="title"
                  className="border rounded-md px-3 py-2"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description *</label>
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onChange={(content) =>
                    setFieldValue("description", content)
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-start gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#0B0C28] text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
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
