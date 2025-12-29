import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { MdClose, MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";

const Schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  academicduration: Yup.string().required("Duration is required"),
  academicdescription: Yup.string().required("Description is required"),
  keyfeatures: Yup.array()
    .of(Yup.string().required("Feature cannot be empty"))
    .min(1, "Add at least one feature"),
});

export default function EditAcademicProgram({ item, onClose, onUpdate }) {
  const [imagePreview, setImagePreview] = useState(item.academicimageid);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only images are allowed");
      return;
    }

    setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (values) => {
    onUpdate({
      ...item,
      ...values,
      academicimageid: imagePreview,
    });

    toast.success("Program updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">

        {/* Header with Cross Button */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Edit Academic Program</h2>

          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-400 duration-500 transition"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-6">
          <Formik
            enableReinitialize
            initialValues={{
              title: item.title,
              academicduration: item.academicduration,
              academicdescription: item.academicdescription,
              keyfeatures: item.keyfeatures || [""],
              image: null,
            }}
            validationSchema={Schema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">

                {/* Title */}
                <div>
                  <label className="font-medium">Program Title *</label>
                  <Field
                    name="title"
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="font-medium">Duration *</label>
                  <Field
                    name="academicduration"
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                  <ErrorMessage
                    name="academicduration"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Description — Jodit */}
                <div>
                  <label className="font-medium">Description *</label>

                  <div className="mt-2 border rounded">
                    <JoditEditor
                      value={values.academicdescription}
                      config={{
                        readonly: false,
                        height: 260,
                      }}
                      onBlur={(content) =>
                        setFieldValue("academicdescription", content)
                      }
                    />
                  </div>

                  <ErrorMessage
                    name="academicdescription"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <label className="font-medium">Key Features *</label>

                  <FieldArray name="keyfeatures">
                    {({ remove, push }) => (
                      <div className="space-y-3 mt-2">
                        {values.keyfeatures?.map((_, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <Field
                              name={`keyfeatures[${i}]`}
                              className="w-full border rounded px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => remove(i)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
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

                  <ErrorMessage
                    name="keyfeatures"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="font-medium">Program Image</label>

                  {imagePreview ? (
                    <div className="flex items-center gap-4 mt-3">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-28 h-28 object-cover rounded border"
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
                    <label className="mt-3 border-2 border-dashed rounded p-5 flex flex-col items-center cursor-pointer">
                      <MdCloudUpload size={32} />
                      <span className="mt-1 text-sm text-gray-600">
                        Upload Image
                      </span>

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                    </label>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-start gap-3 pt-4 border-t">
                <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#0B0C28] text-white transition hover:bg-blue-600 duration-500 cursor-pointer"
                  >
                    Update Program
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-200 duration-500 cursor-pointer transition"
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
