// // src/auth/ProtectedRoute.jsx
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { Box, CircularProgress } from "@mui/material";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../lib/firebase.js";
// 
// /**
//  * Production-Hardened Protected Route
//  * - No flashing of protected content
//  * - Guarantees stable user state
//  * - Handles expired tokens cleanly
//  * - Matches App.jsx SecuredRoute pattern
//  */
// const ProtectedRoute = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     loading: true,
//     user: null,
//   });
// 
//   useEffect(() => {
//     let unmounted = false;
// 
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       if (!unmounted) {
//         setAuthState({
//           loading: false,
//           user: currentUser,
//         });
//       }
//     });
// 
//     return () => {
//       unmounted = true;
//       unsub();
//     };
//   }, []);
// 
//   // 1. Still verifying auth → show full-screen loader
//   if (authState.loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "#0B0F17",
//         }}
//       >
//         <CircularProgress sx={{ color: "#00E5BE" }} />
//       </Box>
//     );
//   }
// 
//   // 2. Not authenticated → redirect cleanly
//   if (!authState.user) {
//     return <Navigate to="/partner-login" replace />;
//   }
// 
//   // 3. Fully authenticated → render children
//   return children;
// };
// 
// export default ProtectedRoute;

// src/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined); 
  const location = useLocation();

  useEffect(() => {
    // Stable subscription: fires exactly once
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  // ------------------------------------------------------------
  // 1. LOADING STATE — prevent redirect before Firebase resolves
  // ------------------------------------------------------------
  if (user === undefined) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ------------------------------------------------------------
  // 2. NOT AUTHENTICATED — redirect to login
  // We pass state so login can redirect the user back where they came from
  // ------------------------------------------------------------
  if (user === null) {
    return (
      <Navigate 
        to="/partner-login" 
        replace 
        state={{ from: location.pathname }} 
      />
    );
  }

  // ------------------------------------------------------------
  // 3. AUTHENTICATED — render protected content
  // ------------------------------------------------------------
  return children;
};

export default ProtectedRoute;
