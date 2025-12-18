import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import { MdOutlineBrowserUpdated } from "react-icons/md";


const schema = yup.object().shape({
  imageid: yup.mixed().required("Image is required"),
  title: yup.string().required("Title is required"),

});

const defaultData = {
  imageid: "/aca2.jpg",
  title: "Our Admissions",
 
};

export default function AdmissionBanner({ initialData }) {
  const editor = useRef(null);
  const [data, setData] = useState(initialData || defaultData);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="my-16 ">
      <div className=" flex flex-col items-start justify-start mb-8">
        <h3 className="text-xl font-semibold underline mb-2">Admission Banner Section</h3>
        <p className="text-sm text-gray-500">
          Update the image and title for this section.
        </p>
      </div>

      {!editMode ? (
        <div className="w-full rounded-xl shadow-2xl p-6 flex flex-col gap-4 ">
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

            
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-colors mt-4 w-fit duration-500 cursor-pointer"
          >
            Update Admission Banner          
        </button>
        </div>
      ) : (
        <div className=" w-full flex items-center justify-center mx-auto rounded-xl p-6 bg-gray-200">
          <Formik
            enableReinitialize
            initialValues={{
              imageid: data.imageid,
              title: data.title,
            
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
