import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, AlertCircle } from "lucide-react";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";

interface Product {
  id: number;
  name: string;
  image: string; // JPG/PNG
}

interface VirtualTryOnProps {
  product: Product;
  onClose: () => void;
}

type CameraState = "idle" | "requesting" | "active" | "denied";

const VirtualTryOnAI = ({ product, onClose }: VirtualTryOnProps) => {
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [overlayPosition, setOverlayPosition] = useState({ x: 300, y: 200 });
  const [productImg, setProductImg] = useState<HTMLImageElement | null>(null);

  // ---------------- Load Product Image ----------------
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = product.image;
    img.onload = () => setProductImg(img);
  }, [product.image]);

  // ---------------- Camera Setup ----------------
  useEffect(() => {
    requestCamera();
    return () => stopCamera();
  }, []);

  const requestCamera = async () => {
    setCameraState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState("active");
      removeBgLoop();
    } catch (err) {
      console.error("Camera denied", err);
      setCameraState("denied");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach((t) => t.stop());
  };

  // ---------------- Drag ----------------
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - overlayPosition.x,
      y: e.clientY - overlayPosition.y,
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging)
      setOverlayPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
  };
  const handleMouseUp = () => setIsDragging(false);

  // ---------------- AI Background Removal ----------------
  const removeBgLoop = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const net = await bodyPix.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2,
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawLoop = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const segmentation = await net.segmentPerson(videoRef.current, {
        internalResolution: "medium",
        segmentationThreshold: 0.7,
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Mask background
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const pixelIndex = i / 4;
        if (!segmentation.data[pixelIndex]) {
          imageData.data[i + 3] = 0; // make background transparent
        }
      }
      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(drawLoop);
    };

    drawLoop();
  };

  // ---------------- Render ----------------
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-8 right-8 z-50 p-3 rounded-full bg-card hover:bg-muted transition-colors"
        >
          <X size={24} className="text-foreground" />
        </button>

        <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute w-full h-full object-cover scale-x-[-1]"
          />
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {cameraState === "active" && productImg && (
            <motion.img
              src={product.image}
              alt={product.name}
              className="absolute w-48 h-48 object-contain drop-shadow-2xl cursor-move"
              style={{
                top: overlayPosition.y,
                left: overlayPosition.x,
                transform: "translate(-50%, -50%)",
              }}
              onMouseDown={handleMouseDown}
              draggable={false}
            />
          )}

          {cameraState === "requesting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background">
              <Camera size={64} className="text-primary animate-pulse" />
              <p className="text-xl text-foreground">Requesting camera access...</p>
            </div>
          )}

          {cameraState === "denied" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background">
              <AlertCircle size={64} className="text-destructive" />
              <p className="text-xl text-foreground">Camera Access Denied</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VirtualTryOnAI;
