import * as React from "react";
import { Grid } from "@mui/material";
import Toolkit from "../../Toolkit/index.tsx";
import ScreenCapture from "../../Screenshot/ScreenCapture.tsx";
import Tesseract from 'tesseract.js';
import Image from "../../assets/Imagem-de-post_4-metodologias-ativas.jpg";
import Invoice from "../../Invoice/index.tsx";


export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const [screenCapture, setScreenCapture] = React.useState('');
  const [screenCaptureText, setScreenCaptureText] = React.useState('');

  const handleScreenCapture = screenCapture => {
    setScreenCapture(screenCapture);
    console.log("Imagem", screenCapture);
    Tesseract.recognize(
      screenCapture,
      'eng',
    ).then(({ data: { text } }) => {
      console.log("Texto", text);
      if(text){
        setScreenCaptureText(text);
      } else{
        setScreenCaptureText("No text was detected! Edit the image and drop it here to retry!")
      }
      
    })
  };

  return (
    <>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <>
            <Grid container direction="row">
              <Grid item xs={6} justifyContent="center">
                <Invoice />
              </Grid>
              <Grid item xs={6} justifyContent="center">
                <img src={Image} alt='Teste' width="400" height="341" />
              </Grid>
            </Grid>
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