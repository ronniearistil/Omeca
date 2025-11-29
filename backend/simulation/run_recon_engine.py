# import time
# import sys
# import os
# 
# # Allow imports from root so we can access app.*
# sys.path.insert(0, os.path.realpath("."))
# 
# from app.core.database import SessionLocal
# from app.services.reconciliation_service import run_auto_reconciliation
# 
# def start_engine():
#     print("🧠 OMECA Reconciliation Engine Started...")
#     print("   [Mode: L2 Continuous Close]")
#     print("   [Target: 'NEW' expenses]")
#     print("----------------------------------------")
#     
#     db = SessionLocal()
#     
#     try:
#         while True:
#             # Run the Service Logic
#             count = run_auto_reconciliation(db)
#             
#             if count > 0:
#                 # Visual Feedback for the Demo
#                 print(f"⚡ [L2 Engine] Reconciled {count} event(s). Status updated.")
#             else:
#                 # Heartbeat (overwrites the line so it doesn't spam)
#                 sys.stdout.write("💤 [L2 Engine] Waiting for events...\r")
#                 sys.stdout.flush()
#             
#             # Run every 2 seconds to simulate near real-time processing
#             time.sleep(2) 
#             
#     except KeyboardInterrupt:
#         print("\n🛑 Engine Stopped.")
#     finally:
#         db.close()
# 
# if __name__ == "__main__":
#     start_engine()

import time
import sys
import os

# Allow imports from root so we can access app.*
sys.path.insert(0, os.path.realpath("."))

from app.core.database import SessionLocal

# ✅ THE FIX: Import MachineEvent to register it with SQLAlchemy
# This prevents the "failed to locate name 'MachineEvent'" crash
from app.models.machine_event import MachineEvent 
from app.services.reconciliation_service import run_auto_reconciliation

def start_engine():
    print("🧠 OMECA Reconciliation Engine Started...")
    print("   [Mode: L2 Continuous Close + L3 Governance]")
    print("   [Target: 'NEW' expenses]")
    print("----------------------------------------")
    
    db = SessionLocal()
    
    try:
        while True:
            # Run the Service Logic
            count = run_auto_reconciliation(db)
            
            if count > 0:
                print(f"⚡ [L2 Engine] Reconciled {count} event(s). Proofs generated.")
            else:
                sys.stdout.write("💤 [L2 Engine] Waiting for events...\r")
                sys.stdout.flush()
            
            time.sleep(2) 
            
    except KeyboardInterrupt:
        print("\n🛑 Engine Stopped.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    start_engine()