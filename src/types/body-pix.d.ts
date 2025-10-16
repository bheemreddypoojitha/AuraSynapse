declare module "@tensorflow-models/body-pix" {
    import * as tf from "@tensorflow/tfjs";
  
    export interface BodyPixSegmentation {
      data: Uint8Array;
      width: number;
      height: number;
    }
  
    export interface BodyPixNet {
      segmentPerson(
        input: tf.Tensor3D | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement,
        config?: any
      ): Promise<BodyPixSegmentation>;
    }
  
    export interface LoadOptions {
      architecture?: "MobileNetV1" | "ResNet50";
      outputStride?: 8 | 16 | 32;
      multiplier?: 0.50 | 0.75 | 1.0;
      quantBytes?: 1 | 2 | 4;
    }
  
    export function load(options?: LoadOptions): Promise<BodyPixNet>;
  }
  