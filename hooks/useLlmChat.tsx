import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useModal } from './useModal';
import { useAuth } from '../context/Auth';

export function useLlmChat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { user } = useAuth();

  // useEffect(() => {
  //   if (chatAreaRef.current) {
  //     chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  //   }
  // }, [chatHistory]);


  // useEffect(() => {
  //   assistantPost('Hello! I am Wimpbot. I can help you?')
  // }, [])

  // const assistantPost = (message: string) => {
  //   const data: any = {
  //     id: chatHistory.length + 1,
  //     roleName: 'assistant',
  //     chatIcon: '/icons/llm-logo.svg',
  //     messageText: message,
  //   };
  //   setChatHistory([...chatHistory, data]);
  // }

  // const savedUserPost = (message: string) => {
  //   const data: any = {
  //     id: chatHistory.length + 1,
  //     roleName: 'user',
  //     chatIcon: user.image,
  //     messageText: message,
  //   };
  //   setChatHistory([...chatHistory, data]);
  //   setUserPosts([...userPosts, data]);
  // }

  // const userPost = async (message: string) => {
  //   const response = await fetch(process.env.NEXT_PUBLIC_SYSTEM_CHAT_URL as string, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'text/event-stream'
  //     },
  //     body: JSON.stringify({ content: message })
  //   });

  //   if (response.body) {
  //     const reader = response.body.getReader();
  //     let finalContent = '';
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
  //       const textChunk = new TextDecoder().decode(value);
  //       finalContent += textChunk;

  //       setChatHistory(prevHistory => {
  //         const lastMessage = prevHistory[prevHistory.length - 1];
  //         const updatedHistory = lastMessage && lastMessage.roleName === 'assistant'
  //           ? prevHistory.slice(0, -1)
  //           : [...prevHistory];
  //         return [...updatedHistory, { id: prevHistory.length + 1, roleName: 'assistant', chatIcon: '/icons/llm-logo.svg', messageText: finalContent }];
  //       });
  //     }
  //   }
  // }

  const handleMessageInput = ((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  });

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    callback?: (...params: any[]) => void,
    ...params: any[]
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (callback) {
        callback(...params);
      }
    }
  };


  // const postMessage = async () => {
  //   if (!message.trim()) {
  //     return;
  //   }
  //   setMessage('');
  //   savedUserPost(message);
  //   await userPost(message);
  // };

  return {
    message,
    setMessage,
    userPosts,
    chatHistory,
    setChatHistory,
    chatAreaRef,
    handleMessageInput,
    handleKeyDown,
    postMessage
  };
}