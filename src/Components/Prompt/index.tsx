import React, { useRef } from 'react'
import styles from './styles.module.css'
import {AiOutlineSend} from 'react-icons/ai'
import Loading from '../Loading';

type Props = {
  placeholder?:string;
  value:string;
  setText:React.Dispatch<React.SetStateAction<string>>;
  isListenning:boolean;
  send:() => void;
}
const Input = ({placeholder,value,setText, isListenning,send}:Props) => {
  const textArea =  useRef<HTMLTextAreaElement | null>(null)

  const autoResize = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.target instanceof HTMLTextAreaElement) {
      e.target.style.height = `${30}px`
      const scHeight = e.target.scrollHeight;
      e.target.style.height = `${scHeight}px`
     
    }
  }

  return (
    <div className={styles.container} onClick={() => {textArea.current?.select()}}>
      <textarea ref={textArea} className={styles.textarea} placeholder={placeholder} value={value} onChange={(e) => {setText(e.target.value)}} onKeyUp={autoResize}></textarea>
      <button className={styles.send} onClick={send} disabled={value === '' || value.toLowerCase().trim() === "não foi possivel entender o audio"}>
        <AiOutlineSend size='100%'/>  
      </button>
      {isListenning && 
      <div className={styles.loading}>
        <Loading/>
      </div>
      }
    </div>
  )
}

export default Input