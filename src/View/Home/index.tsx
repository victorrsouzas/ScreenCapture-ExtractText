import * as React from "react";
import Toolkit from "../../Toolkit/index.tsx";
import ScreenCapture from "../../Screenshot/ScreenCapture.tsx";
import Tesseract from 'tesseract.js';
// Import Worker
import { Worker, ProgressBar } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ReactDOM from 'react-dom'


export interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const [screenCapture, setScreenCapture] = React.useState('');
  const [screenCaptureText, setScreenCaptureText] = React.useState('');
  const [shown, setShown] = React.useState(false);


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
          setShown(true);
        }
      }
      else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile(null);
      }
    }
    else {
      console.log('please select a PDF');
    }
  }

  const CORSSolve = (url) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        document.getElementById('data').innerText = xhttp.responseText
      } 
    };
    xhttp.open("GET", url, true)
    xhttp.send()
  }

  const modalBody = (file) => (
    <div
      style={{
        backgroundColor: 'orange',

        /* Fixed position */
        left: 0,
        position: 'fixed',
        top: 0,

        /* Take full size */
        height: '100%',
        width: '100%',

        /* Displayed on top of other elements */
        zIndex: 9999,

        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'orange',
          color: '#fff',
          display: 'flex',
          padding: '.5rem',
        }}
      >
        <div style={{ marginRight: 'auto' }}>HT - Tradutor PDF</div>
        <button
          style={{
            backgroundColor: '#357edd',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
          onClick={() => {
            setShown(false)
            setPdfFile(null);
          }}
        >
          Fechar
        </button>
      </div>
      <Viewer fileUrl={file}
        renderLoader={(percentages: number) => (
          <div style={{ width: '240px' }}>
            <ProgressBar progress={Math.round(percentages)} />
          </div>
        )}
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );

  return (
    <>
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (

          <>
            {console.log("Teste", CORSSolve("http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2006/11.15.22.53/doc/5691-5698.pdf"))}
            <div className="container">
              {/*  <form>
                <label><h5>Upload PDF</h5></label>
                <input type='file' className="form-control"
                  onChange={handleFile}></input>
                {pdfError && <span className='text-danger'>{pdfError}</span>}
              </form> */}     
              
              <h5>View PDF</h5>
              <iframe
                width="800px"
                height="800px"
                src="http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2006/11.15.22.53/doc/5691-5698.pdf"
                frameBorder="0"
                title="Iframe de origem diferente"
              ></iframe>
              <button               
                onClick={() =>
                  setShown(true)
                }
              >
                Traduzir em Libras
              </button>
              <div className="viewer">
                {shown && (
                  <>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                      {ReactDOM.createPortal(modalBody("https://www.bresserpereira.org.br/terceiros/2019/outubro/19.10-Neofascismo-e-Bolsonaro.pdf"), document.body)}
                    </Worker>
                    <p>Imagem: </p>
                    <img src={screenCapture} alt='react-screen-capture' />
                    <p>Texto: {screenCaptureText} </p>
                    <Toolkit onClick={onStartCapture} />
                  </>
                )}
              </div>
            </div>
          </>

        )}
      </ScreenCapture>
    </>
  )
}

export default Home;