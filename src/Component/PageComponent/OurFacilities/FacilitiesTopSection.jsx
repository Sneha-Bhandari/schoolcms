// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import JoditEditor from "jodit-react";
// import useGetData from "../../../lib/useGetData";
// import usePostData from "../../../lib/usePostData";
// import usePatchData from "../../../lib/usePatchData";
// import toast from "react-hot-toast";

// const schema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   description: Yup.string().required("Description is required"),
// });

// const FacilitiesTopSection = () => {
//   const { data, loading, error, refetch } = useGetData("topsection");
//   const { post, loading: postLoading } = usePostData();
//   const { patch, loading: patchLoading } = usePatchData();

//   const [facilityData, setFacilityData] = useState(null);

//   // Remove placeholder 'string' from backend
//   const sanitizeData = (data) => ({
//     title: data?.title === "string" || !data?.title ? "" : data.title,
//     description:
//       data?.description === "string" || !data?.description ? "" : data.description,
//   });

//   // Load facility section from GET data
//   useEffect(() => {
//     if (data) {
//       const facility = data.find((item) => item.path === "facility");
//       setFacilityData(facility ? sanitizeData(facility) : null);
//     }
//   }, [data]);

//   if (loading) return <p>Loading facility section...</p>;
//   if (error) return <p>Error loading facility section</p>;

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setSubmitting(true);

//     try {
//       if (facilityData) {
//         // PATCH: update existing section using path
//         await patch("topsection/path", "facility", values, () => {
//           // After successful patch, refresh data
//           refetch();
//           setFacilityData(values);
//         });
//       } else {
//         // POST: create new section
//         const res = await post("topsection", { ...values, path: "facility" }, null);
//         if (res) {
//           setFacilityData(sanitizeData(res));
//           refetch();
//         }
//       }
//     } catch (err) {
//       console.error("Error saving facility section:", err);
//       toast.error("Error saving facility section");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white md:my-12 md:flex md:flex-row flex-col flex w-full mx-auto md:gap-4">
//       {/* Left info panel */}
//       <div className="md:w-1/4 w-full mt-4 flex flex-col justify-center items-center md:items-start md:justify-start mx-auto">
//         <h3 className="text-2xl font-semibold mb-1 text-[#0B0C28] underline-offset-2">
//           Facility Top Section
//         </h3>
//         <p className="text-xs text-gray-400">Title and Description</p>
//       </div>

//       {/* Form panel */}
//       <div className="md:w-10/15 w-full">
//         <Formik
//           enableReinitialize
//           initialValues={{
//             title: facilityData?.title || "",
//             description: facilityData?.description || "",
//           }}
//           validationSchema={schema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, setFieldValue, isSubmitting }) => (
//             <Form className="flex flex-col gap-4 shadow-2xl shadow-blue-100 md:p-12 p-8 rounded-xl">
//               {/* Title */}
//               <div>
//                 <label className="text-md font-medium">Title *</label>
//                 <Field
//                   name="title"
//                   placeholder="Enter title here"
//                   className="border-2 border-blue-900 px-4 py-2 rounded-md w-full"
//                 />
//                 <ErrorMessage
//                   name="title"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="text-md font-medium">Description *</label>
//                 <JoditEditor
//                   value={values.description}
//                   onBlur={(content) => setFieldValue("description", content)}
//                   onChange={() => {}}
//                 />
//                 <ErrorMessage
//                   name="description"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Submit button */}
//               <div className="flex gap-2 mt-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || postLoading || patchLoading}
//                   className={`font-semibold py-2.5 px-4 w-fit rounded-xl ${
//                     isSubmitting || patchLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-blue-700 text-white hover:bg-blue-800"
//                   }`}
//                 >
//                   {facilityData ? "Update Section" : "Create Section"}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default FacilitiesTopSection;
import React from 'react'

const FacilitiesTopSection = () => {
  return (
    <div>
      
    </div>
  )
}

export default FacilitiesTopSection
