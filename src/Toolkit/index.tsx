import * as React from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import ScreenshotMonitorOutlinedIcon from '@mui/icons-material/ScreenshotMonitorOutlined';


export interface ISpeedDialProps {
  onClick: () => void;
}


const Toolkit: React.FunctionComponent<ISpeedDialProps> = (props) => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'absolute', bottom: 0, right: 16 }}
          icon={<AccessibilityNewOutlinedIcon />}
          direction="left"
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            key={"Captura de tela"}
            icon={<ScreenshotMonitorOutlinedIcon onClick={props.onClick} />}
            tooltipTitle={"Captura de tela"}
            onClick={handleClose}
          />
        </SpeedDial>
      </Box>
    </>
  );
};
export default Toolkit; 