import { FC, useState } from "react";
import { FetchedElement } from "../constants/interfaces";
import { CardContent, Card, Typography, CardHeader } from "@mui/material";

interface CardProps {
    card: FetchedElement
}

const CardComponent: FC<CardProps> = ({card}) => {

    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false)
    const {description, date, title, category} = card;

    
return(
    <Card sx={{ maxWidth: 200, margin: '5px', maxHeight: 350, minHeight: 350, minWidth: 200}}>
            <CardHeader
                onClick={() => setIsPopupOpened(prevState => !prevState)}
                title={title}
                subheader={date.toLocaleString()}
            />

            <CardContent>
                <Typography
                    data-testid={'card-title'}
                    variant={'h6'} component="div">
                    {description}
                </Typography>
            </CardContent>

            {/* {isPopupOpened && <PopupWindow isOpen={isPopupOpened} closePopup={setIsPopupOpened}/>} */}

        </Card>
)

}

CardComponent.displayName = 'CardComponent';

export default CardComponent;