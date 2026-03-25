import { useState, useEffect } from "react";
import { io, Socket as SocketType } from "socket.io-client";
import Main from "./pages/Main";

function App() {
  const [Socket, setSocket] = useState<SocketType | null>(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
    const newSocket = io(backendUrl);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <div className="App to-center">
      {Socket ? <Main Socket={Socket} /> : <div>Carregando</div>}
    </div>
  );
}

export default App;
