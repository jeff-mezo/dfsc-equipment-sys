// // import { SessionContext } from '@supabase/auth-helpers-react';
// import type { SessionContext } from '@supabase/auth-helpers-react';
// import { createContext, useState, useEffect, useContext } from 'react';

// interface User {
//   id: string;
//   email: string;
//   // Add other relevant user data
// }

// interface SessionContextProps {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const SessionContext = createContext<SessionContextProps>({
//   user: null,
//   setUser: () => {},
// });

// export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // Function to update user state
//   const handleSetUser = (newUser: User | null) => setUser(newUser);

//   // Check for existing session on component mount
//   useEffect(() => {
//     // Retrieve user data from local storage (or other preferred storage)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     // <SessionContext.Provider value={{ user, setUser: handleSetUser }}>
//     //   {children}
//     // </SessionContext.Provider>
//     <SessionContext> 
//   );
// };

// export const useSession = () => {
//   const context = useContext(SessionContext);
//   if (!context) {
//     throw new Error('useSession must be used within a SessionProvider');
//   }
//   return context;
// };
