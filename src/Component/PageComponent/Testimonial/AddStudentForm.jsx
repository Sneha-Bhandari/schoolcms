import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdClose } from "react-icons/md";

const StudentSchema = Yup.object().shape({
  name: Yup.string().required("Student name is required"),
  grade: Yup.string().required("Grade is required"),
  rating: Yup.number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

export default function AddStudentForm() {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (values, { resetForm }) => {
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    const newStudent = {
      imageid: imagePreview,
      name: values.name,
      grade: values.grade,
      rating: values.rating,
      description: values.description,
    };

    const existing =
      JSON.parse(localStorage.getItem("testimonialData")) || [];

    localStorage.setItem(
      "testimonialData",
      JSON.stringify([...existing, newStudent])
    );

    toast.success("Student testimonial added successfully!");
    resetForm();
    navigate("/testimonial");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add Student Testimonial
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Add a new student testimonial
            </p>
          </div>
          <button
            onClick={() => navigate("/testimonial")}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            name: "",
            grade: "",
            rating: "",
            description: "",
            image: null,
          }}
          validationSchema={StudentSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Student Name *
                  </label>
                  <Field
                    name="name"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Grade *
                  </label>
                  <Field
                    name="grade"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                  <ErrorMessage
                    name="grade"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating (1–5) *
                </label>
                <Field
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  className="w-full border rounded-lg px-4 py-3"
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  Description *
                </label>

                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onChange={(content) =>
                    setFieldValue("description", content)
                  }
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Student Image *
                </label>

                {imagePreview ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFieldValue("image", null);
                      }}
                      className="text-red-600 flex items-center gap-1"
                    >
                      <MdClose /> Remove
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed rounded-lg p-6 block text-center cursor-pointer">
                    <MdCloudUpload size={40} className="mx-auto mb-2" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleImageChange(e, setFieldValue)
                      }
                    />
                  </label>
                )}

                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#0B0C28] hover:bg-blue-700 text-white px-8 py-3 rounded-xl duration-500"
                >
                  Add Testimonial
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/testimonial")}
                  className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-xl duration-500"
                >
                  Cancel
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
