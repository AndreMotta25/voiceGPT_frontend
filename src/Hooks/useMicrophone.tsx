import React, { useCallback, useEffect, useState } from 'react'

const useMicrophone = () => {
  const [microphone, setMicrophone] = useState(navigator.mediaDevices.getUserMedia({
    audio:true
  }));  
  const [blobs, setBlobs] = useState<any[]>([]);
  const [listenning, setListenning] = useState<'inactive' | 'recording' | 'paused'>('inactive')
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    const getMicrophone = async () => {
        const streamMicrophone = await microphone;
        if(streamMicrophone)
            setRecorder(new MediaRecorder(streamMicrophone));
    } 
    getMicrophone();
  },[microphone]);

  const getRecording = useCallback(() => {
    console.log(blobs)
    const blob = new Blob(blobs, { type: "audio/ogg; codecs=opus" });
    return blob
  },[blobs])

  const startRecording = useCallback(() => {
    if(recorder) {
        recorder.onstop = (event:any) => {
            console.log("Recorded Blobs", blobs);
        } 
        recorder.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;
    
            console.log("obtendo dados");
            console.log(event.data)
            setBlobs([...blobs, event.data]);
        };
        
        recorder.start();
        console.log('iniciando a gravação');
        setListenning('recording');
    }
    else {
        throw new Error("Microfone não permitido");
    }
  },[recorder,blobs]) 

  const stopRecording = () => {
    if(recorder){
        if (recorder.state === "inactive") return;
        
        recorder.stop();
        setListenning('inactive');
        console.log("parou");
    }
  }

  const resetAudio = () => {
    setBlobs([]);
  }

  return {
    resetAudio,
    startRecording,
    listenning,
    stopRecording,
    setMicrophone,
    getRecording,blobs
  }
}

export default useMicrophone