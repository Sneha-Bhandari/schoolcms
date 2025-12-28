import React, { useRef, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import defaultImage from "../../../assets/Photo/logos.png";

const aboutSchema = Yup.object().shape({
  imageid: Yup.mixed().required("Image is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const defaultAboutData = {
  imageid: defaultImage,
  title: "About Our School",
  description:
    "Separated they live in. A small river named Duden flows by their place...",
};

const statsSchema = Yup.object().shape({

  stats: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required("Required"),
        value: Yup.string().required("Required"),
      })
    )
    .min(1)
    .max(4),
});

export default function AboutSchool() {
  const editor = useRef(null);
  const [aboutData, setAboutData] = useState(defaultAboutData);
  const [editAbout, setEditAbout] = useState(false);

  const defaultStatsValues = {
    title: "Our Achievements",
    subtitle: "What we have accomplished so far",
    stats: [
      { value: "200", label: "Certified Teachers" },
      { value: "2000", label: "Students" },
      { value: "10", label: "Courses" },
      { value: "50", label: "Awards Won" },
    ],
  };

  const [statsData, setStatsData] = useState(defaultStatsValues);
  const [showStatsForm, setShowStatsForm] = useState(false);

  const handleStatsSubmit = (values) => {
    setStatsData(values);
    toast.success("Stats section updated");
    setShowStatsForm(false);
  };

  return (
    <div className=" my-16 ">
<div className="md:w-fit flex flex-col items-start justify-start md:ml-16 ml-8 mb-8">
        <h3 className="text-xl font-semibold underline mb-2">About School Section</h3>
        <p className="text-sm text-gray-500">
          Update the title, description, image and labels for this section.
        </p>
      </div>
<div className="md:ml-14 ml-0 md:mx-8 space-y-6  shadow-2xl p-8 rounded-xl" >

      <section className="md:w-full mx-auto">
        {!editAbout ? (
          <div className="p-2 space-y-4">
            <div className="flex flex-col gap-6">
            

              <div>
                <h1 className="font-semibold text-gray-500 mb-1">Image:</h1>
                <img
                  src={
                    aboutData.imageid instanceof File
                      ? URL.createObjectURL(aboutData.imageid)
                      : aboutData.imageid.src || aboutData.imageid
                  }
                  className="h-40 w-40 object-cover rounded-md border"
                />

              </div>
              <h1 className="text-md font-semibold text-gray-500">
              Title: <span className="text-black">{aboutData.title}</span>
            </h1>
              <div className="flex-1">
                <h1 className="font-semibold text-gray-500 mb-2">
                  Description:
                </h1>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: aboutData.description }}
                />
              </div>
            </div>

            <button
              onClick={() => setEditAbout(true)}
              className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl hover:bg-blue-800"
            >
              Update About School
            </button>
          </div>
        ) : (
          <div className="bg-gray-200 rounded-xl p-6">
            <Formik
              enableReinitialize
              initialValues={aboutData}
              validationSchema={aboutSchema}
              onSubmit={(values) => {
                setAboutData(values);
                setEditAbout(false);
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-5">
                  <div>
                    <label className="font-medium text-gray-500">
                      Image Upload
                    </label>
                    <label htmlFor="imageid" className="w-fit cursor-pointer">
                      {values.imageid instanceof File ? (
                        <img
                          src={URL.createObjectURL(values.imageid)}
                          className="h-32 w-40 object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-32 w-40 border-2 rounded-md bg-white">
                          <MdOutlineBrowserUpdated className="text-3xl text-gray-500" />
                        </div>
                      )}
                    </label>

                    <input
                      id="imageid"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setFieldValue("imageid", e.target.files[0])
                      }
                      accept="image/*"
                    />

                    <ErrorMessage
                      name="imageid"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-gray-500">Title *</label>
                    <Field className="border px-4 py-2 rounded-lg w-full" name="title" />
                  </div>

                  <div>
                    <label className="font-medium text-gray-500">Description *</label>
                    <JoditEditor
                      ref={editor}
                      value={values.description}
                      onBlur={(content) =>
                        setFieldValue("description", content)
                      }
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditAbout(false)}
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
      </section>

      <section className="w-full border-t pt-10">
        <div className="flex flex-col my-5 md:text-start text-center mx-3">
        <h2 className="text-2xl font-bold">Our Achievements</h2>
      <p className="text-gray-600">What we have accomplished so far</p>
        </div>
     
        {!showStatsForm && (
          <div className="bg-white p-8 relative rounded-xl md:flex flex flex-col">
            

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {statsData.stats.map((s, i) => (
                <div key={i} className="bg-blue-50 transition-all duration-500 hover:scale-115 cursor-pointer rounded-xl py-8 text-center">
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-gray-700 mt-2">{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowStatsForm(true)}
              className="absolute  top-0 md:right-9 right-34  bg-[#0B0C28] text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              Edit Section
            </button>
          </div>
        )}

        {showStatsForm && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 my-12">
            <Formik
              enableReinitialize
              initialValues={statsData}
              validationSchema={statsSchema}
              onSubmit={handleStatsSubmit}
            >
              {({ values }) => (
                <Form className="space-y-6">
                  

                  <FieldArray name="stats">
                    {({ push, remove }) => (
                      <>
                        {values.stats.map((_, i) => (
                          <div key={i} className="grid grid-cols-12 gap-4">
                            <Field name={`stats.${i}.value`} className="col-span-3 border px-3 py-2 rounded-lg" />
                            <Field name={`stats.${i}.label`} className="col-span-7 border px-3 py-2 rounded-lg" />
                            <button type="button" onClick={() => remove(i)} className="text-red-600 cursor-pointer">
                              Remove
                            </button>
                          </div>
                        ))}

                        {values.stats.length < 4 && (
                          <button
                            type="button"
                            onClick={() => push({ value: "", label: "" })}
                            className="w-full border-2 border-dashed py-3 rounded-lg"
                          >
                            + Add Other Achievements
                          </button>
                        )}
                      </>
                    )}
                  </FieldArray>

                  <div className="flex gap-4">
                    <button type="submit" className="bg-[#0B0C28] hover:bg-blue-700 text-white px-4 py-3 rounded-lg cursor-pointer  duration-500 transition-colors">
                      Save Section
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowStatsForm(false)}
                      className="bg-gray-400 text-white px-4 py-3 hover:bg-gray-500 rounded-lg cursor-pointer duration-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </section>
</div>
    </div>
  );
}
