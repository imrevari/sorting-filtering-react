import { FC, useState } from "react";
import { FetchedElement } from "../constants/interfaces";
import { CardContent, Card, Typography, CardHeader, Chip } from "@mui/material";
import PopupWindow from "./PopupWindow";

interface CardProps {
  card: FetchedElement;
}

const CardComponent: FC<CardProps> = ({ card }) => {
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const { description, date, title, category } = card;

  const closePopupWindow = () => {
    setIsPopupOpened(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: "5px",
        maxHeight: 300,
        minHeight: 300,
        minWidth: 250,
        backgroundColor: "#83d2e6",
      }}
    >
      <CardHeader
        onClick={() => setIsPopupOpened((prevState) => !prevState)}
        title={title}
        subheader={date.toLocaleString()}
      />

      <CardContent>
        <Typography variant={"h6"} component="div">
          {description}
        </Typography>
        <Typography variant={"body1"} component="div">
          <Chip
            label={category}
            sx={{ marginTop: "5px", marginBottom: "5px", width: "65%" }}
          />
        </Typography>
      </CardContent>

      {isPopupOpened && (
        <PopupWindow
          isOpen={isPopupOpened}
          closePopup={closePopupWindow}
          card={card}
        />
      )}
    </Card>
  );
};

CardComponent.displayName = "CardComponent";

export default CardComponent;
