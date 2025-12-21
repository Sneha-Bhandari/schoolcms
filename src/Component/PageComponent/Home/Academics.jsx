import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import defaultImage1 from '../../../assets/Photo/logos.png';
import defaultImage2 from '../../../assets/Photo/logos.png';

const schema = yup.object().shape({
  image1: yup.mixed().required("First image is required"),
  image2: yup.mixed().required("Second image is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const defaultData = {
  image1: defaultImage1,
  image2: defaultImage2,
  title: "Academics Section",
  description:
    "Our academic programs are designed to foster innovation, critical thinking, and practical skills, ensuring that students are prepared for real-world challenges.",
};

export default function Academics({ initialData }) {
  const editor = useRef(null);
  const [data, setData] = useState(initialData || defaultData);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="md:my-6 my-12 ">
      <div className="md:w-fit flex flex-col items-start justify-start md:ml-16 ml-8 mb-8">
        <h3 className="text-xl font-semibold underline mb-2">Academics Section</h3>
        <p className="text-sm text-gray-500">
          Update the title, description, and two images for this section.
        </p>
      </div>
      
      {!editMode ? (
        <div className="md:w-11/12 w-full mx-auto  rounded-xl shadow-2xl p-6 flex flex-col md:ml-15 gap-2">
          <h1 className="text-md font-semibold text-gray-500">
            Title: <span className="text-sm text-black">{data.title}</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mt-2">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-md font-semibold text-gray-500">Image 1:</h1>
              {data.image1 && (
                <img
                  src={data.image1 instanceof File ? URL.createObjectURL(data.image1) : data.image1.src || data.image1}
                  alt="Image 1"
                  className="h-40 w-40 object-cover rounded-md border"
                />
              )}
            </div>

            <div className="flex flex-col items-start gap-2">
              <h1 className="text-md font-semibold text-gray-500">Image 2:</h1>
              {data.image2 && (
                <img
                  src={data.image2 instanceof File ? URL.createObjectURL(data.image2) : data.image2.src || data.image2}
                  alt="Image 2"
                  className="h-40 w-40 object-cover rounded-md border"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-md font-semibold mb-2 text-gray-500">Description:</h1>
            <div className="text-sm" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-colors mt-4 w-fit duration-500 cursor-pointer"
          >
            Update Academics
          </button>
        </div>
      ) : (
        /* EDIT MODE */
        <div className="md:w-4/5 w-full flex flex-col items-center justify-center mx-auto rounded-xl p-6 bg-gray-200 gap-4">
          <Formik
            enableReinitialize
            initialValues={{
              image1: data.image1,
              image2: data.image2,
              title: data.title,
              description: data.description,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setData(values);
              setEditMode(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col w-full gap-4">
                
                {/* IMAGE 1 */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Image 1 *</label>
                  <label htmlFor="image1" className="w-fit cursor-pointer">
                    {values.image1 instanceof File ? (
                      <img
                        src={URL.createObjectURL(values.image1)}
                        className="h-32 w-40 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-white h-32 w-40 rounded-md border-2 border-[#8486b6] hover:bg-[#0B0C28] duration-700 transition-colors">
                        <MdOutlineBrowserUpdated className="text-3xl text-gray-500 " />
                      </div>
                    )}
                  </label>
                  <input
                    id="image1"
                    name="image1"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setFieldValue("image1", file);
                    }}
                  />
                  <ErrorMessage name="image1" component="div" className="text-red-500 text-sm" />
                </div>

                {/* IMAGE 2 */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Image 2 *</label>
                  <label htmlFor="image2" className="w-fit cursor-pointer">
                    {values.image2 instanceof File ? (
                      <img
                        src={URL.createObjectURL(values.image2)}
                        className="h-32 w-40 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-white h-32 w-40 rounded-md border-2 border-[#8486b6] hover:bg-[#0B0C28] duration-700 transition-colors">
                        <MdOutlineBrowserUpdated className="text-3xl text-gray-500 " />
                      </div>
                    )}
                  </label>
                  <input
                    id="image2"
                    name="image2"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setFieldValue("image2", file);
                    }}
                  />
                  <ErrorMessage name="image2" component="div" className="text-red-500 text-sm" />
                </div>

                {/* TITLE */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Title *</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Description *</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <JoditEditor
                      ref={editor}
                      value={values.description}
                      onBlur={(content) => setFieldValue("description", content)}
                    />
                  </div>
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition-colors cursor-pointer duration-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition-colors cursor-pointer duration-500"
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
