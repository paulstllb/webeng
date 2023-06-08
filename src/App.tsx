import React, { useState } from 'react';
import { Outlet, Routes, BrowserRouter, Route } from "react-router-dom";
import Home from './pages/home/home';
import CanvasDraw from './pages/canvasdraw/canvasdraw';
import Page404 from './pages/404/404';
import WeatherShow from './pages/weathershow/weathershow';
import RSSFeed from './pages/RSS/RSS';
function App() {


//Router damit die Seiten erreicht werden können
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="canvastouch" element={<CanvasDraw />} />
          <Route path="weather" element={<WeatherShow />} />
          <Route path="*" element={<Page404 />} />
          <Route path="RSS" element={<RSSFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}
let setLoadingGlob: (b: boolean) => void;
let setLoadingTextGlob: (txt: string) => void;

/*
Die Funktion "loadAsync" führt eine asynchrone Aufgabe aus und gibt entweder das Ergebnis der Aufgabe vom Typ "T" oder 
einen Fehler vom Typ "Error" zurück. 
Der Ladezustand wird während der Ausführung der Aufgabe aktualisiert und am Ende wieder zurückgesetzt.
*/
export async function loadAsync<T>(p: (setLoadingText: (txt: string) => void) => Promise<T>): Promise<T | Error> {
  try {
    setLoadingTextGlob("");
    setLoadingGlob(true);
    return await p(setLoadingTextGlob);
  } catch (error) {
    if(error instanceof Error){
      return error
    }
    return new Error(error + "");
  } finally {
    setLoadingGlob(false);
  }
}



//Die "Loader" Funktion die einen Ladezustand und einen Lade-Text über den Zustand verfolgt. 
//Es rendert eine wenn der Ladezustand "true" ist.

//Ladeanimation ist in Bearbeitung
function Loader() {
  let [isLoading, setLoading] = useState(false);
  let [loadingText, setLoadingText] = useState("");

  setLoadingGlob = setLoading;
  setLoadingTextGlob = setLoadingText;
  return <span className='vstack' style={{alignItems: 'center',position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    {isLoading && <>
      <span className="viereck"></span>
      {loadingText}
    </>}
  </span>
}


//Die "Main" Funktion ist eine React-Komponente, die ein Hauptlayout rendert, eine Navigationsleiste mit Menü-Optionen enthält 
//und den Zustand für das Öffnen und Schließen des Menüs verwaltet.
function Main() {
  let [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return <div className='vstack flex-between' style={{ minHeight: '96vh' }}>
    <main>
      <Loader />
      <nav className="navigation">
      <div className="logo">
        <a href="/">PS</a>
      </div>
      <div className="allNavigation">
      <div className="navigation-text">Navigation</div>
      <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
      
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        <li className="navcon"><a href="/">Home</a></li>
        <li className="navcon"><a href="/RSS">Nachrichten</a></li>
        <li className="navcon"><a href="/Weather">Weather</a></li>
        <li className="navcon"><a href="/canvastouch">Canvas</a></li>
      </ul>
    </nav>
      <Outlet />
    </main>
  </div>
}

export default App;