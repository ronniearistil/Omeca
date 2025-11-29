import { useState, useEffect } from 'react';

const API_BASE = "http://127.0.0.1:8000/api/v1";

export function useOmecaEngine() {
  const [metrics, setMetrics] = useState({
    l1: { score: 0, status: 'loading' },
    l2: { rate: 0, volume: 0, auto: 0, exceptions: 0 },
    l3: { rate: 0, proofs: 0, hashes: [] },
    feed: [],
    isConnected: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetching for speed
        const [l1Res, l2Res, l3Res] = await Promise.all([
          fetch(`${API_BASE}/integrity/score`),
          fetch(`${API_BASE}/reconciliation/status`),
          fetch(`${API_BASE}/governance/proofs`)
        ]);

        if (!l1Res.ok || !l2Res.ok || !l3Res.ok) throw new Error("Engine Offline");

        const l1 = await l1Res.json();
        const l2 = await l2Res.json();
        const l3 = await l3Res.json();

        // Merge Feeds for the "Matrix" activity stream
        // We combine L2 actions (Reconciling) and L3 actions (Notarizing)
        const combinedFeed = [
          ...(l2.latest_reconciliations || []).map(item => ({
            id: `l2-${item.id}`,
            type: 'L2',
            text: `Reconciled Event #${item.id}`,
            status: item.status,
            meta: item.gl_account || 'Pending',
            time: Date.now() // Mock time for sorting if backend time missing
          })),
          ...(l3.latest_blocks || []).map(item => ({
            id: `l3-${item.id}`,
            type: 'L3',
            text: `Block Mined: ${item.hash_preview}`,
            status: 'IMMUTABLE',
            meta: 'SHA-256',
            time: new Date(item.timestamp).getTime()
          }))
        ].sort((a, b) => b.time - a.time).slice(0, 10);

        setMetrics({
          l1: { 
            score: l1.metrics.integrity_score, 
            status: l1.status 
          },
          l2: { 
            rate: l2.metrics.reconciliation_rate, 
            volume: l2.metrics.total_volume,
            auto: l2.metrics.auto_reconciled,
            exceptions: l2.metrics.exceptions
          },
          l3: { 
            rate: l3.verification_rate, 
            proofs: l3.total_proofs, 
            hashes: l3.latest_blocks 
          },
          feed: combinedFeed,
          isConnected: true
        });

      } catch (err) {
        console.error("Engine Disconnected:", err);
        setMetrics(prev => ({ ...prev, isConnected: false }));
      }
    };

    // Poll every 1000ms (1 second)
    const interval = setInterval(fetchData, 1000);
    fetchData(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  return metrics;
}