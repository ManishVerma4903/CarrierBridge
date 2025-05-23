import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-3LPA", "4-6LPA", "More than 6LPA"]
    },
]
function findAllNumbers(str) {
    // Use a regular expression to match all sequences of digits
    const matches = str.match(/\d+/g);
    // Convert matches to numbers (as integers)
    return matches ? matches.map(Number) : [];
  }

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [min,setMin] = useState(null);
    const [max,setMax] = useState(null);

    const dispatch = useDispatch();
    const changeHandler = (value) => {
        const temp = findAllNumbers(value)
      
        if(Array.isArray(temp))  {
            const minVal = Math.min(...temp)
            const maxVal = Math.max(...temp)
            setMin(minVal)
            setMax(maxVal)
            console.log(temp);
            console.log(min);
            console.log(max);
        }
        
        setSelectedValue(value);
    }

    

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            {
                selectedValue ? <h4 className='cursor-pointer text-sm' onClick={()=>setSelectedValue('')}>Remove filters</h4> : ""
            }
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            { 
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard