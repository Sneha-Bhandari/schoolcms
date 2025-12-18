import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdClose, MdImage } from "react-icons/md";

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  description: Yup.string().required("Description is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
});

export default function AddTeam() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableImages, setAvailableImages] = useState([]);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    if (!selectedImage) {
      toast.error("Please select a profile image");
      return;
    }

    const payload = {
      ...values,
      image: selectedImage,
    };

    console.log("Team Member Data:", payload);
    toast.success("Team member added successfully!");
    resetForm();
    setSelectedImage(null);
    navigate("/team");
  };

  const handleImageSelect = (image) => setSelectedImage(image);
  const clearImage = () => setSelectedImage(null);

  const handleNewImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingNewImage(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now(),
        imageurl: reader.result,
      };
      setAvailableImages((prev) => [...prev, newImage]);
      setSelectedImage(newImage);
      toast.success("Image uploaded successfully!");
      setUploadingNewImage(false);
    };
    reader.readAsDataURL(file);
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
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Team
          </button>
        </div>

        <Formik
          initialValues={{
            name: "",
            position: "",
            description: "",
            facebooklink: "",
            instagramlink: "",
            linkedinlink: "",
          }}
          validationSchema={TeamSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <Field
                    name="position"
                    type="text"
                    placeholder="Enter position"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  placeholder="Describe team member’s background and role"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image *
                </label>

                {selectedImage ? (
                  <div className="mb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-green-600 font-medium">
                        Selected Image:
                      </span>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                      >
                        <MdClose size={16} /> Remove
                      </button>
                    </div>
                    <img
                      src={selectedImage.imageurl}
                      alt="Selected"
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                    <MdCloudUpload
                      className="mx-auto text-gray-400 mb-3"
                      size={48}
                    />
                    <p className="text-gray-500 mb-2">No image selected</p>
                  </div>
                )}

                <div className="mt-4">
                  <label className="text-sm text-gray-700 font-medium mb-2 block">
                    Upload New Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageUpload}
                    disabled={uploadingNewImage}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {availableImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Available Images
                    </h3>
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                      {availableImages.map((img) => (
                        <img
                          key={img.id}
                          src={img.imageurl}
                          alt={`Image ${img.id}`}
                          className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 ${
                            selectedImage?.id === img.id
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleImageSelect(img)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <Field
                    name="facebooklink"
                    type="url"
                    placeholder="https://facebook.com/username"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <Field
                    name="instagramlink"
                    type="url"
                    placeholder="https://instagram.com/username"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <Field
                    name="linkedinlink"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 px-8 rounded-full transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Create Team Member
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/team")}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-3 px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
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
