import React, { useEffect, useState } from 'react'
import { ConversationType } from '../../App'
import styles from './styles.module.css'
import {MdOutlineRecordVoiceOver} from 'react-icons/md'
import { toast } from 'react-toastify'

type Props =  {
    item: ConversationType
}

const Conversation = ({item}:Props) => {
  const [synth] = useState(window.speechSynthesis);
  const [utter] = useState(new SpeechSynthesisUtterance())

  const talk = async () => {
    if(!synth.speaking){
      utter.text = item.content;
      synth.speak(utter);
    }
  }
  useEffect(() => { 
    try {
      utter.voice = synth.getVoices()[0];
      utter.pitch = 1;
      utter.rate = 1.5;
    }
    catch {
      toast('Lamento, mas não achamos, uma voz no seu sistema')
    }
    
  },[synth, utter])
  

  return (
    <li className={item.role === 'user'? styles.user:styles.gpt}>
      {item.content}
      <button aria-label='lister message' onClick={talk} className={styles.voice}><MdOutlineRecordVoiceOver size={"100%"}/></button>
    </li>
  )
}

export default Conversation