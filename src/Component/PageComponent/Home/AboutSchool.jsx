import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import defaultImage from '../../../assets/Photo/logos.png';

const schema = yup.object().shape({
  imageid: yup.mixed().required("Image is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const defaultData = {
  imageid: defaultImage,
  title: "About Our School",
  description:
    "Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
};

export default function AboutSchool({ initialData }) {
  const editor = useRef(null);
  const [data, setData] = useState(initialData || defaultData);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="my-12">
      <div className="md:w-fit flex flex-col items-start justify-start md:ml-16 ml-0 mb-8">
        <h3 className="text-xl font-semibold underline mb-2">About School Section</h3>
        <p className="text-sm text-gray-500">
          Update the image, title, and description for this section.
        </p>
      </div>

      {!editMode ? (
        <div className="md:w-11/12 w-full mx-auto rounded-xl shadow-2xl p-6 flex flex-col md:ml-15 gap-4">
          <h1 className="text-md font-semibold text-gray-500">
            Title: <span className="text-sm text-black">{data.title}</span>
          </h1>

          <div className="flex flex-col gap-4 mt-2 items-start">
            <div className="flex gap-4">
              <h1 className="text-md font-semibold text-gray-500">Image:</h1>
              {data.imageid && (
                <img
                  src={data.imageid instanceof File ? URL.createObjectURL(data.imageid) : data.imageid.src || data.imageid}
                  alt="About School"
                  className="h-40 w-40 object-cover rounded-md border"
                />
              )}
            </div>

            <div className="flex-1 gap-4">
              <h1 className="text-md font-semibold mb-2 text-gray-500">Description:</h1>
              <div className="text-sm" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-colors mt-4 w-fit duration-500 cursor-pointer"
          >
            Update About School
          </button>
        </div>
      ) : (
        <div className="md:w-4/5 w-full flex items-center justify-center mx-auto rounded-xl p-6 bg-gray-200">
          <Formik
            enableReinitialize
            initialValues={{
              imageid: data.imageid,
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
                
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Image Upload</label>
                  <label htmlFor="imageid" className="w-fit cursor-pointer">
                    {values.imageid instanceof File ? (
                      <img
                        src={URL.createObjectURL(values.imageid)}
                        className="h-32 w-40 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-white h-32 w-40 rounded-md border-2 border-[#8486b6] hover:bg-[#0B0C28] duration-700 transition-colors">
                        <MdOutlineBrowserUpdated className="text-3xl text-gray-500 " />
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
                      if (file) setFieldValue("imageid", file);
                    }}
                  />
                  <ErrorMessage name="imageid" component="div" className="text-red-500 text-sm" />
                </div>

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
