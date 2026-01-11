import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FcEditImage } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const TeamSchema = Yup.object().shape({
  image: Yup.mixed().required("Required"),
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
});

export default function EditTeam({ item, onUpdate, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(item?.image || null);

  if (!item) return null;

  const handleSubmit = async (values) => {
    if (!preview) {
      toast.error("Please upload an image", { style: { zIndex: 99999 } });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1200));

      const updatedMember = { ...item, ...values, image: preview };
      console.log("Updated Team Member:", updatedMember);

      toast.success("Team member updated successfully!", {
        duration: 3000,
        style: { zIndex: 99999 },
      });

      setTimeout(() => {
        onUpdate(updatedMember);
        onClose();
        navigate("/team");
      }, 500);
    } catch (error) {
      toast.error("Failed to update team member", { style: { zIndex: 99999 } });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFieldValue("image", file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Team Member</h2>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: item.name || "",
            position: item.position || "",
            facebooklink: item.facebooklink || "",
            instagramlink: item.instagramlink || "",
            linkedinlink: item.linkedinlink || "",
            image: item.image,
          }}
          validationSchema={TeamSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image *</label>
                <label className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                </label>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Name & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <Field name="name" className="w-full border rounded-lg px-4 py-3" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <Field name="position" className="w-full border rounded-lg px-4 py-3" />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["facebooklink", "instagramlink", "linkedinlink"].map((link) => (
                  <div key={link}>
                    <Field
                      name={link}
                      type="url"
                      placeholder={`${link.replace("link", "")} URL`}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                    <ErrorMessage
                      name={link}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-[#0B0C28] to-cyan-400"
                    }`}
                >
                  {loading ? (
                    <>
                      <ImSpinner2 className="animate-spin text-lg" />
                      Updating...
                    </>
                  ) : (
                    "Update Team Member"
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
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
