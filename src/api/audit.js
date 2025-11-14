export async function certifyEvent(eventId, narrative, reason_code) {
  const token = await getAuthToken();
  const res = await fetch(`${API_BASE_URL}/api/v1/audit/${eventId}/certify`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ narrative, reason_code }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Certify failed:", errBody);
    throw new Error(`Certify failed: ${res.status}`);
  }

  return res.json();
}
