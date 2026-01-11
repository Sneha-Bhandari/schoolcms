import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
  image: Yup.mixed().required("Profile image is required"),
});

export default function AddTeam() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    setLoad(true);
    console.log("New Team Member Data", values); 


    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      const newMember = {
        id: Date.now(),
        ...values,
        image: preview,
      };

      // Save to localStorage (demo purpose)
      const existing = JSON.parse(localStorage.getItem("teamData")) || [];
      localStorage.setItem("teamData", JSON.stringify([...existing, newMember]));

      toast.success("Team member added successfully!");

      resetForm();
      setPreview(null);
      setImage(null);

      // Navigate after delay for better UX
      setTimeout(() => navigate("/team"), 1000);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="w-full py-8 px-4">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Add Team Member</h2>
          <button
            onClick={() => navigate("/team")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </button>
        </div>

        <Formik
          initialValues={{
            name: "",
            position: "",
            facebooklink: "",
            instagramlink: "",
            linkedinlink: "",
            image: null,
          }}
          validationSchema={TeamSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Image *
                </label>
                <label
                  htmlFor="team-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-48 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                  <input
                    id="team-image"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                      setFieldValue("image", file);
                    }}
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
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
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
                  <label className="block text-sm font-medium mb-2">Position *</label>
                  <Field
                    name="position"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Field
                    name="facebooklink"
                    placeholder="Facebook URL"
                    className="border rounded-lg px-4 py-3 w-full"
                  />
                  <ErrorMessage
                    name="facebooklink"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="instagramlink"
                    placeholder="Instagram URL"
                    className="border rounded-lg px-4 py-3 w-full"
                  />
                  <ErrorMessage
                    name="instagramlink"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="linkedinlink"
                    placeholder="LinkedIn URL"
                    className="border rounded-lg px-4 py-3 w-full"
                  />
                  <ErrorMessage
                    name="linkedinlink"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={load}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white
                  ${load ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-[#0B0C28] to-cyan-400"}`}
                >
                  {load ? (
                    <>
                      <ImSpinner2 className="animate-spin text-lg" /> Loading...
                    </>
                  ) : (
                    "Add Team Member"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/team")}
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
