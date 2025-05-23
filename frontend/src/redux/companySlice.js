import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState: {
        singleCompany: null,
        companies: [],
        allUsers: [],
        searchCompanyByText: "",
        searchUserBySkills: [],
      },
      
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        setAllUsers:(state,action) =>{
            state.allUsers =action.payload;
        },
        setSearchUserBySkills: (state, action) => {
            state.searchUserBySkills = action.payload; // Set the filtered list here
          },
        
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText,setAllUsers,setSearchUserBySkills} = companySlice.actions;
export default companySlice.reducer;