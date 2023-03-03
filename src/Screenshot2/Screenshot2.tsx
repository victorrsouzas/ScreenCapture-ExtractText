import React, {useRef, useState} from "react";
import './styles.css'
import Toolkit from "../Toolkit/index.tsx";
import html2canvas from "html2canvas"

const ScreenShot = () => {
  const modalRef: any = useRef()
  const[image, setImage] = useState()
  const openModal=()=>{
    console.log("teste")
    const element: any = document.querySelector("body")
    html2canvas(element, {logging: false}).then((canvas) => {
      const url: any  = canvas.toDataURL();
      setImage(url);
      modalRef.current.style.display="block"
    })
    
  }
  const closeModal=()=>{
    modalRef.current.style.display="none"
  }


  return(
    <>
    {console.log("teste")}
    <div className="fab">
      <button onClick={openModal}>Teste</button>
    </div>
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>x</span>
      </div>
      <div className="imageWrapper">
        <img src={image} />
      </div>
    </div>
    </>
  )
}

export default ScreenShot;