import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";
import image from "../../../assets/Photo/logos.png";
import { MdOutlineBrowserUpdated } from "react-icons/md";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  imageid: yup.mixed().required("Image is required"),
  imageTitle: yup.string().required("Image title is required"),
  imageSubtitle: yup.string().required("Image subtitle is required"),
});

const defaultData = {
  imageid: image,
  title: "WHO WE ARE",
  imageTitle: "Trusted Educational Institution",
  imageSubtitle: "Empowering Students Since 2005",
  description:
    "<p>We are a leading institution dedicated to academic excellence and holistic development.</p>",
  features: [
    "Experienced Faculty",
    "Student-Centered Learning",
    "Modern Infrastructure",
    "Global Exposure",
  ],
};

export default function WhoWeAre({ initialData }) {
  const editor = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [features, setFeatures] = useState(
    initialData?.features || defaultData.features
  );
  const [data, setData] = useState(initialData || defaultData);

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (i) =>
    setFeatures(features.filter((_, index) => index !== i));
  const updateFeature = (i, val) => {
    const updated = [...features];
    updated[i] = val;
    setFeatures(updated);
  };

  return (
    <div className="md:my-6 ">
      <div className=" md:w-fit  flex flex-col items-start justify-start  md:ml-16 ml-4 mb-8">
        <h3 className="text-xl font-semibold underline mb-2">
          Who We Are Section
        </h3>
        <p className="text-sm text-gray-500">
          Update title, image content, description and features.
        </p>
      </div>

  

      {!editMode ? (
        <div className=" md:w-11/12 w-full mx-auto  rounded-xl shadow-2xl p-6 flex flex-col md:ml-15 gap-2">
          <h1 className="text-md font-semibold text-gray-500">
            Title: <span className="text-black">{data.title}</span>
          </h1>

          

          <div className="mt-4">
            <h2 className="font-semibold text-gray-500 mb-2">Description:</h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.description }}
              className="text-sm"
            />
          </div>

          <div className="md:flex  flex-col gap-4 mt-6">
           <h1 className="text-md font-semibold text-gray-500">Image:</h1> 
            <img
              src={
                data.imageid instanceof File
                  ? URL.createObjectURL(data.imageid)
                  : data.imageid
              }
              className="h-40 w-40 object-cover rounded-md border"
              alt="Who We Are"
            />
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold text-gray-500">Image Title: <span className="text-gray-900">{data.imageTitle}</span></h2>
              <p className="text-sm text-gray-500 "> Image SubTitle: <span className="text-gray-900">{data.imageSubtitle}</span></p>
            </div>
          </div>
          <ul className="mt-6 list-disc list-inside">
            <h2 className="font-semibold text-gray-500 mb-2">Features:</h2>
            {data.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
            onClick={() => setEditMode(true)}
            className="mt-6 bg-[#0B0C28] text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-700 duration-500 w-fit"
          >
            Update Who We Are
          </button>
        </div>
      ) : (

        <div className="md:w-11/13 mx-auto bg-gray-50 rounded-xl p-6">
          <Formik
            enableReinitialize
            initialValues={{
              title: data.title,
              description: data.description,
              imageid: data.imageid,
              imageTitle: data.imageTitle,
              imageSubtitle: data.imageSubtitle,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setData({ ...values, features });
              setEditMode(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-4">

               
                <div className="flex flex-col gap-2">
                  <hi className="font-medium text-gray-500">Image Upload</hi>
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
                  <ErrorMessage
                    name="imageid"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <Field
                  name="title"
                  placeholder="Section Title"
                  className="border px-4 py-2 rounded-lg"
                />
                <ErrorMessage name="title" component="div" className="text-red-500" />

                <Field
                  name="imageTitle"
                  placeholder="Image Title"
                  className="border px-4 py-2 rounded-lg"
                />

                <Field
                  name="imageSubtitle"
                  placeholder="Image Subtitle"
                  className="border px-4 py-2 rounded-lg"
                />

                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(c) => setFieldValue("description", c)}
                />

                {features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={f}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      className="border px-3 py-2 rounded-lg w-full"
                    />
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-green-600 text-white py-2 rounded-lg"
                >
                  + Add Feature
                </button>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-xl"
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
