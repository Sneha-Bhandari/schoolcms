import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  phones: Yup.string()
    .required("At least one contact number is required")
    .test("phones", "Enter valid phone numbers separated by commas", (val) =>
      val
        ?.split(",")
        .map((p) => p.trim())
        .every((p) => p.length >= 6)
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
});

export default function ContactInfoSection() {
  const [contactInfo, setContactInfo] = useState({
    address: "Sukkhanagar Butwal-8, Rupandehi, Nepal",
    phones: "071562537, 9857034838, 9857043464, 9846970252",
    email: "info@globalschool.edu.np",
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdate = async (values, { resetForm }) => {
    setContactInfo(values);
    toast.success("Contact information updated!");
    setShowUpdateForm(false);
    resetForm();
  };

  return (
    <div className="w-full py-10">
      <div className="flex flex-col items-center gap-10">
        <div className="w-11/12 flex flex-col items-start justify-start ">
          <h3 className="text-xl font-semibold underline mb-2">
            Contact Information
          </h3>
          <p className="text-sm text-gray-500">
            Update the school’s address, phone numbers, and email.
          </p>
        </div>

        <div className="w-11/12">
          <div className="w-full bg-gray-50 rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
            <Formik
              enableReinitialize
              initialValues={contactInfo}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ handleSubmit, resetForm }) => (
                <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  {!showUpdateForm ? (
                    <>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <label className="text-md font-medium text-gray-500">
                              Address
                            </label>
                            <p className="text-lg font-bold text-gray-800 mt-1">
                              {contactInfo.address}
                            </p>
                          </div>

                          <div>
                            <label className="text-smd font-medium text-gray-500">
                              Contact Numbers
                            </label>
                            <p className="text-gray-700 mt-1">
                              {contactInfo.phones}
                            </p>
                          </div>

                          <div>
                            <label className="text-md font-medium text-gray-500">
                              Email
                            </label>
                            <p className="text-gray-700 mt-1">
                              {contactInfo.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowUpdateForm(true)}
                        className="bg-[#0B0C28] hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-2.5 px-6 rounded-xl cursor-pointer duration-700 w-fit"
                      >
                        Update Contact Information
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-md font-medium text-gray-700">
                          Address *
                        </label>
                        <Field
                          name="address"
                          type="text"
                          placeholder="Enter address"
                          className="border border-gray-300 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-md font-medium text-gray-700">
                          Contact Numbers (comma separated) *
                        </label>
                        <Field
                          name="phones"
                          as="textarea"
                          rows="2"
                          placeholder="071..., 98..."
                          className="border border-gray-300 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 resize-none focus:ring-blue-500 transition-colors"
                        />
                        <ErrorMessage
                          name="phones"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-md font-medium text-gray-700">
                          Email *
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          className="border border-gray-700 px-4 py-2 rounded-md outline-0 focus:border-red-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="bg-[#0B0C28] hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-10 rounded-xl duration-500 cursor-pointer"
                        >
                          Save Changes
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowUpdateForm(false);
                            resetForm();
                          }}
                          className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-semibold py-2.5 px-6 rounded-xl duration-500 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
