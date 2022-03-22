import { createContext, useState } from 'react';

export const UserContext = createContext({});


export default function UserCtxWrap({ children }) {
  const [role, setRole] = useState("ADMIN");
  const [jwt, setJwt] = useState("");
  return (
    <UserContext.Provider value={{ role, setRole, jwt, setJwt }}>
      {children}
    </UserContext.Provider>
  )
}