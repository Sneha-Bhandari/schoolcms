import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import { Toaster, toast } from "react-hot-toast";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  image: Yup.mixed().required("Image is required"),
});

const BlogBanner = () => {
  const [storedData, setStoredData] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(storedData);

  const handleFileUpload = (file, setFieldValue) => {
    if (!file) return;
    setFieldValue("image", file);
  };

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col w-full mx-auto md:gap-4">
      <div className="md:w-1/3 w-full mt-4 flex flex-col justify-start items-center md:items-start">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline">
        Blog Banner Section
        </h3>
        <p className="text-xs text-gray-400">Image, Title, and Subtitle</p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            title: storedData?.title || "",
            subtitle: storedData?.subtitle || "",
            image: storedData?.image || null,
          }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setLoading(true);

              await new Promise((resolve) => setTimeout(resolve, 1500));

              setStoredData(values);
              console.log("Blog Banner Data:", values);
              toast.success(
                isEdit
                  ? "Blog Banner updated successfully!"
                  : "Blog Banner created successfully!"
              );

              if (!isEdit) resetForm();
            } catch (err) {
              toast.error("Something went wrong!");
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="blog-top-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-52 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.image ? (
                    <img
                      src={
                        values.image instanceof File
                          ? URL.createObjectURL(values.image)
                          : values.image
                      }
                      className="h-full w-full object-contain"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="blog-top-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e.target.files[0], setFieldValue)
                  }
                />

                <ErrorMessage
                  name="image"
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
                disabled={loading}
                className={`flex items-center gap-2 bg-linear-to-r from-[#0B0C28] to-cyan-400 
                font-semibold text-white py-2.5 px-6 rounded-xl w-fit transition
                ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading
                  ? "Please wait..."
                  : isEdit
                  ? "Update Blog Banner"
                  : "Create Blog Banner"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogBanner;
