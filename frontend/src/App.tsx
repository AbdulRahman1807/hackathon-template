import { useEffect, useState } from "react";
import { getHealth } from "./services/health";

interface HealthResponse {
  status: string;
  message: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHealth() {
      try {
        const data = await getHealth();
        setHealth(data);
      } catch (err) {
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Hackathon Template</h1>

      <p>Frontend is running.</p>

      <br />

      <h2>Backend Status</h2>

      {loading && <p>Connecting...</p>}

      {error && <p>{error}</p>}

      {health && (
        <>
          <p>
            <strong>Status:</strong> {health.status}
          </p>
          <p>
            <strong>Message:</strong> {health.message}
          </p>
        </>
      )}
    </main>
  );
}

export default App;