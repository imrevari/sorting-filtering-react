import { FC, Fragment } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FetchedElement } from "../constants/interfaces";

interface PopupWindowProps {
    isOpen: boolean;
    closePopup: () => void;
    card: FetchedElement;
}


const PopupWindow: FC<PopupWindowProps> = ({isOpen, closePopup, card}) => {
    
  const {description, date, title, category} = card;
    const releaseDate = new Date(date)

    return (
        <Fragment>
          <Dialog
            fullWidth={true}
            open={isOpen}
            onClose={closePopup}
          >
            <DialogTitle >{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{marginBottom: '8px'}}>
                  {`Year released: ${releaseDate.getFullYear()}`}
                </DialogContentText>
              <DialogContentText sx={{marginBottom: '8px'}} >
                {`Category: ${category}`}
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  width: 'auto',
                  maxWidth: '600px',
                  flexWrap: 'wrap'
                  
                }}
              >
                {description}
              </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined'
                    color='error'
                    style={{maxWidth: '110px', minWidth: '110px'}}
                    onClick={closePopup}>Close</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );

}

PopupWindow.displayName = 'PopupWindow';

export default PopupWindow;