import { useEffect, useRef, useState } from 'react';

export default function CameraOverlay({ referenceUrl, onCapture }: { referenceUrl?: string; onCapture: (dataUrl:string)=>Promise<void> }){
  // ... implementation stays the same
}
