import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdPerson,
  MdWork,
  MdDescription,
  MdLink,
  MdClose,
} from "react-icons/md";

export default function ViewTeam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const member = state?.member;

  /* 🔒 SAFETY GUARD */
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No team data found</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Team Member Details</h2>
          <button onClick={() => navigate(-1)}>
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex gap-6">
            <img
              src={member.imageid}
              alt={member.name}
              className="w-24 h-24 rounded-lg object-cover border"
            />
            <div>
              <div className="flex items-center gap-2">
                <MdPerson className="text-red-600" />
                <h3 className="text-2xl font-bold">{member.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MdWork className="text-red-600" />
                <span className="text-red-600 font-semibold">
                  {member.position}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MdDescription className="text-red-600" />
              <h4 className="font-semibold">Description</h4>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              {member.description}
            </div>
          </div>

          {/* Social Links */}
          {(member.facebooklink ||
            member.instagramlink ||
            member.linkedinlink) && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MdLink className="text-red-600" />
                <h4 className="font-semibold">Social Links</h4>
              </div>
              <div className="flex gap-3">
                {member.facebooklink && (
                  <a href={member.facebooklink} target="_blank"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Facebook
                  </a>
                )}
                {member.instagramlink && (
                  <a href={member.instagramlink} target="_blank"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Instagram
                  </a>
                )}
                {member.linkedinlink && (
                  <a href={member.linkedinlink} target="_blank"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
