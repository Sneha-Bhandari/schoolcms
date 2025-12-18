import { ImCross } from "react-icons/im";

export default function ViewVisionMission({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 md:ml-50 ml-0">
      <div className="bg-white md:w-1/2  w-11/14 rounded-xl p-6 relative ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        >
          <ImCross />
        </button>

        <img
          src={item.image}
          className="h-48 w-11/12 object-cover rounded-lg mb-4"
        />

        <div
          className="w-12 h-12 text-blue-600 mb-3"
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />

        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

        <div
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </div>
  );
}
