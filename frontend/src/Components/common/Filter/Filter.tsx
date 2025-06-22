import { CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import ColorConstants from '../../../constants/ColorConstants';
import { hexToRgba } from '../../../utils/color.utils';

interface FilterProps {
    request: Record<string, string[]>;
    filterOptions: FilterOptionProps[];
    setRequest: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

export interface FilterOptionProps {
    field: string;
    displayText: string;
    options: {label: string, value: string}[];
}

const Filter: React.FC<FilterProps> = ({ request, filterOptions, setRequest }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<Record<string, boolean>>({});
    const [tempRequest, setTempRequest] = useState<Record<string, string[]>>(request);
    // const [filterCount, setFilterCount] = useState<number>(Object.values(tempRequest).filter(arr => arr.length > 0).length);
    const [filterCount, setFilterCount] = useState<Record<string, number>>({});
    const [tempFilterCount, setTempFilterCount] = useState<Record<string, number>>({});

    const handleFilter = (field: string, value: string) => {
        setTempRequest(prev => {
            const existingValues = prev[field] || [];

            if(existingValues?.includes(value)){
                return {
                    ...tempRequest,
                    [field]: existingValues?.filter(r => r !== value)
                }
            }
            else{
                return{
                    ...tempRequest,
                    [field]: [...existingValues, value]
                }
            }
        })
    }

    const initializeDropdowns = () => {
        filterOptions.forEach((filter) => {
            setIsDropdownOpen({...isDropdownOpen, [filter.field]: true});
        })
    }

    const initializeCounts = () => {
        const newCounts: Record<string, number> = {};
        Object.entries(request).forEach(([key, arr]) => {
            newCounts[key] = arr.length;
        });
        setFilterCount(newCounts);
    }

    const initializeTempCount = () => {
        const tempNewCounts: Record<string, number> = {};
        Object.entries(tempRequest).forEach(([key, arr]) => {
            tempNewCounts[key] = arr.length;
        });
        setTempFilterCount(tempNewCounts);
    }

    const toggleDropdown = (field: string, value: boolean) => {
        setIsDropdownOpen({...isDropdownOpen, [field]: value})
    }

    useEffect(() => {
        initializeCounts();
        initializeTempCount();
        initializeDropdowns();
    }, []);

    useEffect(() => {
        initializeCounts();
    }, [request]);

     useEffect(() => {
        initializeTempCount();
    }, [tempRequest]);

    const handleApply = (field: string) => {
        setRequest(tempRequest);
        toggleDropdown(field, !isDropdownOpen[field]);
    }

    return (
        <div className="flex flex-wrap gap-[20px]">
            {filterOptions.map((filter) => (
                <div key={filter.field} className="relative">
                    <button style={{ backgroundColor: ColorConstants.darkGrey }} onClick={() => {toggleDropdown(filter.field, !isDropdownOpen[filter.field]); setTempRequest(request)}} className="h-[28px] px-[10px] gap-[5px] rounded-[5px] flex items-center">
                        <i className="ri-filter-line" style={{fontSize: '14px'}}></i> 
                        <Typography.Text style={{fontSize: '14px', fontWeight: 400}} className="m-0">{filter.displayText}</Typography.Text>
                        {filterCount[filter.field] !== undefined && filterCount[filter.field] > 0 && (<div className="flex items-center text-[11px] flex-shrink-0 h-[16px] px-[6px] py-[5px] rounded-[100px]" style={{backgroundColor: ColorConstants.white}}>{filterCount[filter.field]}</div>)}
                        {isDropdownOpen[filter.field] ? (
                            <i className="ri-arrow-drop-down-fill" style={{fontSize: "18px", margin: "0"}}></i>
                        ): (
                            <i className="ri-arrow-drop-up-fill" style={{fontSize: "18px", margin: "0"}}></i>
                        )}
                    </button>

                    {/* <div></div> */}
                    {isDropdownOpen[filter.field] && (
                        <div className="absolute mt-[10px] top-[100%] w-[280px] rounded-[5px] overflow-hidden" style={{zIndex: 100000, backgroundColor: ColorConstants.grey, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            <div className="flex justify-between items-center bg-white" style={{padding: '8px 16px'}}>
                                <Typography.Text style={{fontSize: '16px', fontWeight: 400}} className="m-0">{filter.displayText} ({tempFilterCount[filter.field] ?? 0})</Typography.Text>
                                <i className="ri-close-line cursor-pointer" style={{fontSize: '18px'}} onClick={() => toggleDropdown(filter.field, !isDropdownOpen[filter.field])}></i>
                            </div>
                            <div className="flex flex-col py-[10px] mx-[10px] p-[5px] gap-[5px] max-h-[300px] overflow-y-auto">
                                {filter.options.map((option) => (
                                    <div 
                                        className="p-[10px] cursor-pointer rounded-[5px] flex justify-between" 
                                        key={option.label} 
                                        style={{backgroundColor: tempRequest[filter.field]?.includes(option.value) ? hexToRgba(ColorConstants.secondaryColor, 0.4) : ColorConstants.white}}
                                        onClick={() => handleFilter(filter.field, option.value)}
                                    >
                                        <Typography.Text style={{fontSize: '14px', fontWeight: 400}} className="m-0">{option.label}</Typography.Text>
                                        {tempRequest[filter.field]?.includes(option.value) && (<CheckOutlined style={{ color: ColorConstants.secondaryColor, fontSize: '14px' }} />)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center bg-white" style={{padding: '8px 16px'}}>
                                <button onClick={() => handleApply(filter.field)} className="w-[80px] h-[24px] text-[14px] rounded-[5px] text-white" style={{backgroundColor: ColorConstants.secondaryColor}}>Apply</button>
                                <button onClick={() => setTempRequest({})} className="w-[80px] h-[24px] text-[14px] rounded-[5px] text-white" style={{backgroundColor: ColorConstants.headingColor}}>Clear all</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Filter;
