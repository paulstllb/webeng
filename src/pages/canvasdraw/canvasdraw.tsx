import { useEffect, useRef, useState } from "react";
import Styles from "./canvasdraw.module.css";

export default function CanvasDraw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasImage, setCanvasImage] = useState("");

  let isDrawing = false;
  let context: CanvasRenderingContext2D | null = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && showCanvas) {
      context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * 0.8;
      canvasRef.current.height = window.innerHeight * 0.6;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showCanvas]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!context || !canvasRef.current) return;
    isDrawing = true;
    let offsetX: number;
    let offsetY: number;

    if ("touches" in e) {
      offsetX = e.touches[0].clientX - canvasRef.current.offsetLeft;
      offsetY = e.touches[0].clientY - canvasRef.current.offsetTop;
    } else {
      offsetX = e.clientX - canvasRef.current.offsetLeft;
      offsetY = e.clientY - canvasRef.current.offsetTop;
    }

    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !context || !canvasRef.current) return;
    let offsetX: number;
    let offsetY: number;

    if ("touches" in e) {
      offsetX = e.touches[0].clientX - canvasRef.current.offsetLeft;
      offsetY = e.touches[0].clientY - canvasRef.current.offsetTop;
    } else {
      offsetX = e.clientX - canvasRef.current.offsetLeft;
      offsetY = e.clientY - canvasRef.current.offsetTop;
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "canvas.png";
    link.click();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleCanvasToggle = () => {
    if (showCanvas) {
      const canvas = canvasRef.current;
      if (canvas) {
        setCanvasImage(canvas.toDataURL("image/png"));
      }
    } else {
      setCanvasImage("");
    }
    setShowCanvas(!showCanvas);
  };

  return (
    <div className={Styles.canvasContainer}>
      {!showCanvas && (
        <button onClick={handleCanvasToggle}>
          Unterschrift zeichnen 
        </button>
      )}
      {showCanvas && (
        <div>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            className={Styles.canvas}
          />
          <div className={Styles.buttonContainer}>
            <button style={{ marginRight: "10px" }} onClick={downloadImage}>
              Bild herunterladen
            </button>
            <button onClick={clearCanvas}>
              Canvas löschen
            </button>
            <button onClick={handleCanvasToggle} style={{marginLeft:"5px"}}>
              Unterschrift speichern 
            </button>
          </div>
        </div>
      )}
      {canvasImage && (
        <div>
          <img src={canvasImage} alt="Canvas" />
        </div>
      )}
    </div>
  );
}
