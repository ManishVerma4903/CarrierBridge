import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import AllUsers from "./AllUsers";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setSearchUserBySkills } from "@/redux/companySlice";

function Users() {
  useGetAllUsers();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const users = useSelector((store) => store.company.allUsers);

  
  const allUsers = users || []; // Ensure `allUsers` is always an array, even if `users.data` is undefined
  console.log(allUsers);

  
  useEffect(() => {
    if (!Array.isArray(allUsers) || allUsers.length === 0) return; // Protect from invalid data
    
    // Filter logic: check if input is empty, return all users, else filter by skill
    const filtered = input.trim() === ""
      ? allUsers
      : allUsers.filter((user) =>
          user?.profile?.skills?.some((skill) =>
            skill?.toLowerCase()?.includes(input.toLowerCase()) // Check if skill exists and matches input
  
          )
        );

        console.log(filtered);
    // If there are filtered users, dispatch the action
    dispatch(setSearchUserBySkills(filtered));

  }, [input, allUsers, dispatch]);

  

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="w-fit border border-1 border-zinc-200 p-1.5 rounded-md"
            placeholder="Filter by skills"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
          />
        </div>
      </div>
      <AllUsers />
    </>
  );
}

export default Users;
