import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const socket = io(SOCKET_URL, {
  autoConnect: false, // Prevents aggressive connection spam when socket is idle
  transports: ['websocket', 'polling'],
});

export default socket;