import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import "./ImgEditor.css";

function MyEditor(props) {

  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      props.setImageOutput(cropper.getCroppedCanvas())
    }
  };

  const changeZoom = (e) => {
    cropper.scale(e.target.value, e.target.value)
  }
  
  return (
    <div className="my-editor">
        <div className="cropper-container">
          <Cropper
            style={{ height: '380px', width: "100%", margin: '0 auto' }}
            src={props.imageInput}
            viewMode={1}
            checkCrossOrigin={true}
            responsive={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
      </div>
      <div className="cropper-controllers">
          <input className="cropper-controllers-save" type="submit" onClick={getCropData} value="Identificar" />
          <input
            className="cropper-controllers-slider"
            type="range"
            onChange={changeZoom}
            min='1'
            max="2"
            step="0.01"
            defaultValue="1"
          />
        </div>
    </div>
  )
}

export default MyEditor;
