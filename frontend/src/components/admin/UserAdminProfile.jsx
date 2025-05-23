import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Contact, Mail } from 'lucide-react';
import { Label } from '@radix-ui/react-label';

function UserAdminProfile() {
  const { id } = useParams(); // get the user ID from the route
  const searchUserBySkills = useSelector(
    (store) => store.company.searchUserBySkills
  );

  // Find the user in the redux state by their ID
  const user = searchUserBySkills?.find((u) => u._id === id);
  const isResume = true;

  
  if (!user) {
    return <div>User not found</div>;
  }

  return (

    <div>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="">
              <AvatarImage className='h-14 w-14 rounded-full position-center' src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <div className='bg-black text-white rounded-full text-xs px-2.5 py-1' key={index}>{item}</div>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={`https://res.cloudinary.com/dv7hchy4z/image/upload/f_auto,q_auto/
${user?.profile?.resume}`}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAdminProfile;
