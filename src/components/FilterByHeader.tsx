import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { FilterByProp } from "../constants/interfaces";
import { Category } from "../constants/enums";

interface FilterByHeaderProps {
    filterBy: FilterByProp[];
    triggerCheckbox: (value: Category) => void;
}


const FilterByHeader: FC<FilterByHeaderProps> = ({filterBy, triggerCheckbox}) => {

    


    return(
        <Box sx={{width: '50%', margin: '7px 0 20px 0'}}>
            <FormGroup sx={{display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'flex-start'}}>
                {filterBy.map( ({category, selected}, index) => 
                    <FormControlLabel
                        key={index} 
                        control={<Checkbox checked={selected} onChange={() => triggerCheckbox(category)}
                    />} label={category} />)}
            </FormGroup>

            
        </Box>
    )


}
    
FilterByHeader.displayName = 'FilterByHeader';

export default FilterByHeader;