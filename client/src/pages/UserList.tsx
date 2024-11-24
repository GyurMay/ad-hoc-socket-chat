import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { socket } from '../sockets/socket';
import { setUsername, setOnlineUsers} from '../redux/slice/onlineUsers-slice';
import { Link, useParams } from 'react-router-dom';


function UserList() {
    const dispatch = useDispatch();
    const {userId} = useParams();
    // const userListRef = useRef(null);
    const [userListOpen, setUserListOpen] = useState(false);
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers?.users || []);
    // const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [usernameInput, setUsernameInput] = useState('');
    const username = useSelector((state: RootState) => state.onlineUsers.value || '');
    const [showInput, setShowInput ] = useState(username != '');
    // console.log(socket)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('Connected to server!');
        }

        function onDisconnect() {
            setIsConnected(false);
            // dispatch(setOnlineUsers([]));
            setShowInput(false);
            console.log('Disconnected from server!');
        }

        function onUpdateUsers(users: string[]) {
            // const users = JSON.parse()
            console.log('Received users:', users);
            dispatch(setOnlineUsers(users))
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('users', onUpdateUsers); // Listen for user updates

        // Connect the client socket
        // socket.connect();


        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('users', onUpdateUsers);
        };
    }, [dispatch]);





    return (
        <>
        {
        showInput ? 
        (
        <>
            <div id="toggleList" onClick={() => {
                console.log('clicked toggle')
                const userListEl:(HTMLElement|null) = document.querySelector('.usersList');
                const chatBoxEl:(HTMLElement|null) = document.querySelector('.chatBox');
                if(userListEl){
                    if(!userListOpen){
                        userListEl.style.marginLeft = '0';
                        if(chatBoxEl){
                            chatBoxEl.style.marginLeft = '0px';
                            chatBoxEl.style.width = '100%';
                        }
                        setUserListOpen(true);
                    }else{
                        userListEl.style.marginLeft = '-300px';
                        if(chatBoxEl){
                            chatBoxEl.style.marginLeft = '-300px';
                            chatBoxEl.style.width = 'calc(100% - 300px);';
                        }
                        setUserListOpen(false);
                    }
                }
                
            }}>toggle users</div>
            <div className={' '}>
            <ul>
                {/* You are {isConnected ? 'connected' : 'disconnected'} */}
                <div className='usersList'>-- Online users --
                {onlineUsers.length > 0 ? (
                    onlineUsers.map((uname, index) => {
                        return (
                            <li key={index}>
                                {(uname !== username) ? <Link className={uname === userId ? 'activeChat':''} to={'/chat/'+uname}>{uname}</Link>: <Link to='' >{uname+' (You)'}</Link>}
                            </li>
                        );
                    })
                ) : (
                    <li>No users online</li>
                )}
                </div>
            </ul>
            </div>
        </>
        ): 
        (
            <form className='nameForm' onSubmit={(e) => e.preventDefault()}>
                <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}></input>
                <button onClick={() => {
                    setShowInput(true);
                    socket.connect();
                    socket.auth = {usernameInput};
                    socket.emit('usernameSet', usernameInput);
                    dispatch(setUsername(usernameInput));
                    setUsernameInput('');
                }}>save username</button>
            </form>
        )
        }
        </>
    );
}

export default UserList;
