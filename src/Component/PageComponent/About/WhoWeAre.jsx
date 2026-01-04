import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  imageid: Yup.mixed().required("Image is required"),
  imageUrl: Yup.string().required("Image preview required"),
  imageTitle: Yup.string().required("Image title is required"),
  imageSubtitle: Yup.string().required("Image subtitle is required"),
  features: Yup.array()
    .of(Yup.string().required("Feature cannot be empty"))
    .min(1, "Add at least one feature"),
});

const WhoWeAre = () => {
  const [storedData, setStoredData] = useState(null);

  const hasData = Boolean(storedData);

  const fileUpload = (file, setFieldValue) => {
    if (!file) return;

    const fakeId = Date.now();
    const fakeUrl = URL.createObjectURL(file);

    setFieldValue("imageid", fakeId);
    setFieldValue("imageUrl", fakeUrl);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28]">
          Who We Are
        </h3>
        <p className="text-xs text-gray-400">
          Image, Title, Description, Features and Image Texts
        </p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: storedData?.title || "",
            description: storedData?.description || "",
            imageid: storedData?.imageid || "",
            imageUrl: storedData?.imageUrl || "",
            imageTitle: storedData?.imageTitle || "",
            imageSubtitle: storedData?.imageSubtitle || "",
            features: storedData?.features || [""],
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("Who We Are Data:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">

              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="whoweare-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-42 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      className="h-full object-cover w-full"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="whoweare-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => fileUpload(e.target.files[0], setFieldValue)}
                />

                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-600 text-sm"
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

              <div>
                <label className="text-md font-medium">Image Title *</label>
                <Field
                  name="imageTitle"
                  className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="imageTitle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Image Subtitle *</label>
                <Field
                  name="imageSubtitle"
                  className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="imageSubtitle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Features *</label>

                {values.features.map((f, index) => (
                  <div key={index} className="flex gap-3 mb-2">
                    <Field
                      name={`features[${index}]`}
                      placeholder={`Feature ${index + 1}`}
                      className="border-2 border-blue-900 px-4 py-2 rounded-md w-full bg-white"
                    />

                    <button
                      type="button"
                      className="px-2 border rounded-md bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => {
                        const copy = [...values.features];
                        copy.splice(index, 1);
                        setFieldValue("features", copy);
                      }}
                      disabled={values.features.length === 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-sm px-3 py-2 border rounded-md hover:bg-blue-500 hover:text-white"
                  onClick={() =>
                    setFieldValue("features", [...values.features, ""])
                  }
                >
                  + Add Feature
                </button>
              </div>

              <button
                type="submit"
                className="bg-[#0B0C28] font-semibold bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white py-2.5 px-4 w-fit rounded-xl"
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

export default WhoWeAre;
