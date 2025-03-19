import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import React from "react";

export default function StatusIcon({ status }: { status: boolean }) {
  const statusColor = status
    ? "h-5 w-5 text-green-800 inline-block align-middle"
    : "h-5 w-5 text-gray-200 inline-block align-middle";
  return (
    <div>
      <CheckCircleIcon className={statusColor} />
    </div>
  );
}
