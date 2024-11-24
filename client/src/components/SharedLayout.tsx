import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { socket } from '../sockets/socket';
import { ChatElement, addMessage } from '../redux/slice/chatData-slice';

const SharedLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessage = (data: ChatElement) => {
        const {message, senderId, toId, timestamp} = data;
        dispatch(addMessage({toId, senderId, message, timestamp}));
    };
    socket.on('getMessage', getMessage);

    return () => {
        socket.off("getMessage", getMessage);
    }
  }, [dispatch]);

  return (
      <main>
        <Outlet />
      </main>
  );
};

export default SharedLayout;
