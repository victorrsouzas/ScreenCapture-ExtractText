import * as React from "react";
import { Grid } from "@mui/material";
import Toolkit from "../../Toolkit/index.tsx";
import ScreenCapture from "../../Screenshot/ScreenCapture.tsx";
import Tesseract from 'tesseract.js';
import Image from "../../assets/Imagem-de-post_4-metodologias-ativas.jpg";
import Invoice from "../../Invoice/index.tsx";
import { PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from "../../PDF/Invoice"
import invoice from "../../PDF/data/invoice"
import styled, { css } from "styled-components";
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PDFJS from 'pdfjs-dist/webpack';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";



export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const [screenCapture, setScreenCapture] = React.useState('');
  const [screenCaptureText, setScreenCaptureText] = React.useState('');
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentSuccess({ numPages }) {
    setNumPages(numPages)
  }

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

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = React.useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = React.useState('');


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
          console.log("teste", pdfFile)
        }
      }
      else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else {
      console.log('please select a PDF');
    }
  }
  const PdfView = styled.div`
    background-color: #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
    overflow-y: auto;
    margin-bottom: 10px;
  `

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };

  //param: file -> the input file (e.g. event.target.files[0])
  //return: images -> an array of images encoded in base64 
  const convertPdfToImages = async (file) => {
    const images = [];
    const data = await readFileData(file);
    const pdf = await PDFJS.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      images.append(canvas.toDataURL());
    }
    canvas.remove();
    return images;
  }
  const prevPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  }

  const nextPage = () => {
    setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
  }

  return (
    <>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (

          <>
            <PDFViewer width="1000" height="800" >
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
            {/*  <div className="container">

              Upload PDF
              <form>

                <label><h5>Upload PDF</h5></label>
                <br></br>

                <input type='file' className="form-control"
                  onChange={handleFile}></input>

               
                {pdfError && <span className='text-danger'>{pdfError}</span>}

              </form>

              <h5>View PDF</h5>
              <div className="viewer">

                render this if we have a pdf file
                {pdfFile && (
                  <>
                    <div className="d-flex align-itens-center justify-content-center">
                      <div className="">
                        <i className="bi bi-arrow-left-square-fill display-5 text-danger pointer"
                        onClick={prevPage}
                        role="button"></i>
                        <i className="bi bi-arrow-left-square-fill display-5 text-danger success"
                        onClick={nextPage}
                        role="button"></i>
                      </div>
                      <Document file={pdfFile} onLoadSuccess={onDocumentSuccess}>
                        <Page pageNumber={pageNumber}>
                          
                        </Page>
                      </Document>
                    </div>
                    <img src={convertPdfToImages(pdfFile)}></img>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                      <Viewer fileUrl={pdfFile}
                        plugins={[defaultLayoutPluginInstance]}
                      ></Viewer>
                    </Worker>
                  </>

                )}

                render this if we have pdfFile state null
                pdfFile && <>No file is selected yet

             </div>

            </div> */}
            {/*  <Grid container direction="row">
              <Grid item xs={4} justifyContent="center">
                <Invoice />
              </Grid>
              <Grid item xs={4} justifyContent="center">
                <img src={Image} alt='Teste' width="400" height="341" />
              </Grid>
              <Grid item xs={4} justifyContent="center">
                <PDFViewer width="500" height="200" >
                  <InvoicePDF invoice={invoice} />
                </PDFViewer>
              </Grid>
            </Grid> */}
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