import { FC, useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { FetchedElement, FilterByProp } from "../constants/interfaces";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import { SortByType } from "../constants/types";
import { Category } from "../constants/enums";
import FilterByHeader from "./FilterByHeader";


const MainApp: FC = () => {


    const categoryValues = (Object.values(Category));
    const categoryValuesObject = categoryValues.map(e => {return({category: e, selected: true})})

    const [fetchedData, setFetchedData] = useState<FetchedElement[]>([])
    const [sortBy, setSortBy] = useState<SortByType>('')
    const [isAsc, setIsAsc] = useState<boolean>(true)
    const [filterBy, setFilterBy] = useState<FilterByProp[]>([...categoryValuesObject])

    const triggerCheckbox = (category: Category) => {
        const copy = [...filterBy];
        const selected = copy.map( e => {if(e.category === category) {
                            return {category, selected: !e.selected}
                        }else{
                            return e;
                        }
        })
        setFilterBy(selected)
    }

    //fetch data
    useEffect( () => {
        axios.get(
            API_URL
        )
        .then(res => {
            const responseBody = res.data;
            if(responseBody){
                setFetchedData(responseBody)
            }
            
        }
          ).catch( error => {
            console.log(error)
          })
    }, [])

    //filtered sorted list useMemo

    
return(
    <Container >
        <Box sx={{backgroundColor: '#e9f1f2',
                        display: 'flex',
                        flexWrap: 'wrap', 
                        alignItems: 'center',
                        flexDirection: 'column', 
                        justifyContent: 'center'}}> 
            <Header sortBy={sortBy} setSortBy={setSortBy} isAsc={isAsc} setIsAsc={setIsAsc}/>

            <FilterByHeader filterBy={filterBy} triggerCheckbox={triggerCheckbox}/>

            {fetchedData.length > 0 &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {fetchedData.map( (data) => <CardComponent card={data} key={data.id}/>)} 
            </Box>}                      
        </Box>
    </Container>
)

}

MainApp.displayName = 'MainApp';

export default MainApp;