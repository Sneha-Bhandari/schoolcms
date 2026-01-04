import React, { useState, useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const schema = Yup.object().shape({
  imageid: Yup.number().required("Image is required"),
  imageUrl: Yup.string().required("Image preview required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),

  stats: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Required"),
        label: Yup.string().required("Required"),
      })
    )
    .min(1, "Add at least one achievement")
    .max(4, "Maximum 4 achievements allowed"),
});

const AboutSchool = () => {
  const editor = useRef(null);
  const [storedData, setStoredData] = useState(null);

  const hasData = Boolean(storedData);

  const fileUpload = (file, setFieldValue) => {
    const fakeId = Date.now();
    const fakeUrl = URL.createObjectURL(file);

    setFieldValue("imageid", fakeId);
    setFieldValue("imageUrl", fakeUrl);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline-offset-2">
          About School
        </h3>
        <p className="text-xs text-gray-400">
          Image, Title, Description and Achievements
        </p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            imageid: storedData?.imageid || "",
            imageUrl: storedData?.imageUrl || "",
            title: storedData?.title || "",
            description: storedData?.description || "",
            stats: storedData?.stats || [{ value: "", label: "" }],
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("About School Data:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-6 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="aboutschool-img"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-42 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="aboutschool-img"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    fileUpload(file, setFieldValue);
                  }}
                />

                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Title *</label>
                <Field
                  name="title"
                  className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">
                  Description (Jodit) *
                </label>

                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(content) => setFieldValue("description", content)}
                  onChange={() => {}}
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="text-md font-medium mb-2 block">
                  Achievements *
                </label>

                <FieldArray name="stats">
                  {({ remove, push }) => (
                    <>
                      {values.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="flex gap-3 mb-2 items-center"
                        >
                          <Field
                            name={`stats[${index}].value`}
                            placeholder="Value"
                            className="border-2 border-blue-900 px-3 py-2 rounded-md w-1/3"
                          />
                          <Field
                            name={`stats[${index}].label`}
                            placeholder="Label"
                            className="border-2 border-blue-900 px-3 py-2 rounded-md w-2/3"
                          />

                          {values.stats.length > 1 && (
                            <button
                              type="button"
                              className="px-2 py-1 bg-red-600 text-white rounded-md"
                              onClick={() => remove(index)}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      {values.stats.length < 4 && (
                        <button
                          type="button"
                          className="text-sm px-3 py-2 border rounded-md hover:bg-blue-500 hover:text-white"
                          onClick={() => push({ value: "", label: "" })}
                        >
                          + Add Achievement
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white py-2.5 px-6 rounded-xl font-semibold"
              >
                {hasData ? "Update Section" : "Create Section"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AboutSchool;
