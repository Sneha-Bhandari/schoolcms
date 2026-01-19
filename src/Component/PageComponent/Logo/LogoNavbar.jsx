import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { FcEditImage } from "react-icons/fc";
import { toast } from "react-hot-toast";

const schema = yup.object({
  navbarLogo: yup.mixed().required("Navbar logo is required"),
});

function LogoNavbar({ initialData }) {
  const [storedData, setStoredData] = useState(initialData || null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(storedData?.footerLogo);
  const defaultValues = { navbarLogo: "" };

  return (
    <div className="w-full py-10 flex flex-col md:flex-row gap-10">
      {/* <Toaster position="top-right" /> */}

      <div className="w-full md:w-[25%] text-left">
        <h3 className="text-2xl font-semibold underline mb-2 ">
          Navbar Logo
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Upload or update the logo shown on the footer section.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md shadow-blue-200 w-full md:w-[75%]">
        <Formik
          enableReinitialize
          initialValues={storedData || defaultValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1500));
              setStoredData(values);
              console.log("Image:", values)
              toast.success(
                isEdit
                  ? "Navbar logo updated successfully"
                  : "Navbar logo uploaded successfully"
              );
              if (!isEdit) resetForm();
            } catch {
              toast.error("Something went wrong!");
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-6">
              <div>
                <label className="font-semibold flex">Navbar Logo *</label>

                <label
                  htmlFor="navbarLogo"
                  className="cursor-pointer mt-2 block w-full"
                >
                  {values.navbarLogo ? (
                    <img
                      src={
                        values.navbarLogo instanceof File
                          ? URL.createObjectURL(values.navbarLogo)
                          : values.navbarLogo
                      }
                      className="w-full h-40 object-contain rounded-xl   border-2 border-dashed border-blue-950 "
                      alt="Navbar Logo Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-40  border-2 border-dashed border-blue-950 rounded-md">
                      <FcEditImage className="text-5xl text-gray-500" />
                    </div>
                  )}
                </label>

                <input
                  id="navbarLogo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFieldValue("navbarLogo", e.target.files[0])
                  }
                />

                <ErrorMessage
                  name="navbarLogo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2 rounded-xl text-white flex items-center justify-center gap-2 transition cursor-pointer w-fit
                ${
                  isEdit
                    ? "bg-linear-to-r from-[#0B0C28] to-cyan-100"
                    : "bg-linear-to-r from-[#0B0C28] to-cyan-400"
                }
                ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading
                  ? "Please wait..."
                  : isEdit
                  ? "Update Navbar Logo"
                  : "Upload Navbar Logo"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LogoNavbar;