import React, { useEffect, useState} from 'react';
import './App.css';
import Input from './Components/Prompt';
import useMicrophone from './Hooks/useMicrophone';
import {HiMicrophone} from 'react-icons/hi';
import {ReactComponent as GPT} from './assets/chatgpt-icon.svg'
import 'react-toastify/dist/ReactToastify.css';
import Conversation from './Components/Conversation';
import {v4} from 'uuid'
import {ToastContainer, toast} from 'react-toastify'
import Loading from './Components/Loading';

export type ConversationType = {
  role: "assistant" | "user";
  content: string;
  id:string;
}

function App() {
  const {getRecording,stopRecording,startRecording,resetAudio,listenning, blobs} = useMicrophone();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [listenningAudio, setListenningAudio] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([])

  useEffect(() => {
    const listen = (e:KeyboardEvent) => {
      console.log(e.key);
      if(e.key.toLowerCase() === 'f2' && listenning === 'inactive'){
        startRecording();
      }
    }
    window.addEventListener('keydown', listen);
    return () => window.removeEventListener('keydown',listen);
  },[startRecording,listenning])
  
  useEffect(() => {
    const stopListen = async (e:KeyboardEvent) => {
      if(e.key.toLowerCase() === 'f2'){
        stopRecording();
      } 
    }
    window.addEventListener('keyup', stopListen);
    return () => window.removeEventListener('keyup',stopListen);

  },[getRecording,stopRecording,listenning])
  
  useEffect(() => {
    const hasBlobs = async () => {
      if(blobs.length > 0) {
        setData('');
        setListenningAudio(true)
        const audio = getRecording();
        
        const form = new FormData();
        form.append('audio', audio);

        const transcription = await (await fetch("http://localhost:3333/teste/",
        {
          method:'POST',
          body: form
        })).json();
        resetAudio();

        setListenningAudio(false);
        setData(transcription.message || "não foi possivel entender o audio")
      }
    }
    hasBlobs();
  },[getRecording, blobs,resetAudio])
  
  const gptRequest = async (question:string) => {
    setData('');
    setLoading(true);
    try {
      const message:ConversationType =  {id:v4(),content:"", role:'assistant'}
      setConversations((conversations) => [...conversations, message])
      
      const filteredConversations = conversations.map((conversation) => ({role:conversation.role, content: conversation.content}));

      const response = await fetch('http://localhost:3333/chat3/',
      {method:"POST",
       headers:{
        "content-type":"application/json"
       },
       body:JSON.stringify({messages:[...filteredConversations,{role:'user',content:question}]})  
      });

      let newChunck:any;
      let teste: any;
      
      response.body?.pipeThrough(new TextDecoderStream('utf-8')).pipeTo(new WritableStream({
        write(chunk) {
            if(chunk.startsWith("data: ")) {
              try{
                  newChunck = chunk.replaceAll("data: ",'').replaceAll('[DONE]','').split('\n');
                  newChunck = newChunck.filter((piece:any) => piece !== "")   
                  for (const piece of newChunck) {
                    teste = JSON.parse(piece);
                    console.log(piece)
                    if(teste.choices[0].delta.content) {
                      message.content += teste.choices[0].delta?.content.replaceAll('\n', "<br>")
                      setConversations((conversations) => [...conversations])
                    }                   
                  }
              }
              catch(e){
                  console.log("ERRRRRR")
              }
          }
        }
      }))

    }
    catch {
      toast('Ocorreu um erro no processamento de dados.', {type:'error', autoClose:2000})
    }
    finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    setConversations((conversations) => [...conversations, {id:v4(),content:data, role:'user'}])
    await gptRequest(data);
  }

  const handleClickRecording = () => {
    if(listenning === "inactive") {
      startRecording();
    }
    else {
      stopRecording();
    }
  }


  return (
    <>
      <section className="App container">
        <section className={`conversation-container`}>
          <div className='container-icon'>
            <GPT className='icon-gpt'/>
          </div>

          {conversations.length > 0 && <ul>
          {conversations.map((conversation) => (
            <Conversation item={conversation} key={conversation.id}/>
          ))}
          </ul>}
        </section>
        <div className='controls'>
          {loading &&<div className='loading'> <Loading/> </div>}
          <Input value={data} setText={setData} isListenning={listenningAudio} send={sendMessage}/>
          <button className={`microphone ${listenning === 'recording'?'recording':'inactive'}`} onClick={handleClickRecording}>
            <HiMicrophone size={'100%'}/>
          </button>
        </div>     
      </section>
    <ToastContainer/>
    </>
  );
}

export default App;
