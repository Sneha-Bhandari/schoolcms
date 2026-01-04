import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import { useState } from "react";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  imageid: Yup.number().required("Image is required"),
});

const ContactUsBanner = () => {

  const [storedData, setStoredData] = useState(null);

  const hasData = !!storedData;

  const fileUpload = (file, setFieldValue) => {
    const fakeId = Date.now();
    const fakeUrl = URL.createObjectURL(file);
    setFieldValue("imageid", fakeId);
    setFieldValue("imageurl", fakeUrl);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/3 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline-offset-2 underline">
        ContactUs Banner Section
        </h3>
        <p className="text-xs text-gray-400">Image, Title, and Subtitle</p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: hasData ? storedData.title : "",
            subtitle: hasData ? storedData.subtitle : "",
            imageid: hasData ? storedData.imageid : "",
            imageurl: hasData ? storedData.imageurl : "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("ContactUs Banner Data:", values);

          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="contact-top-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-52 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.imageurl ? (
                    <img
                      src={values.imageurl}
                      className="h-full w-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="contact-top-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setFieldValue("imageurl", URL.createObjectURL(file));
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
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Subtitle *</label>
                <Field
                  name="subtitle"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="subtitle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-linear-to-r from-[#0B0C28] to-cyan-400 font-semibold  text-white py-2.5 px-4 w-fit rounded-xl cursor-pointer duration-500 transition-colors"
              >
                {hasData ? "Update ContactUs Banner" : "Create ContactUs Banner"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUsBanner;
