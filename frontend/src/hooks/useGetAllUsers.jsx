import { setAllUsers } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get-users`);
        // console.log("hii");
        
        // Ensure we're getting the 'data' array from the response
        if (res.data.success) {
          dispatch(setAllUsers(res.data.data)); // Dispatch only the array of users
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [dispatch]); // ensure dispatch is included in the dependency array
};

export default useGetAllUsers;
