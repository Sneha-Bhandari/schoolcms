import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcEditImage } from "react-icons/fc";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

import useGetData from "../../../lib/useGetData";
import usePostData from "../../../lib/usePostData";
import usePatchData from "../../../lib/usePatchData";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  features: Yup.array()
    .of(Yup.string().required("Feature cannot be empty"))
    .min(1, "Add at least one feature"),
  imageid: Yup.number().required("Image is required"),
});

const WhyChooseUs = () => {
  const { data, loading, error, refetch } = useGetData("whychooseus");

  const { postData } = usePostData("whychooseus");
  const { patchData } = usePatchData("whychooseus");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const item = Array.isArray(data) ? data[0] : data;
  const hasData = Boolean(item?.id);

  const uploadImage = async (file, setFieldValue) => {
    try {
      const formData = new FormData();
      formData.append("images", file);

      const res = await axios.post(
        "http://192.168.1.67:3000/fileupload/upload",
        formData
      );

      setFieldValue("imageid", res.data.id);
      setFieldValue("imageUrl", res.data.imageurl);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        features: values.features,
        imageid: values.imageid,
      };

      if (hasData) {
        await patchData(item.id, payload);
        toast.success("Updated successfully");
      } else {
        await postData(payload);
        toast.success("Created successfully");
      }

      refetch();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  return (
    <div className="bg-white my-12 flex w-full mx-auto gap-6">
      <div className="w-1/4">
        <h3 className="text-2xl font-semibold text-[#0B0C28]">
          Why Choose Us
        </h3>
        <p className="text-xs text-gray-400">
          Image, Title, Subtitle, Description and Features
        </p>
      </div>

      <div className="w-3/4">
        <Formik
          enableReinitialize
          initialValues={{
            title: item?.title || "",
            subtitle: item?.subtitle || "",
            description: item?.description || "",
            features: item?.features || [""],
            imageid: item?.imageid?.id || "",
            imageUrl: item?.imageid?.imageurl || "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-5 shadow-xl p-10 rounded-xl">
              <div>
                <label className="font-medium">Image *</label>
                <label
                  htmlFor="whychooseus-image"
                  className="cursor-pointer border-2 border-dashed border-blue-900 h-40 flex justify-center items-center rounded-md"
                >
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      className="h-full w-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <FcEditImage className="text-5xl text-gray-300" />
                  )}
                </label>
                <input
                  id="whychooseus-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) uploadImage(file, setFieldValue);
                  }}
                />
                <ErrorMessage
                  name="imageid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Title *</label>
                <Field
                  name="title"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label>Subtitle *</label>
                <Field
                  name="subtitle"
                  className="border px-4 py-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="subtitle"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label>Description *</label>
                <JoditEditor
                  value={values.description}
                  onBlur={(content) =>
                    setFieldValue("description", content)
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label>Features *</label>
                {values.features.map((_, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Field
                      name={`features[${i}]`}
                      className="border px-3 py-2 rounded-md w-full"
                    />
                    <button
                      type="button"
                      disabled={values.features.length === 1}
                      onClick={() =>
                        setFieldValue(
                          "features",
                          values.features.filter((_, x) => x !== i)
                        )
                      }
                      className="bg-red-600 text-white px-2 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("features", [...values.features, ""])
                  }
                  className="text-sm border px-3 py-2 rounded"
                >
                  + Add Feature
                </button>
              </div>

              <button
                type="submit"
                disabled={!values.imageid}
                className="bg-[#0B0C28] text-white px-6 py-2 rounded-xl"
              >
                {hasData ? "Update Section" : "Create Section"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WhyChooseUs;
