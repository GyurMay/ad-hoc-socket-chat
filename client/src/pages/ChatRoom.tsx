import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChatDataState, addMessage } from '../redux/slice/chatData-slice';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../sockets/socket';
import { RootState } from '../redux/store';


function ChatRoom() {
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers?.users || []);
    const username = useSelector((state: RootState) => state.onlineUsers.value || '');
    const [message, setMessage] = useState('');
    const {userId} = useParams();
    const allChatData = useSelector((state: {chatData: ChatDataState}) => state.chatData).chatData;
    const chatData = allChatData.filter(x => (x.senderId === username && x.toId === userId) || (x.senderId === userId && x.toId === username));

    useEffect(() => {
        window.scrollTo()
    }, [chatData.length])

    function checkUserIdValid(userId:string|undefined){
        if(!userId || userId.trim() == '' || !onlineUsers.includes(userId)){
            return false;
        }
        return true;
    }
    if(chatData.length == 0 && !checkUserIdValid(userId)){
        return <>User Doesn't exist <Navigate to="/"></Navigate></>
    }

    return (
    <>
    <div className='chatBox'>
        {/* <Link to='/'>All users</Link><br /> */}
        chat with {userId}
        {/* {onlineUsers} */}
        
        {
        chatData?.map((x:any) => {
            const isSender = x.senderId === username ? "myMessage":"othersMessage";
            const offlineOrNot = onlineUsers.includes(userId||'') ? "" : " (Offline)";
            return (
                <div className={'chatElement '+isSender}>
                    <div className={"name "}>{x.senderId + (isSender == "othersMessage" ? offlineOrNot:'')} <span className='timestamp'>{x.timestamp}</span></div>
                    <div className={"message"}>{x.message}</div>
                </div>
            )
        })
    }

  

    </div>
    
    <form name="messageForm" className='messageForm' onSubmit={(e:any) => e.preventDefault()}>
        <input type="text" id="messageInput" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="submit" value="SEND" onClick={() => {
                const timestamp = ((new Date()).toLocaleString());
                const sendData = {toId:userId||'', senderId: username||'', message, timestamp};
                dispatch(addMessage(sendData));
                socket.emit('sendMessage', sendData);
                console.log('emitted message sendMessage');
                setMessage('');
            }}/>  
    </form>
 </>
    )
}

export default ChatRoom