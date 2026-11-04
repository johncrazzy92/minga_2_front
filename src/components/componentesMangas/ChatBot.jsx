import { useState, useEffect } from 'react';
import socket from './Socket';
import ChatIcon from './Icono';

import { useSelector, useDispatch } from 'react-redux';
import messageBot from '../../redux/actions/messageBot.js';
import messagesBot from '../../redux/actions/messagesBot.js';

export default function Chatbot() {


    const { msg, messages } = useSelector((store) => store.messagesBotReducer);
    const dispatch = useDispatch();

    //const [messages, setMessages] = useState([{ value: 'Buenas!, Soy Mingabot :) ¿Como puedo ayudarte?', id: 'bot' }]);
    //const [msg, setMsg] = useState('');
    const [chatOpen, setChatOpen] = useState(false);

    function toggleChat() {
        setChatOpen(!chatOpen);
    }

    function closeChat() {
        setChatOpen(false);
    }

    useEffect(() => {
        /*    const responseHandler = async (response) => {
               setMessages(prevMessages => {
   
                   return [...prevMessages, { value: response, id: 'bot' }];
               });
           }; */
        const responseHandler = async (response) => {
            dispatch(messagesBot({ value: response, id: 'bot' }));
        };

        socket.on('connection', () => {
            console.log('Conectado al servidor');

        });

        socket.on('chatBot', responseHandler);

    }, []);

    /*  function sendMsg(e) {
         e.preventDefault();
         if (msg !== '' && msg !== ' ') {
             setMessages(prevMessages => [...prevMessages, { value: msg, id: 'user' }]);
             socket.emit('chatBot', msg);
             setMsg('');
         }
     } */
    function sendMsg(e) {
        if (e.key === 'Enter' || e.type === 'submit') {
            e.preventDefault();
            if (msg != '' && msg != ' ') {
                dispatch(messagesBot({ value: msg, id: 'user' }));
                socket.emit('chatBot', msg);
                dispatch(messageBot(''));
            }
        }
    }

    function Message({ message }) {
        return (
            <li className={message.id === 'bot' ? 'bg-blue-300 text-sm m-1 text-end rounded-md p-2' : 'bg-orange-300 text-sm m-1 rounded-md p-2'}>
                {message.value}
            </li>
        );
    }

    return (
        <div className={`fixed bottom-2 hidden lg:block right-2 ${chatOpen ? 'w-96' : 'w-12'}`}>
            {/* Renderiza el icono del chat */}
            <ChatIcon onClick={toggleChat} isVisible={chatOpen} />

            {chatOpen && (
                <div>
                    <button className="close-button" onClick={closeChat}>
                        <img className='h-7 w-7' src="/img/x.png" alt="Close" />
                    </button>
                    <form onSubmit={sendMsg} className='bg-orange-500 w-full min-h-[320px] max-h-[500px] border-4 flex flex-col items-center rounded-lg'>
                        <div className='w-full min-h-[320px] max-h-[500px] overflow-y-auto mb-1 bg-white'>
                            <ul>
                                {messages.map((message, index) => (
                                    <>
                                        <Message key={index} message={message} />
                                    </>
                                ))}
                            </ul>
                        </div>
                        <div className='flex w-full h-7 justify-around'>
                            <input value={msg} onChange={(e) => dispatch(messageBot(e.target.value))} className='w-8/12 h-5' type="text" />
                            <button className='w-[20%] bg-white' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}