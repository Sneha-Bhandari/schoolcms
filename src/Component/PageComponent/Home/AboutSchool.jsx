import React, { useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

import useGetData from "../../../lib/useGetData";
import usePostData from "../../../lib/usePostData";
import usePatchData from "../../../lib/usePatchData";

const schema = Yup.object({
  imageid: Yup.string().required("Image is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  stats: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Label is required"),
        value: Yup.number()
          .typeError("Must be a number")
          .required("Value is required"),
      })
    )
    .min(1, "At least one achievement is required"),
});

const AboutSchool = () => {
  const editor = useRef(null);

  const { data, loading, error, refetch } = useGetData("aboutschoolsection");
  const { post, loading: posting } = usePostData();
  const { patch, loading: patching } = usePatchData();

  const initialItem = data && data.length > 0 ? data[0] : null;

  const fileUpload = async (file, setFieldValue) => {
    try {
      const formData = new FormData();
      formData.append("images", file);

      const res = await axios.post(
        "http://192.168.1.67:8000/fileuploads/upload",
        formData
      );
      setFieldValue("imageid", res.data.id);
      setFieldValue("imageUrl", res.data.imageUrl);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    }
  };

  if (loading) return <p>Loading About School Section...</p>;
  if (error) return <p>Error loading About School section</p>;

  return (
    <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
      {/* LEFT PANEL */}
      <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
        <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28]">
          About School
        </h3>
        <p className="text-xs text-gray-400">
          Image, Title, Description and Achievements
        </p>
      </div>

      {/* FORM */}
      <div className="md:w-10/15 w-full">
        <Formik
          enableReinitialize
          initialValues={{
            imageid: initialItem?.imageid?.id || "",
            imageUrl: initialItem?.imageid?.imageUrl || "",
            title: initialItem?.title || "",
            description: initialItem?.description || "",
            stats: initialItem
              ? initialItem.label.map((label, index) => ({
                label,
                value: initialItem.value[index],
              }))
              : [{ label: "", value: "" }],
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            const payload = {
              imageid: values.imageid,
              title: values.title,
              description: values.description,
              label: values.stats.map((s) => s.label),
              value: values.stats.map((s) => Number(s.value)),
            };

            if (initialItem) {
              patch("aboutschoolsection", initialItem.id, payload, () => {
                toast.success("About School updated successfully");
                refetch();
                resetForm();
              });
            } else {
              post("aboutschoolsection", payload, () => {
                toast.success("About School created successfully");
                refetch();
                resetForm();
              });
            }
          }}

        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-6 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
              {/* IMAGE */}
              <div className="flex flex-col gap-2">
                <label className="text-md font-medium">Image *</label>

                <label
                  htmlFor="aboutschool-img"
                  className="cursor-pointer border-2 border-dashed border-blue-900 w-full h-42 flex items-center justify-center rounded-md overflow-hidden"
                >
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      alt="preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <FcEditImage className="text-gray-300 text-5xl" />
                  )}
                </label>

                <input
                  id="aboutschool-img"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) fileUpload(file, setFieldValue);
                  }}
                />

                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="text-md font-medium">Title *</label>
                <Field
                  name="title"
                  className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-md font-medium">Description *</label>
                <JoditEditor
                  ref={editor}
                  value={values.description}
                  onBlur={(content) => setFieldValue("description", content)}
                  onChange={() => { }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ACHIEVEMENTS */}
              <div>
                <div>
                  <label className="text-md font-medium mb-2 block">
                    Achievements *
                  </label>

                  <FieldArray name="stats">
                    {({ remove, push }) => (
                      <>
                        {values.stats.map((_, index) => (
                          <div key={index} className="flex gap-3 mb-2 items-center">
                            <Field
                              name={`stats.${index}.value`}
                              placeholder="Value"
                              type="number"
                              className="border-2 border-blue-900 px-3 py-2 rounded-md w-1/3"
                            />
                            <Field
                              name={`stats.${index}.label`}
                              placeholder="Label"
                              className="border-2 border-blue-900 px-3 py-2 rounded-md w-2/3"
                            />

                            {values.stats.length > 1 && (
                              <button
                                type="button"
                                className="px-2 py-1 bg-red-600 text-white rounded-md"
                                onClick={() => remove(index)}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}

                        {values.stats.length < 4 && (
                          <button
                            type="button"
                            className="text-sm px-3 py-2 border rounded-md hover:bg-blue-500 hover:text-white"
                            onClick={() => push({ label: "", value: "" })}
                          >
                            + Add Achievement
                          </button>
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>

              </div>

              {/* SUBMIT */}
              {/* <button
                type="submit"
                disabled={posting || patching}
                className="bg-linear-to-r from-[#0B0C28] to-cyan-400 text-white py-2.5 px-6 rounded-xl font-semibold"
              >
                {posting || patching
                  ? "Saving..."
                  : initialItem
                  ? "Update Section"
                  : "Create Section"}
              </button> */}
              <button
                type="submit"
                disabled={patching || posting}
                className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl"
              >
                {patching || posting
                  ? "Saving..."
                  : initialItem
                    ? "Update"
                    : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AboutSchool;
