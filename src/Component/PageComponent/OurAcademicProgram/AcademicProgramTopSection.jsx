
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";


const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

function TruncatedDescription({ htmlContent }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="mt-1">
      <div
        className={`text-gray-700 prose max-w-none transition-all duration-300 ${
          expanded ? "" : "line-clamp-2 overflow-hidden"
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-red-600 text-sm font-medium mt-2 focus:outline-none"
      >
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default function AcademicProgramTopSection() {
  const editor = useRef(null);

  const [aboutItem, setAboutItem] = useState({
    id: 1,
    title: "Our Academic Programs",
    description: "<p>Discover transformative education pathways designed to shape future leaders and innovators across disciplines.</p>",
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdate = async (values, { resetForm }) => {
    const updated = {
      title: values.title,
      description: values.description,
    };

    setAboutItem((prev) => ({ ...prev, ...updated }));

    toast.success("Approved Section updated locally!");
    setShowUpdateForm(false);
    resetForm();
  };

  return (
    <div  className="my-12">
     
       
        <div className="md:w-fit  flex flex-col items-start justify-start  md:ml-16 ml-8 mb-8 ">
          <h3 className="text-xl font-semibold underline mb-2">Academic Program Top Section</h3>
          <p className="text-sm text-gray-500">
            Update the title and description for the academic program section.
          </p>
        </div>

       
        
          <div className="md:w-11/12 w-full mx-auto  rounded-xl shadow-2xl p-6 flex flex-col md:ml-15 gap-2">
            <Formik
              enableReinitialize
              initialValues={{
                title: aboutItem?.title || "",
                description: aboutItem?.description || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ values, setFieldValue, handleSubmit, resetForm }) => (
                <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  {!showUpdateForm ? (
                    <>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Title</label>
                            <p className="text-lg font-bold text-gray-800 mt-1">{aboutItem.title}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">Description</label>
                            <TruncatedDescription htmlContent={aboutItem.description} />
                          </div>
                        </div>
                      </div>

                      <div className="flex  ">
                        <button
                          type="button"
                          onClick={() => setShowUpdateForm(true)}
                          className="bg-[#0B0C28] hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-2.5 px-6 rounded-xl cursor-pointer duration-700"
                        >
                          Update Faculty Section
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Title *</label>
                        <Field
                          name="title"
                          type="text"
                          placeholder="Enter title"
                          className="border border-gray-300 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <ErrorMessage name="title" component="div" className="text-blue-500 text-sm mt-1" />
                      </div>

                     

                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Description *</label>
                        <JoditEditor
                          ref={editor}
                          value={values.description}
                          onBlur={(content) => setFieldValue("description", content)}
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="bg-[#0B0C28] duration-500 hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-2.5 px-10 rounded-xl cursor-pointer"
                        >
                          Save Changes
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowUpdateForm(false);
                            resetForm();
                          }}
                          className="bg-gray-400 hover:bg-gray-500 transition-colors text-white text-sm font-semibold py-2.5 px-6 rounded-xl cursor-pointer duration-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>

   
  );
}
