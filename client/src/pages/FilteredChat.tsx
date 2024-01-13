import React from 'react'
import { userChatInterface } from './Chat';
import { deflate } from 'zlib';
import { useFetchUserRecipient } from '../hooks/useFetchRecipient';

interface UserChatProps {
    chat: userChatInterface;
    userInfo: any;
    index: Number;
  }

const FilteredChat: React.FC<UserChatProps> =({chat,userInfo,index})=> {
    const { recipientUser } = useFetchUserRecipient(userInfo, chat);
  return (
    <>
        {recipientUser}
    </>
  )
}



export default FilteredChat