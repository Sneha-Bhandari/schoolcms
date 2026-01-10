import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {  MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";

const imageSchema = yup.object().shape({
  images: yup
    .array()
    .of(yup.mixed().required("Image is required"))
    .min(2, "At least 2 images are required"),
});

export default function ImageUpload() {
  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      <div className="md:w-1/3 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h2 className="text-2xl underline font-medium mb-2">
          Images Upload
        </h2>
        <p className="text-sm text-gray-500">
          Hero Section Images Uploads
        </p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          initialValues={{ images: [] }}
          validationSchema={imageSchema}
          onSubmit={(values) => {
            console.log("IMAGE FORM SUBMIT:", values);
            alert("Images updated!");
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4 shadow-2xl border shadow-blue-100 md:p-12 p-8 rounded-xl">

              <div className="flex flex-col gap-4">
                {values.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group  gap-3 border-dashed border-2  h-40 w-full rounded-md  border-[#0B0C28] overflow-hidden "
                  >
                    <img
                      src={img instanceof File ? URL.createObjectURL(img) : img}
                      className="h-full w-full object-cover"
                      alt="uploaded"
                    />

                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          const updated = [...values.images];
                          updated[index] = file;
                          setFieldValue("images", updated);
                        }}
                      />
                    </label>

                    {values.images.length > 2 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        onClick={() => {
                          const updated = values.images.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("images", updated);
                        }}
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <label className="cursor-pointer flex flex-col items-center justify-center border-dashed border-2  h-40 w-full rounded-md  border-[#0B0C28] gap-2">
                <FcEditImage className="text-gray-300 text-5xl" />
                  <span>
                    {values.images.length === 0
                      ? "Upload first image"
                      : "Upload next image"}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setFieldValue("images", [...values.images, file]);
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
                className="bg-linear-to-r from-[#0B0C28] to-cyan-400 w-fit px-10 text-white py-2 rounded-xl cursor-pointer "
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
