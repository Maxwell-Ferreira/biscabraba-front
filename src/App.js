import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Main from "./pages/Main";

function App() {
  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('https://biscabraba.herokuapp.com');
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App to-center">
      {Socket ? <Main Socket={Socket} /> : <div>Carregando</div>}
    </div>
  );
}

export default App;
