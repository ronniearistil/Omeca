// export async function certifyEvent(eventId, narrative, reason_code) {
//   const token = await getAuthToken();
//   const res = await fetch(`${API_BASE_URL}/api/v1/audit/${eventId}/certify`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ narrative, reason_code }),
//   });
// 
//   if (!res.ok) {
//     const errBody = await res.text();
//     console.error("Certify failed:", errBody);
//     throw new Error(`Certify failed: ${res.status}`);
//   }
// 
//   return res.json();
// }

// Ensure this line is at the top of your API utility file 
// (e.g., src/omeca-core/api/auth.js, or similar location where getAuthToken is defined)
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000'; 


export async function certifyEvent(eventId, narrative, reason_code) {
  // 1. Get the Bearer Token from the authentication utility
  const token = await getAuthToken();
  
  // 2. Construct the URL using the dynamic/production-ready API_BASE_URL
  const res = await fetch(`${API_BASE_URL}/api/v1/audit/${eventId}/certify`, {
    method: "POST",
    headers: {
      // 3. Set Authorization header with the Bearer token
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // 4. Send the required certification payload
    body: JSON.stringify({ narrative, reason_code }),
  });

  if (!res.ok) {
    // Robust error handling for non-200 responses
    const errBody = await res.text();
    console.error("Certify failed:", errBody);
    throw new Error(`Certify failed: ${res.status} - ${errBody}`);
  }

  // Return the successful response body (likely the new Proof object)
  return res.json();
}