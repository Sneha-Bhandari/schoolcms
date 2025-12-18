import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BsImages } from "react-icons/bs";
import { MdClose } from "react-icons/md";

/* ================= VALIDATION ================= */
const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  description: Yup.string().required("Description is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
});

export default function EditTeam() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const member = state?.member;

  /* 🔒 SAFETY GUARD */
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No team member data found</p>
      </div>
    );
  }

  const [imagePreview, setImagePreview] = useState(
    member.imageid || null
  );
  const [imageFile, setImageFile] = useState(null);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (values) => {
    const updatedMember = {
      ...member,
      ...values,
      imageid: imagePreview,
    };

    console.log("Updated team member:", updatedMember);

    toast.success("Team member updated successfully!");

    /* later → API call here */

    navigate(-1); // go back to table
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Team Member
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <div className="p-6">
          <Formik
            initialValues={{
              name: member.name || "",
              position: member.position || "",
              description: member.description || "",
              facebooklink: member.facebooklink || "",
              instagramlink: member.instagramlink || "",
              linkedinlink: member.linkedinlink || "",
              image: null,
            }}
            validationSchema={TeamSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">

                {/* ================= IMAGE ================= */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold">
                    Profile Image
                  </label>

                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 mx-auto rounded-lg object-cover border"
                        />
                        <label className="inline-flex mt-3 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg">
                          <BsImages className="mr-2" /> Change Image
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              handleImageChange(e, setFieldValue)
                            }
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 mx-auto bg-red-100 rounded-lg flex items-center justify-center">
                          <BsImages className="text-red-600 text-2xl" />
                        </div>
                        <label className="inline-flex mt-3 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg">
                          <BsImages className="mr-2" /> Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              handleImageChange(e, setFieldValue)
                            }
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* ================= FIELDS ================= */}
                <div className="space-y-4">
                  {[
                    { label: "Name", name: "name" },
                    { label: "Position", name: "position" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="font-semibold">{f.label}</label>
                      <Field
                        name={f.name}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                      <ErrorMessage
                        name={f.name}
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-semibold">Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      rows="3"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {["facebooklink", "instagramlink", "linkedinlink"].map(
                    (link) => (
                      <div key={link}>
                        <label className="font-semibold capitalize">
                          {link.replace("link", "")} Link
                        </label>
                        <Field
                          name={link}
                          type="url"
                          className="w-full border rounded-lg px-3 py-2"
                        />
                        <ErrorMessage
                          name={link}
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    )
                  )}
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-lg"
                  >
                    Update Team Member
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 bg-gray-500 text-white py-2.5 rounded-lg"
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
