import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BsImages } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

const TestimonialSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  rating: Yup.number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
  description: Yup.string().required("Description is required"),
});

export default function EditTestimonialForm({ item, onUpdate, onClose }) {
  const editor = useRef(null);
  const [imagePreview, setImagePreview] = useState(item?.imageid || null);

  if (!item) return null;

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setFieldValue("image", file);
    }
  };

  const handleSubmit = (values) => {
    const updatedTestimonial = {
      ...item,
      name: values.name,
      grade: values.grade,
      rating: values.rating,
      description: values.description,
      imageid: imagePreview,
    };

    onUpdate(updatedTestimonial);
    toast.success("Testimonial updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b ">
          <h2 className="text-xl font-semibold ">Edit Testimonial</h2>
          <button onClick={onClose}>
            <span className="bg-red-500 px-2 py-1 cursor-pointer duration-500 rounded-full text-white hover:bg-black transition">
              X
            </span>
          </button>
        </div>

        <div className="p-6">
          <Formik
            enableReinitialize
            initialValues={{
              name: item.name || "",
              grade: item.grade || "",
              rating: item.rating || 1,
              description: item.description || "",
              image: null,
            }}
            validationSchema={TestimonialSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Student Image
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 mx-auto rounded-lg object-cover mb-3"
                        />
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
                          <BsImages /> Change Image
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(e, setFieldValue)
                            }
                          />
                        </label>
                      </>
                    ) : (
                      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex gap-2">
                        <BsImages /> Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(e, setFieldValue)
                          }
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-semibold">Name *</label>
                  <Field className="w-full border px-3 py-2 rounded-lg" name="name" />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label className="font-semibold">Grade *</label>
                  <Field className="w-full border px-3 py-2 rounded-lg" name="grade" />
                  <ErrorMessage name="grade" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label className="font-semibold">Rating (1–5) *</label>
                  <Field
                    type="number"
                    min="1"
                    max="5"
                    name="rating"
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                  <ErrorMessage name="rating" component="div" className="text-red-600 text-sm" />
                </div>

                <div>
                  <label className="font-semibold">Description *</label>
                  <JoditEditor
                    ref={editor}
                    value={values.description}
                    onChange={(content) =>
                      setFieldValue("description", content)
                    }
                    config={{ height: 200 }}
                  />
                  <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
