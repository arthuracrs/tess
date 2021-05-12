import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import MyEditor from './Components/ImgEditor'

import './App.css';

function App() {

  const [myEditorOptions, setMyEditorOptions] = useState({})
  const [showMyEditor, setShowMyEditor] = useState(false)

  const setImageOutput = (croppedCavas) => {
    doOCR(croppedCavas.toDataURL())
  }

  const showMyEditorHandle = (state) => {
    setShowMyEditor(state)
  }

  const onChangeHandle = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    }
    else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setMyEditorOptions({
        setImageOutput,
        imageInput: reader.result,
        setShowMyEditor
      })
    };
    reader.readAsDataURL(files[0]);
  }

  const worker = createWorker({
    logger: m => console.log(m),
  });

  const doOCR = async(image) => {
    setOcr('Reconhecendo...')
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image);
    setOcr('Texto: ' + text);
  };
  const [ocr, setOcr] = useState('Escolha a imagem');

  return (
    <div className="App">
      <h1>{ocr}</h1>
      <h2 onClick={()=>{
        const input1 = document.querySelector('#image-input')
        input1.click()
      }}>Escolher arquivo</h2>
      <input 
        id="image-input" 
        type="file" 
        onChange={onChangeHandle} 
        hidden="hidden"
        accept="image/*"
      />
      <MyEditor {...myEditorOptions} />
    </div>
  );
}

export default App;
