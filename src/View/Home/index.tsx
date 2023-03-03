import React, { useRef } from "react";
import { Grid } from "@mui/material";
import Toolkit from "../../Toolkit/index.tsx";
import ScreenCapture from "../../Screenshot/ScreenCapture.tsx";
import Tesseract from 'tesseract.js';
import { PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from "../../PDF/Invoice"
import invoice from "../../PDF/data/invoice"
//import { useScreenshot } from "use-react-screenshot";
import { useScreenshot } from "use-screenshot-hook";
import "./styles.css";



export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const [screenCapture, setScreenCapture] = React.useState('');
  const [screenCaptureText, setScreenCaptureText] = React.useState('');
  const ref = useRef();
  const [width, setWidth] = React.useState(300);
  const { image, takeScreenshot, isLoading, clear } = useScreenshot();


  const handleScreenCapture = screenCapture => {
    setScreenCapture(screenCapture);
    console.log("Imagem", screenCapture);
    Tesseract.recognize(
      screenCapture,
      'eng',
    ).then(({ data: { text } }) => {
      console.log("Texto", text);
      if (text) {
        setScreenCaptureText(text);
      } else {
        setScreenCaptureText("No text was detected! Edit the image and drop it here to retry!")
      }

    })
  };

  return (
    <>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <>
            <div className={["container", "container-unlock"].join(" ")}>
              <div className="base">                
                <div className="row">
                  <PDFViewer width="1000" height="500" >
                    <InvoicePDF invoice={invoice} />
                  </PDFViewer>
                </div>
                <p>Takes screenshot for react components</p>
                <button className={["btn"].join(" ")} onClick={() => takeScreenshot()}>
                  {"Screenshot"}
                </button>
              </div>
            </div>
            {image && (
              <>
                <label style={{ display: "block", margin: "10px 0" }}>
                  Width:
                  <input value={width} onChange={e => setWidth(e.target.value)} />
                </label>
                <img width={width} src={image} />
              </>
            )}

            <Grid container spacing={2} sx={{ display: "flex" }}>
              <Grid item xs={6} justifyContent="center">
                <p>Imagem: </p>
                <img src={screenCapture} alt='react-screen-capture' />
              </Grid>
              <Grid item xs={6} justifyContent="center">
                <p>Texto: {screenCaptureText} </p>
              </Grid>
            </Grid>
            <Toolkit onClick={onStartCapture} />
          </>

        )}
      </ScreenCapture>
    </>
  )
}

export default Home;