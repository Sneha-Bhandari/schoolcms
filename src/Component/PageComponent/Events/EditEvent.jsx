import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { MdCloudUpload, MdClose } from "react-icons/md";

const schema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  eventstatus: Yup.string().required("Event status is required"),
  eventdate: Yup.string().required("Event date is required"),
  eventlocation: Yup.string().required("Event location is required"),
  eventdescription: Yup.string().required("Event description is required"),
});

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy static event data
  const eventsData = [
    {
      id: "1",
      title: "Tech Conference 2025",
      eventstatus: "Active",
      eventdate: "2025-01-05",
      eventlocation: "Birgunj",
      eventdescription: "A major tech event with speakers from all over Nepal.",
      eventimageid: { id: "101", imageurl: "https://via.placeholder.com/150" },
    },
    {
      id: "2",
      title: "Coding Bootcamp",
      eventstatus: "Upcoming",
      eventdate: "2025-02-12",
      eventlocation: "Kathmandu",
      eventdescription: "Learn full-stack development in 2 weeks.",
      eventimageid: { id: "102", imageurl: "https://via.placeholder.com/150" },
    },
  ];

  const imagesData = [
    { id: "101", imageurl: "https://via.placeholder.com/150" },
    { id: "102", imageurl: "https://via.placeholder.com/150" },
    { id: "103", imageurl: "https://via.placeholder.com/150" },
  ];

  const [selectedImageId, setSelectedImageId] = useState(null);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    eventstatus: "",
    eventdate: "",
    eventlocation: "",
    eventdescription: "",
  });

  const availableImages = imagesData;
  const selectedImage = availableImages.find((img) => img.id === selectedImageId);

  useEffect(() => {
    const eventData = eventsData.find((e) => e.id === id);
    if (eventData) {
      setInitialValues({
        title: eventData.title || "",
        eventstatus: eventData.eventstatus || "",
        eventdate: eventData.eventdate || "",
        eventlocation: eventData.eventlocation || "",
        eventdescription: eventData.eventdescription || "",
      });
      if (eventData.eventimageid?.id) {
        setSelectedImageId(eventData.eventimageid.id);
      }
    }
  }, [id]);

  const handleSubmit = (values) => {
    const payload = { ...values, eventimageid: selectedImageId };
    console.log(" Updated Event Payload:", payload);
    toast.success("Event updated successfully! (Simulated)");
    navigate("/events");
  };

  const handleImageSelect = (imageId) => setSelectedImageId(imageId);
  const clearImage = () => setSelectedImageId(null);

  const handleNewImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingNewImage(true);
    setTimeout(() => {
      const newImage = {
        id: (availableImages.length + 101).toString(),
        imageurl: URL.createObjectURL(file),
      };
      availableImages.push(newImage);
      setSelectedImageId(newImage.id);
      toast.success("Image uploaded successfully! (Simulated)");
      setUploadingNewImage(false);
      event.target.value = "";
    }, 1000);
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Edit Event</h2>
            <p className="text-gray-600 text-sm mt-1">Update event details - ID: {id}</p>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition"
          >
            Back to Events
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <Field name="title" type="text" placeholder="Enter event title" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Event Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Status *</label>
                  <Field as="select" name="eventstatus" className="w-full border border-gray-300 rounded-lg px-4 py-3">
                    <option value="">Select status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Field>
                  <ErrorMessage name="eventstatus" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                  <Field name="eventdate" type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  <ErrorMessage name="eventdate" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Event Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Location *</label>
                  <Field name="eventlocation" type="text" placeholder="Enter event location" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  <ErrorMessage name="eventlocation" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Event Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                  <Field as="textarea" name="eventdescription" rows="6" placeholder="Enter event description" className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-vertical" />
                  <ErrorMessage name="eventdescription" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Image Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>

                  {selectedImage ? (
                    <div className="mb-4">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-green-600 font-medium">Selected Image:</span>
                        <button type="button" onClick={clearImage} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"><MdClose size={16} /> Remove</button>
                      </div>
                      <div className="flex items-center gap-4 p-4 border border-green-200 rounded-lg bg-green-50">
                        <img src={selectedImage.imageurl} alt="Selected" className="w-20 h-20 object-cover rounded-md border" />
                        <div>
                          <p className="font-medium text-sm">Image ID: {selectedImage.id}</p>
                          <p className="text-gray-500 text-xs truncate max-w-xs">{selectedImage.imageurl}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                      <MdCloudUpload className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-500 mb-2">No image selected</p>
                      <p className="text-gray-400 text-sm mb-4">Choose an image from below or upload a new one</p>
                    </div>
                  )}

                  {/* Upload New Image */}
                  <div className="mb-4">
                    <label className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg cursor-pointer transition border border-gray-300">
                      <MdCloudUpload size={20} />
                      {uploadingNewImage ? "Uploading..." : "Upload New Image"}
                      <input type="file" accept="image/*" onChange={handleNewImageUpload} className="hidden" disabled={uploadingNewImage} />
                    </label>
                    <p className="text-gray-500 text-xs mt-2 text-center">Supported formats: JPEG, PNG, GIF • Max size: 5MB</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Images ({availableImages.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                      {availableImages.map((image) => (
                        <div key={image.id} className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${selectedImageId === image.id ? "border-red-500 ring-2 ring-red-200" : "border-gray-200 hover:border-gray-400"}`} onClick={() => handleImageSelect(image.id)}>
                          <img src={image.imageurl} alt={`Image ${image.id}`} className="w-full h-20 object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">ID: {image.id}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 px-8 rounded-full transition">Update Event</button>
                <button type="button" onClick={() => navigate("/events")} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-3 px-6 rounded-full transition">Cancel</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}