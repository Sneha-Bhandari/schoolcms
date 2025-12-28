import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdClose } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import toast from "react-hot-toast";

// Validation schema: only PDF required
const CurriculumSchema = Yup.object().shape({
  pdfFile: Yup.mixed()
    .required("PDF file is required")
    .test(
      "fileFormat",
      "Unsupported Format. Please upload a PDF file",
      (value) => value && value.type === "application/pdf"
    ),
});

export default function EditCurriculum({ item, onUpdate, onClose }) {
  const [pdfPreview, setPdfPreview] = useState(item?.pdf);

  if (!item) return null;

  const handlePdfChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfPreview(URL.createObjectURL(file));
      setFieldValue("pdfFile", file);
    } else {
      toast.error("Only PDF files are allowed!");
    }
  };

  const handleSubmit = (values) => {
    const updatedItem = {
      ...item,
      pdf: pdfPreview,
    };
    onUpdate(updatedItem);
    toast.success("PDF updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Curriculum PDF</h2>
          <button onClick={onClose}>
            <div className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition">
              <MdClose size={20} />
            </div>
          </button>
        </div>

        <div className="p-6">
          {/* Show Class Name (read-only) */}
          <p className="mb-4 font-semibold text-gray-700">
            Grade / Class: <span className="text-blue-700">{item.className}</span>
          </p>

          <Formik
            enableReinitialize
            initialValues={{
              pdfFile: null,
            }}
            validationSchema={CurriculumSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    PDF File *
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {/* Preview */}
                    {pdfPreview && (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <BsFileEarmarkPdf className="text-red-600 text-6xl" />
                        <p className="text-sm truncate w-40 text-gray-700">
                          {pdfPreview.split("/").pop()}
                        </p>
                      </div>
                    )}
                    {/* Upload Button */}
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 mt-3">
                      Upload PDF
                      <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={(e) => handlePdfChange(e, setFieldValue)}
                      />
                    </label>
                  </div>
                  <ErrorMessage
                    name="pdfFile"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg"
                  >
                    Update PDF
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
