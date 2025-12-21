import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

const isEmptyHtml = (value) => {
  if (!value) return true;
  const stripped = value.replace(/<[^>]+>/g, "").trim();
  return stripped.length === 0;
};

const FaqSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string()
    .test("not-empty", "Answer is required", (value) => !isEmptyHtml(value)),
});

export default function EditFaqForm({ item, onUpdate, onClose }) {
  const editorRef = useRef(null);

  if (!item) return null;

  const handleSubmit = (values) => {
    const updatedFaq = {
      ...item,
      question: values.question,
      answer: values.answer,
    };

    onUpdate(updatedFaq);
    toast.success("FAQ updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit FAQ</h2>
          <button onClick={onClose}>
            <span className="bg-red-500 text-white rounded-full px-2 py-1 cursor-pointer hover:bg-black transition">
            X
            </span>
          </button>
        </div>

        <div className="p-6">
          <Formik
            enableReinitialize
            initialValues={{
              question: item.question || "",
              answer: item.answer || "",
            }}
            validationSchema={FaqSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, touched, errors }) => (
              <Form className="space-y-6">

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Question *
                  </label>
                  <Field
                    name="question"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter FAQ question"
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Answer *
                  </label>

                  <div className={`border rounded-lg ${
                    touched.answer && errors.answer
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}>
                    <JoditEditor
                      ref={editorRef}
                      value={values.answer}
                      onBlur={(content) =>
                        setFieldValue("answer", content)
                      }
                      onChange={() => {}}
                      config={{
                        readonly: false,
                        height: 250,
                        placeholder: "Enter FAQ answer...",
                      }}
                    />
                  </div>

                  {touched.answer && errors.answer && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.answer}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg"
                  >
                    Update FAQ
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg"
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
