import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { FC } from "react";
import { SortByType } from "../constants/types";

interface HeaderProps {
    sortBy: SortByType;
    isAsc: boolean;
    setSortBy: (value: SortByType) => void;
    setIsAsc: (isAsc: boolean) => void;
}

const Header: FC<HeaderProps> = ({sortBy, isAsc, setSortBy, setIsAsc}) => {

    const triggerSwitch = () => {
        setIsAsc(!isAsc)
    }

    const selectSortBy = (value: any) => {
        setSortBy(value)
    }

    
    return(
        <Box sx={{ display: 'flex',  width: '50%',flexDirection: 'row', margin: '30px 0 5px 0'}}>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortBy}
                    onChange={(e) => selectSortBy(e.target.value)}
                >   
                    <MenuItem value={'title'}>title</MenuItem>
                    <MenuItem value={'date'}>date</MenuItem>
                    <MenuItem value={'category'}>category</MenuItem>
                </Select>
            </FormControl>

            <FormControlLabel
                sx={{marginLeft: '10px'}}
                control={
                    <Switch checked={isAsc} onChange={triggerSwitch} name="isAsce" />
                }
                label="Ascending"
                />
                
        </Box>
    )
    
    }
    
    Header.displayName = 'Header';
    
    export default Header;