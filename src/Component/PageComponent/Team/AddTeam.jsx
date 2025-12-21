import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdClose } from "react-icons/md";

const TeamSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
});

export default function AddTeam() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
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

    const newMember = {
      id: Date.now(),
      name: values.name,
      position: values.position,
      facebooklink: values.facebooklink || "",
      instagramlink: values.instagramlink || "",
      linkedinlink: values.linkedinlink || "",
      imageid: {
        imageurl: imagePreview,
      },
    };

    const existing =
      JSON.parse(localStorage.getItem("teamData")) || [];

    localStorage.setItem(
      "teamData",
      JSON.stringify([...existing, newMember])
    );

    toast.success("Team member added successfully!");
    resetForm();
    navigate("/team");
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Team Member
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Create a new team member profile
            </p>
          </div>
          <button
            onClick={() => navigate("/team")}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full"
          >
            Back to Team
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
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
                    Position *
                  </label>
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

              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Image *
                </label>

                {imagePreview ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={imagePreview}
                      className="w-24 h-24 object-cover rounded-lg"
                      alt="preview"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field
                  name="facebooklink"
                  placeholder="Facebook URL"
                  className="border rounded-lg px-4 py-3"
                />
                <Field
                  name="instagramlink"
                  placeholder="Instagram URL"
                  className="border rounded-lg px-4 py-3"
                />
                <Field
                  name="linkedinlink"
                  placeholder="LinkedIn URL"
                  className="border rounded-lg px-4 py-3"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#0B0C28] hover:bg-blue-700 text-white px-8 py-3 rounded-xl cursor-pointer duration-500"
                >
                  Create Team Member
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/team")}
                  className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-xl cursor-pointer duration-500"
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
