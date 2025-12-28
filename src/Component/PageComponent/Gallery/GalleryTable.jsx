import React, { useState, useEffect } from "react";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { BsCameraFill } from "react-icons/bs";

function GalleryTable() {
  const events = ["Sports", "Training", "Meeting", "Academic Activities"];

  const [selectedEvent, setSelectedEvent] = useState("");
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedEvent = localStorage.getItem("gallery_event");
    const savedImages = localStorage.getItem("gallery_images");

    if (savedEvent) setSelectedEvent(savedEvent);
    if (savedImages) setImages(JSON.parse(savedImages)[savedEvent] || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("gallery_event", selectedEvent);

    const allImages = JSON.parse(
      localStorage.getItem("gallery_images") || "{}"
    );
    setImages(allImages[selectedEvent] || []);
  }, [selectedEvent]);

  const saveImagesToStorage = (updatedImages) => {
    const allImages = JSON.parse(
      localStorage.getItem("gallery_images") || "{}"
    );
    allImages[selectedEvent] = updatedImages;
    localStorage.setItem("gallery_images", JSON.stringify(allImages));
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !selectedEvent) return;

    setIsUploading(true);

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((base64Images) => {
      const updated = [...images, ...base64Images];
      setImages(updated);
      saveImagesToStorage(updated);
      setIsUploading(false);
    });
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    saveImagesToStorage(updated);
  };

  const clearAllImages = () => {
    setImages([]);
    saveImagesToStorage([]);
  };

  return (
    <div className="min-h-fit my-12 shadow-xl p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0B0C28]">
              Photo Gallery
            </h1>
            <p className="text-gray-600 mt-1">
              Upload and manage your event photos
            </p>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full md:w-64 appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10"
            >
              <option value="">Select an event...</option>
              {events.map((ev, i) => (
                <option key={i} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {selectedEvent ? (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb  -6">
              <h2 className="text-xl font-semibold">
                Upload images for{" "}
                <span className="text-blue-600">{selectedEvent}</span>
              </h2>

              {images.length > 0 && (
                <button onClick={clearAllImages} className="text-red-600">
                  Clear All
                </button>
              )}
            </div>

            <div className="mb-8 mt-4">
              <label className="relative group block">
                <div
                  className={`border-2 border-dashed rounded-xl ${
                    isUploading
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <div className="p-8 flex flex-col items-center justify-center min-h-[200px]">
                    {isUploading ? (
                      <>
                        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 mb-4 rounded-full" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <IoCloudUploadOutline className="text-5xl text-gray-400 mb-4" />
                        Click to upload images
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt=""
                      className="rounded-lg object-cover aspect-square"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <IoCloseCircle className="text-red-600 text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <BsCameraFill className="text-5xl text-gray-600 mx-auto mb-4" />
            <p>Select an event to start uploading images</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryTable;
