import { useState } from "react";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}

const getCompanyName = (company: User["company"]): string => {
  if (!company) return "";
  return company.name ?? "";
};

export const UserCard = ({ user }: UserCardProps) => {
  const companyName = getCompanyName(user.company);
  const [imgError, setImgError] = useState(false);
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="aspect-square overflow-hidden bg-zinc-100 flex items-center justify-center">
        {imgError ? (
          <span className="text-4xl font-semibold text-zinc-400 select-none">
            {initials}
          </span>
        ) : (
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{user.email}</p>

        {user.phone && (
          <p className="text-xs text-gray-500 mt-2">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
        )}

        {companyName && (
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-medium">Company:</span> {companyName}
          </p>
        )}

        {user.age && (
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-medium">Age:</span> {user.age}
          </p>
        )}
      </div>
    </div>
  );
};
