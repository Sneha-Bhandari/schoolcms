import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import defaultImage from '../../../assets/Photo/logos.png';


const schema = yup.object().shape({
  image: yup.mixed().required("Image is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  signature: yup.mixed().required("Signature is required"),
  name: yup.string().required("Name is required"),
});

const defaultData = {
  image: defaultImage,
  title: "Message from Principal",
  description: "Welcome to our school! We strive to nurture creativity and excellence in every student, guiding them to achieve their full potential.",
  signature: defaultImage,
  name: "Dr. John Doe",
};

export default function Message({ initialData }) {
  const editor = useRef(null);
  const [data, setData] = useState(initialData || defaultData);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="my-12">
      <div className="md:w-fit flex flex-col items-start justify-start md:ml-16 ml-0 mb-8">
        <h3 className="text-xl font-semibold underline mb-2">Message Section</h3>
        <p className="text-sm text-gray-500">
          Update the title, description, image, signature, and name for this section.
        </p>
      </div>

      {!editMode ? (
        <div className="md:w-11/12 w-full mx-auto  rounded-xl shadow-2xl p-6 flex flex-col md:ml-15 gap-2 ">
          <h1 className="text-md font-semibold text-gray-500">
            Title: <span className="text-sm text-black">{data.title}</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mt-2">
            {data.image && (
              <img
                src={data.image instanceof File ? URL.createObjectURL(data.image) : data.image.src || data.image}
                alt="Message"
                className="h-40 w-40 object-cover rounded-md border"
              />
            )}
            <div className="flex-1">
              <div className="mt-2">
                <h1 className="text-md font-semibold mb-2 text-gray-500">Description:</h1>
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {data.signature && (
                  <img
                    src={data.signature instanceof File ? URL.createObjectURL(data.signature) : data.signature.src || data.signature}
                    alt="Signature"
                    className="h-16 w-32 object-contain"
                  />
                )}
                <h2 className="text-md font-semibold text-gray-700">- {data.name}</h2>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition-colors mt-4 w-fit duration-500 cursor-pointer"
          >
            Update Message
          </button>
        </div>
      ) : (

        <div className="md:w-4/5 w-full flex flex-col items-center justify-center mx-auto rounded-xl p-6 bg-gray-200 gap-4">
          <Formik
            enableReinitialize
            initialValues={{
              image: data.image,
              title: data.title,
              description: data.description,
              signature: data.signature,
              name: data.name,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setData(values);
              setEditMode(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col w-full gap-4">
                {/* IMAGE */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Image *</label>
                  <label htmlFor="image" className="w-fit cursor-pointer">
                    {values.image instanceof File ? (
                      <img
                        src={URL.createObjectURL(values.image)}
                        className="h-32 w-40 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-white h-32 w-40 rounded-md border-2 border-[#8486b6] hover:bg-[#0B0C28] duration-700 transition-colors">
                        <MdOutlineBrowserUpdated className="text-3xl text-gray-500 " />
                      </div>
                    )}
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
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

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Signature *</label>
                  <label htmlFor="signature" className="w-fit cursor-pointer">
                    {values.signature instanceof File ? (
                      <img
                        src={URL.createObjectURL(values.signature)}
                        className="h-16 w-32 object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-white h-16 w-32 rounded-md border-2 border-[#8486b6] hover:bg-[#0B0C28] duration-700 transition-colors">
                        <MdOutlineBrowserUpdated className="text-2xl text-gray-500 " />
                      </div>
                    )}
                  </label>
                  <input
                    id="signature"
                    name="signature"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFieldValue("signature", e.target.files[0])}
                  />
                  <ErrorMessage name="signature" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-500">Name *</label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
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
