import React, { ReactNode } from 'react'
import { ConversationType } from '../../App'
import styles from './styles.module.css'
import DOMParserReact from 'dom-parser-react'

type Props =  {
    item: ConversationType
}

const Conversation = ({item}:Props) => {
  return (
    <li className={item.role === 'user'? styles.user:styles.gpt}>
      <DOMParserReact source={item.content}/>
    </li>
  )
}

export default Conversation