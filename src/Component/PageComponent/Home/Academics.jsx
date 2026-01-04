import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image1id: Yup.number().required("Image 1 is required"),
  image1Url: Yup.string().required("Image 1 preview required"),
  image2id: Yup.number().required("Image 2 is required"),
  image2Url: Yup.string().required("Image 2 preview required"),
});

const Academics = () => {
  const [storedData, setStoredData] = useState(null);

  const hasData = Boolean(storedData);

  const fileUpload = (file, setFieldValue, fieldId, fieldUrl) => {
    const fakeId = Date.now();
    const fakeUrl = URL.createObjectURL(file);
    setFieldValue(fieldId, fakeId);
    setFieldValue(fieldUrl, fakeUrl);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline-offset-2">
          Academic Section
        </h3>
        <p className="text-xs text-gray-400">
          Title, Description, Image 1, and Image 2
        </p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: storedData?.title || "",
            description: storedData?.description || "",
            image1id: storedData?.image1id || "",
            image1Url: storedData?.image1Url || "",
            image2id: storedData?.image2id || "",
            image2Url: storedData?.image2Url || "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("Academic Section Data:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
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
                <label className="text-md font-medium">Description *</label>
                <JoditEditor
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

<div className="flex  w-full gap-6">
<div className="flex flex-col gap-2 w-1/2">
                <label className="text-md font-medium">Image 1 *</label>
                <label
                  htmlFor="academic-image1"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-42 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.image1Url ? (
                    <img
                      src={values.image1Url}
                      className="h-full object-cover w-full"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>
                <input
                  id="academic-image1"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    fileUpload(e.target.files[0], setFieldValue, "image1id", "image1Url")
                  }
                />
                <ErrorMessage
                  name="image1id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-md font-medium">Image 2 *</label>
                <label
                  htmlFor="academic-image2"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-42 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.image2Url ? (
                    <img
                      src={values.image2Url}
                      className="h-full object-cover w-full"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>
                <input
                  id="academic-image2"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    fileUpload(e.target.files[0], setFieldValue, "image2id", "image2Url")
                  }
                />
                <ErrorMessage
                  name="image2id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
</div>
             

              <button
                type="submit"
                className="bg-[#0B0C28] font-semibold bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white py-2.5 px-4 w-fit rounded-xl"
              >
                {hasData ? "Update Academic Section" : "Create Academic Section"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Academics;
