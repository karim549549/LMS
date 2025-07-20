import React from "react";

export default function InvitationSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Invitation Details</h3>
      <ul className="text-xs space-y-2">
        <li><span className="font-semibold text-gray-500">Invited Email:</span> assistant@example.com</li>
        <li><span className="font-semibold text-gray-500">Role:</span> ASSISTANT</li>
        <li><span className="font-semibold text-gray-500">Invited By:</span> Mr. Teacher</li>
        <li><span className="font-semibold text-gray-500">Course:</span> Algebra 101</li>
        <li><span className="font-semibold text-gray-500">Permissions:</span> GRADE_ASSIGNMENTS, VIEW_ANALYTICS</li>
        <li><span className="font-semibold text-gray-500">Message:</span> Welcome to the team! Please complete your registration.</li>
      </ul>
    </div>
  );
} 