import { ImCross } from "react-icons/im";

export default function ViewItems({ item, onClose }) {
  if (!item) return null;

  return (
    <div className=" fixed inset-0 bg-black/40  flex justify-center items-center z-30 md:left-32 animate-fadeIn">
      <div className="bg-white md:w-1/3 w-full rounded-xl shadow-xl p-6 mx-6 relative max-h-[90vh] overflow-y-autoanimate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-white hover:text-red-600 text-md bg-red-500 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <ImCross />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-12 h-12"
            dangerouslySetInnerHTML={{ __html: item.icon }}
          />
          <h2 className="text-2xl font-semibold">{item.title}</h2>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
