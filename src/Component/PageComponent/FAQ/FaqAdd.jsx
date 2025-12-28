import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  category: Yup.string().required("Category is required"),
});
export default function FaqAdd({ editItem, onSuccess, faqs, setFaqs }) {
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleUpdate = (values, { resetForm }) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === editItem.id ? { ...faq, ...values } : faq
    );
    setFaqs(updatedFaqs);
    toast.success("Updated successfully!");
    resetForm();
    onSuccess();
  };

  const handleCreate = (values, { resetForm }) => {
    const newFaq = {
      id: faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) + 1 : 1,
      ...values,
    };
    setFaqs([...faqs, newFaq]);
    toast.success("Created successfully!");
    resetForm();
    onSuccess();
  };

  return (
    <div className="w-full py-12 relative">
      <button
        onClick={() => navigate("/faq")}
        className="absolute top-0 right-0 mt-4 mr-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
      >
        Back
      </button>

      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {editItem ? "Edit FAQ" : "Add New FAQ"}
      </h3>

      <Formik
        enableReinitialize
        initialValues={{
          question: editItem ? editItem.question : "",
          answer: editItem ? editItem.answer : "",
          category: editItem ? editItem.category : "General",
        }}
        validationSchema={schema}
        onSubmit={editItem ? handleUpdate : handleCreate}
      >
        {({ setFieldValue, values, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Category *
              </label>

              <Field
                as="select"
                name="category"
                className="border border-gray-300 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              >
                <option value="General">General</option>
                <option value="Admissions">Admissions</option>
                <option value="Academics">Academics</option>
                <option value="Campus">Campus</option>
                <option value="Financial">Financial</option>
              </Field>

              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Question *
              </label>
              <Field
                name="question"
                type="text"
                placeholder="Enter the question"
                className="border border-gray-300 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Answer *
              </label>
              <JoditEditor
                ref={editor}
                value={values.answer}
                onChange={(content) => setFieldValue("answer", content)}
                config={{ height: 300 }}
              />
              <ErrorMessage
                name="answer"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-2.5 px-8 rounded-lg shadow-sm"
              >
                {editItem ? "Update FAQ" : "Create FAQ"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/faq")}
                className="bg-gray-400 hover:bg-gray-500 transition-colors text-white text-sm font-semibold py-2.5 px-6 rounded-lg shadow-sm"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
