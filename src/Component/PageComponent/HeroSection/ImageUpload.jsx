import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup";
import toast from "react-hot-toast";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function ImageUpload() {
  const imageSchema = yup.object().shape({
    images: yup
      .array()
      .of(yup.mixed().required("Image is required"))
      .min(2, "At least 2 images are required"),
  });

  const defaultImages = ["/Laptop.jpeg", "/bannerfour.png"];

  return (
    <div className="my-12">
      <div className="flex flex-col ml-8 mb-6">
      <h2 className="text-2xl underline font-semibold mb-2 "> Images Upload</h2>
      <p className="text-sm text-gray-500 ">
        Hero Section Images Uploads
      </p>
      </div>
      
      <div className="shadow-xl rounded-2xl  bg-white mb-4 ">
        <Formik
          initialValues={{ images: defaultImages }}
          validationSchema={imageSchema}
          onSubmit={(values) => {
            console.log("IMAGE FORM SUBMIT:", values);
            toast.success("Images updated!");
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 p-8">
              <div className="flex flex-wrap gap-6">
                {values.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group h-40 w-64 rounded-md overflow-hidden border border-gray-300"
                  >
                    <img
                      src={img instanceof File ? URL.createObjectURL(img) : img}
                      className="h-full w-full object-cover"
                    />

                    <label
                      className="
                      absolute inset-0 bg-black/50
                      flex items-center justify-center 
                      text-white text-sm font-medium opacity-0 
                      group-hover:opacity-100 transition cursor-pointer
                    "
                    >
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const updated = [...values.images];
                            updated[index] = file;
                            setFieldValue("images", updated);
                          }
                        }}
                      />
                    </label>

                    {values.images.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = values.images.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("images", updated);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-200 h-40 w-64 rounded-md border border-gray-300 gap-2">
                  <MdOutlineBrowserUpdated className="text-3xl text-gray-600" />
                  <h1>Upload More Image</h1>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFieldValue("images", [...values.images, file]);
                      }
                    }}
                  />
                </label>
              </div>

              <ErrorMessage
                name="images"
                className="text-red-500 text-sm"
                component="div"
              />

              <button
                type="submit"
                className="bg-[#0B0C28] hover:bg-blue-600 w-fit px-10 text-white py-2 rounded-xl transition-colors duration-500 cursor-pointer"
              >
                Update Images
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ImageUpload;
