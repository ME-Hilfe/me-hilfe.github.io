import React, { useState, useEffect, useCallback } from "react";

import createPdf from "./utils/createPdf"

/**
 * This code defines the react app
 *
 * Imports the router functionality to provide page navigation
 * Defines the Home function outlining the content on each page
 * Content specific to each page (Home and About) is defined in their components in /pages
 * Each page content is presented inside the overall structure defined here
 * The router attaches the page components to their paths
 */

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Home function that is reflected across the site
export default function App() {
  const [formInput, setFormInput] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [pdf, setPdf] = useState()
  
  const onSubmit = useCallback((ev) => {
    setIsProcessing(true)
    console.log("TODO: show pdf", formInput); 
    ev.preventDefault();
    
    createPdf(formInput).then(pdf => {
      console.log('pdf:', pdf)
      setIsProcessing(false)
      setPdf(pdf)
    })
    
    
    
  }, [setIsProcessing, formInput]);

  const onInputChange = useCallback((ev) => {
    
    setFormInput({
      ...formInput,
      [ev.target.name]: ev.target.value
    })
    
    console.log('onInputChange', formInput)
  }, [formInput, setFormInput])
  
  
  if(pdf) {
    console.log('PDF SRC:', pdf)
    return <iframe id="pdf" src={pdf}></iframe>
  }
  
  return (
    <>
      <main role="main" className="wrapper container">
        <h1 style={{marginTop: "3em"}}>Aufnahmeantrag in den Verein ME Hilfe</h1>

        <p>
          Mit dem folgenden Formular möchten wir dir den Aufnahmeprozess so weit
          wie möglich vereinfachen.
        </p>
        <p>
          Nachdem du deine Daten in das Formular eingetragen hast, erstellen wir
          dir ein vorausgefülltes PDF welches nur noch ausgedruckt und
          unterschrieben an uns zugesandt werden muss.
        </p>
        
        <p>
          Deine persönlichen Daten die du hier eingibst werden nicht gespeichert.
        </p>

        <form onSubmit={onSubmit}>
          <label>
            Name, Vorname
            <input type="text" name="name" required="required" autoComplete="name" disabled={isProcessing} onChange={onInputChange}/>
          </label>
            
          <label>
            Geburtsdatum
            <input type="date" name="birthdate" required="required" autoComplete="bday" disabled={isProcessing} onChange={onInputChange}/>
          </label>

          <label>
            Straße, Hausnummer
            <input type="text" name="address" required="required" autoComplete="street-address" disabled={isProcessing} onChange={onInputChange}/>
          </label>

          <label>
            Postleitzahl, Ort
            <input type="text" name="zip" required="required" autoComplete="address-level2" disabled={isProcessing} onChange={onInputChange}/>
          </label>

          <label>
            Telefon
            <input type="text" name="phone" required="required" autoComplete="tel" disabled={isProcessing} onChange={onInputChange}/>
          </label>

          <label>
            E-Mail
            <input type="text" name="email" required="required" autoComplete="email" disabled={isProcessing} onChange={onInputChange}/>
          </label>

          <button aria-busy={isProcessing} disabled={isProcessing} type="submit">Absenden</button>
        </form>
      </main>
    </>
  );
}
