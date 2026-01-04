import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";

const schema = Yup.object().shape({
  imageid: Yup.mixed().required("Image is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  signature: Yup.mixed().required("Signature is required"),
  name: Yup.string().required("Name is required"),
});

const MessageSection = () => {
  const [storedData, setStoredData] = useState(null);

  const hasData = Boolean(storedData);

  const uploadFile = (file, setFieldValue, idField, urlField) => {
    if (!file) return;

    const fakeId = Date.now();
    const fakeUrl = URL.createObjectURL(file);

    setFieldValue(idField, fakeId);
    setFieldValue(urlField, fakeUrl);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28]">
          Message Section
        </h3>
        <p className="text-xs text-gray-400">
          Image, Title, Description, Signature and Name
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
            signature: storedData?.signature || "",
            signatureUrl: storedData?.signatureUrl || "",
            name: storedData?.name || "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("Message Section Data:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="message-image"
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
                  id="message-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    uploadFile(
                      e.target.files[0],
                      setFieldValue,
                      "imageid",
                      "imageUrl"
                    )
                  }
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

              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Signature *</label>

                <label
                  htmlFor="message-signature"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-1/3 h-32 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.signatureUrl ? (
                    <img
                      src={values.signatureUrl}
                      className="h-full object-cover w-full"
                      alt="signature"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="message-signature"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    uploadFile(
                      e.target.files[0],
                      setFieldValue,
                      "signature",
                      "signatureUrl"
                    )
                  }
                />

                <ErrorMessage
                  name="signature"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Name *</label>
                <Field
                  name="name"
                  className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
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

export default MessageSection;
