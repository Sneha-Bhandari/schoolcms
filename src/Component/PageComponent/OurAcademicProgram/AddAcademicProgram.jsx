import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";

const AcademicSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  academicduration: Yup.string().required("Duration is required"),
  academicdescription: Yup.string().required("Description is required"),
  keyfeatures: Yup.array()
    .of(Yup.string().required("Feature cannot be empty"))
    .min(1, "Add at least one feature"),
  academicimageid: Yup.mixed().required("Image is required"),
});

export default function AddAcademicProgram() {
  const navigate = useNavigate();
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
    const newProgram = {
      id: Date.now(),
      title: values.title,
      academicduration: values.academicduration,
      academicdescription: values.academicdescription,
      keyfeatures: values.keyfeatures,
      academicimageid: imagePreview,
    };

    const existing =
      JSON.parse(localStorage.getItem("academicPrograms")) || [];

    localStorage.setItem(
      "academicPrograms",
      JSON.stringify([...existing, newProgram])
    );

    toast.success("Academic program added!");
    resetForm();
    navigate("/ouracademicprogram");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Academic Program</h2>

          <button
            onClick={() => navigate("/ouracademicprogram")}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            academicduration: "",
            academicdescription: "",
            keyfeatures: [""],
            academicimageid: null,
          }}
          validationSchema={AcademicSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">

              {/* Title */}
              <div>
                <label>Program Title *</label>
                <Field className="w-full border rounded px-3 py-2" name="title" />
                <ErrorMessage name="title" className="text-red-500 text-sm" component="div" />
              </div>

              {/* Duration */}
              <div>
                <label>Duration *</label>
                <Field className="w-full border rounded px-3 py-2" name="academicduration" />
                <ErrorMessage name="academicduration" className="text-red-500 text-sm" component="div" />
              </div>

              {/* Description with Jodit */}
              <div>
                <label>Description *</label>

                <JoditEditor
                  value={values.academicdescription}
                  config={{
                    readonly: false,
                    height: 300,
                    toolbarAdaptive: false,
                  }}
                  onBlur={(content) =>
                    setFieldValue("academicdescription", content)
                  }
                  onChange={(content) =>
                    setFieldValue("academicdescription", content)
                  }
                />

                <ErrorMessage
                  name="academicdescription"
                  className="text-red-500 text-sm"
                  component="div"
                />
              </div>

              {/* Key Features */}
              <div>
                <label>Key Features *</label>

                <FieldArray name="keyfeatures">
                  {({ push, remove }) => (
                    <div className="space-y-3">
                      {values.keyfeatures.map((_, i) => (
                        <div key={i} className="flex gap-2">
                          <Field
                            name={`keyfeatures[${i}]`}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter feature"
                          />
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            className="bg-red-500 text-white px-3 rounded"
                          >
                            <MdClose />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push("")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        + Add Feature
                      </button>
                    </div>
                  )}
                </FieldArray>

                <ErrorMessage name="keyfeatures" className="text-red-500 text-sm" component="div" />
              </div>

              {/* Image */}
              <div>
                <label>Program Image *</label>

                {imagePreview ? (
                  <div className="flex gap-4 items-center">
                    <img
                      src={imagePreview}
                      className="w-24 h-24 rounded object-cover"
                      alt="preview"
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
                  <label className="border-2 border-dashed p-6 block text-center cursor-pointer rounded">
                    <MdCloudUpload size={40} className="mx-auto mb-2" />
                    Upload Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </label>
                )}

                <ErrorMessage name="image" className="text-red-500 text-sm" component="div" />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#0B0C28] text-white px-6 py-3 rounded-lg"
                >
                  Create Program
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/ouracademicprogram")}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg"
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
