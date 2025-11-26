const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getAuthToken() {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/dev-token`);
  
  if (!res.ok) {
    // Try to get more error detail from the body
    const body = await res.text();
    console.error("Failed to get auth token:", res.status, body);
    throw new Error(`Failed to get token: ${res.status}`);
  }

  const { access_token } = await res.json();
  return access_token;
}

/**
 * Certify a specific event (audit action)
 */
export async function certifyEvent(eventId, narrative, reason_code = null) {
  const res = await fetch(`${API_BASE_URL}/api/v1/audit/${eventId}/certify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ narrative, reason_code }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Certification failed:", res.status, text);
    throw new Error(text || "Certification failed");
  }

  return res.json();
}

