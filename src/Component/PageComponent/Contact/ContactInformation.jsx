import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Updated validation schema including mapUrl
const schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mapUrl: Yup.string()
    .url("Invalid URL format")
    .required("Map URL is required"),
});

const ContactInformation = () => {
  const [storedData, setStoredData] = useState(null);
  const hasData = !!storedData;

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col w-full mx-auto md:gap-4">
      <div className="md:w-1/3 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline underline-offset-2">
          Contact Information
        </h3>
        <p className="text-xs text-gray-400">
          Address, Contact Number, Email, and Map URL
        </p>
      </div>

      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            address: hasData ? storedData.address : "",
            phone: hasData ? storedData.phone : "",
            email: hasData ? storedData.email : "",
            mapUrl: hasData ? storedData.mapUrl : "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            setStoredData(values);
            alert(hasData ? "Updated successfully!" : "Saved successfully!");
            console.log("Contact Info:", values);
          }}
        >
          {() => (
            <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              <div>
                <label className="text-md font-medium">Address *</label>
                <Field
                  name="address"
                  as="textarea"
                  className="border px-4 py-2 rounded-md w-full resize-none"
                  rows={3}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Contact Number *</label>
                <Field
                  name="phone"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="text-md font-medium">Email *</label>
                <Field
                  name="email"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* New Map URL Field */}
              <div>
                <label className="text-md font-medium">Map URL *</label>
                <Field
                  name="mapUrl"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="mapUrl"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-linear-to-r from-[#0B0C28] to-cyan-400 font-semibold text-white py-2.5 px-4 w-fit rounded-xl cursor-pointer"
              >
                {hasData ? "Update Contact Info" : "Create Contact Info"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactInformation;
