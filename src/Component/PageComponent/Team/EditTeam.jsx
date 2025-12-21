import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BsImages } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  facebooklink: Yup.string().url("Must be a valid URL").nullable(),
  instagramlink: Yup.string().url("Must be a valid URL").nullable(),
  linkedinlink: Yup.string().url("Must be a valid URL").nullable(),
});

export default function EditTeamForm({ item, onUpdate, onClose }) {
  const [imagePreview, setImagePreview] = useState(item?.imageid || null);

  if (!item) return null;

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleSubmit = (values) => {
    const updatedMember = {
      ...item,
      name: values.name,
      position: values.position,
      facebooklink: values.facebooklink,
      instagramlink: values.instagramlink,
      linkedinlink: values.linkedinlink,
      imageid: imagePreview,
    };
    onUpdate(updatedMember);
    toast.success("Team member updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Team Member</h2>
          <button onClick={onClose}>
           <h1 className="bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:text-white hover:bg-black duration-500 transition-colors"> <MdClose size={22} /></h1>
          </button>
        </div>

        <div className="p-6">
          <Formik
            enableReinitialize
            initialValues={{
              name: item.name || "",
              position: item.position || "",
              facebooklink: item.facebooklink || "",
              instagramlink: item.instagramlink || "",
              linkedinlink: item.linkedinlink || "",
              image: null,
            }}
            validationSchema={TeamSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Profile Image
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
                      <label className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg inline-flex gap-2">
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

                {["name", "position"].map((f) => (
                  <div key={f}>
                    <label className="block text-sm font-semibold mb-1">
                      {f.charAt(0).toUpperCase() + f.slice(1)} *
                    </label>
                    <Field
                      name={f}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <ErrorMessage
                      name={f}
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                ))}

                {["facebooklink", "instagramlink", "linkedinlink"].map(
                  (link) => (
                    <div key={link}>
                      <label className="block text-sm font-semibold mb-1 capitalize">
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

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg "
                  >
                    Update Team Member
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-lg"
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
