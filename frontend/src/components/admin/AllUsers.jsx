import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AllUsers() {
  const searchUserBySkills = useSelector(
    (store) => store.company.searchUserBySkills
  );
  const [filterUsers, setFilterUsers] = useState([]);

  useEffect(() => {
    if (searchUserBySkills && Array.isArray(searchUserBySkills)) {
        const onlyStudents = searchUserBySkills.filter(
            (user) => user.role === "student" // adjust this if your key/value is different
          );
      setFilterUsers(onlyStudents);
    }
  }, [searchUserBySkills]);

  // console.log(filterUsers);
  
  
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full ">
          <thead className="border-b border-gray-200 text-sm text-[#64748B]">
            <tr>
              <th className="px-4 py-2 font-medium  text-left">Name</th>
              <th className="px-4 py-2 text-medium text-left">Email</th>
              <th className="px-4 py-2 text-medium text-left">Phone Number</th>
              <th className="px-4 py-2 text-medium text-left">Resume</th>
              <th className="px-4 py-2 text-medium text-left">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers?.map((user, index) => (
              <tr key={index}>
              <td className="px-4 py-3">{user.fullname}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.phoneNumber}</td>
              <td className="px-4 py-3">
                {user.profile?.resumeOriginalName ? (
                  <a
                    href={`https://res.cloudinary.com/dv7hchy4z/image/upload/f_auto,q_auto/${user?.profile?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {user.profile.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400">No Resume</span>
                )}
              </td>
              <td className="px-4 py-3"><Link to={`/admin/all-users/${user._id}`}> See Profile</Link></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
