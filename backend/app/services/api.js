export async function fetchMachineEvents() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/reports");
  if (!res.ok) throw new Error("Failed to fetch machine events");
  return res.json();
}
