import { FC, useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { FetchedElement } from "../constants/interfaces";
import axios from "axios";
import { API_URL } from "../constants/constants";



const MainApp: FC = () => {

    const [fetchedData, setFetchedData] = useState<FetchedElement[]>([])

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

    //filtering sorting states
    //filtered sorted list useMemo

    
return(
    <>
        {fetchedData.length > 0 && <CardComponent card={fetchedData[0]} />}
    </>
)

}

MainApp.displayName = 'MainApp';

export default MainApp;