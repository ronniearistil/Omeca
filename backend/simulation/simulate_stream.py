import time
import random
import requests
import uuid
from datetime import datetime, timezone

# Configuration
API_URL = "http://localhost:8000/api/v1" 
VENDORS = ["AWS", "GCP", "Slack", "Notion", "HubSpot", "Salesforce", "Linear", "Vercel"]
TEAMS = ["Engineering", "Sales", "Marketing", "Operations"]

def generate_expense():
    """Generates a random L1 Expense Event matching your new DB Model"""
    amount = round(random.uniform(10.00, 5000.00), 2)
    vendor = random.choice(VENDORS)
    
    # Introduce occasional anomalies (Day 2 prep)
    is_anomaly = random.random() < 0.05 
    if is_anomaly:
        amount = amount * 10 

    # MATCHING YOUR DB SCHEMA EXACTLY:
    event = {
        "transaction_id": str(uuid.uuid4()),      # Was 'event_id'
        "source_system": "Brex_Emulator",
        "amount": amount,
        "currency": "USD",
        "merchant_name": vendor,                  # Was 'vendor'
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "new",                          # Matches Enum
        "raw_payload": {                          # Stash extra data here
            "team": random.choice(TEAMS),
            "description": f"Monthly subscription for {vendor}"
        }
    }
    return event

def run_simulation():
    print(f"🚀 OMECA Simulation Started. Target: {API_URL}/expenses/")
    print("Press Ctrl+C to stop.")
    
    try:
        while True:
            event_data = generate_expense()
            
            # Send to API (Ingest)
            try:
                response = requests.post(f"{API_URL}/expenses/", json=event_data)
                
                if response.status_code in [200, 201]:
                    data = response.json()
                    print(f"✅ [L1 Ingest] {event_data['merchant_name']} ${event_data['amount']} -> {data.get('status', 'OK')}")
                else:
                    print(f"❌ [Error] {response.status_code}: {response.text}")
            except requests.exceptions.ConnectionError:
                 print(f"❌ [Connection Error] Is the server running?")

            time.sleep(random.randint(1, 3))
            
    except KeyboardInterrupt:
        print("\n🛑 Simulation Stopped.")

if __name__ == "__main__":
    run_simulation()