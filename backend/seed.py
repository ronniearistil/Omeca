# import random
# import os
# from faker import Faker
# from sqlalchemy.orm import Session
# 
# try:
#     from app.core.database import SessionLocal, engine, Base
# except ImportError:
#     print("Error: Could not import 'SessionLocal', 'engine', or 'Base' from 'app.core.database'.")
#     exit()
# 
# try:
#     # --- UPDATED: Import the new Enum status ---
#     from app.models.machine_event import MachineEvent, AuditStatusEnum
# except ImportError:
#     print("Error: Could not import 'MachineEvent' or 'AuditStatusEnum' from 'app.models.machine_event'.")
#     exit()
# 
# # Initialize Faker
# fake = Faker()
# 
# AGENTS = ['GenAI_Agent_01', 'AutoDev_Agent', 'DataSync_Robot', 'Compliance_Bot', 'Shadow_Compute']
# ACTIONS = ['API Call: GPT-4o-mini', 'Compute: Kubernetes Pod (AWS)', 'Database Write Operation', 'Data Transfer (Azure)', 'Compute: Unallocated GPU (GCP)']
# EXPLANATIONS_PASS = 'Audit pass: Cost center tag validated against policy "P&L-CAT-101".'
# EXPLANATIONS_FAIL = 'Audit fail: Missing "Cost Center" tag. Event quarantined.'
# 
# def create_random_machine_event(db: Session, tenant_id: str):
#     """Creates one new machine event record."""
# 
#     # --- THIS IS THE UPDATED LOGIC ---
#     # 1. Decide if the event passed or failed
#     is_pass = random.choices([True, False], weights=[0.75, 0.25], k=1)[0]
#     
#     # 2. Set the narrative and status based on the pass/fail
#     narrative = EXPLANATIONS_PASS if is_pass else EXPLANATIONS_FAIL
#     status = AuditStatusEnum.AUDITED if is_pass else AuditStatusEnum.PENDING
#     # --- END UPDATED LOGIC ---
# 
#     agent = random.choice(AGENTS)
# 
#     new_event = MachineEvent(
#         agent=agent,
#         action=random.choice(ACTIONS),
#         cost=random.uniform(0.001, 1.5),
#         
#         # --- FIXED: Use the new field names ---
#         rule_narrative=narrative,
#         audit_status=status,
#         
#         chain_hash=fake.sha256(),
#         rule_version=f'v1.{random.randint(1,3)}.{random.randint(0,9)}',
#         tenant_id=tenant_id
#     )
#     db.add(new_event)
# 
# def seed_database():
#     """Generates and commits all seed data."""
# 
#     print("Dropping and recreating tables...")
#     # Drop all tables to ensure schema is in sync
#     Base.metadata.drop_all(bind=engine)
#     # Create all tables
#     Base.metadata.create_all(bind=engine)
# 
#     db = SessionLocal()
# 
#     TENANT_TO_SEED = "test-tenant"
# 
#     try:
#         # Note: Clearing is no longer needed since we drop/create
#         print(f"Generating 20 new events for tenant: {TENANT_TO_SEED}...")
#         for _ in range(20):
#             create_random_machine_event(db, tenant_id=TENANT_TO_SEED)
# 
#         db.commit()
#         print("Successfully seeded database.")
# 
#     except Exception as e:
#         print(f"Error seeding database: {e}")
#         db.rollback()
#     finally:
#         db.close()
#         print("Database session closed.")
# 
# if __name__ == "__main__":
#     seed_database()

import random
import uuid
import json
from datetime import datetime, timezone
from faker import Faker
from sqlalchemy.orm import Session

# --- IMPORTS ---
try:
    from app.core.database import SessionLocal, engine, Base
except ImportError:
    print("Error: Could not import 'SessionLocal', 'engine', or 'Base' from 'app.core.database'.")
    exit()

try:
    # L3 Models (Existing)
    from app.models.machine_event import MachineEvent, AuditStatusEnum
    from app.models.audit_log import AuditLog
    
    # L1 & L2 Models
    # We import ExpenseStatus to use the Enum correctly
    from app.models.expense_event import ExpenseEvent, ExpenseStatus
    from app.models.reconciliation_result import ReconciliationResult
except ImportError as e:
    print(f"Error importing models: {e}")
    exit()

# Initialize Faker
fake = Faker()

# --- L3 CONFIGURATION ---
AGENTS = ['GenAI_Agent_01', 'AutoDev_Agent', 'DataSync_Robot', 'Compliance_Bot', 'Shadow_Compute']
ACTIONS = ['API Call: GPT-4o-mini', 'Compute: Kubernetes Pod (AWS)', 'Database Write Operation', 'Data Transfer (Azure)', 'Compute: Unallocated GPU (GCP)']
EXPLANATIONS_PASS = 'Audit pass: Cost center tag validated against policy "P&L-CAT-101".'
EXPLANATIONS_FAIL = 'Audit fail: Missing "Cost Center" tag. Event quarantined.'

# --- L1 CONFIGURATION ---
VENDORS = ["AWS", "GCP", "Slack", "Notion", "HubSpot", "Salesforce", "Linear", "Vercel"]
TEAMS = ["Engineering", "Sales", "Marketing", "Operations", "Product"]

def create_random_machine_event(db: Session, tenant_id: str):
    """Creates one new machine event record (L3)."""
    is_pass = random.choices([True, False], weights=[0.75, 0.25], k=1)[0]
    narrative = EXPLANATIONS_PASS if is_pass else EXPLANATIONS_FAIL
    status = AuditStatusEnum.AUDITED if is_pass else AuditStatusEnum.PENDING

    new_event = MachineEvent(
        agent=random.choice(AGENTS),
        action=random.choice(ACTIONS),
        cost=random.uniform(0.001, 1.5),
        rule_narrative=narrative,
        audit_status=status,
        chain_hash=fake.sha256(),
        rule_version=f'v1.{random.randint(1,3)}.{random.randint(0,9)}',
        tenant_id=tenant_id
    )
    db.add(new_event)

def create_random_expense_event(db: Session, tenant_id: str):
    """Creates one new expense event record (L1)."""
    vendor = random.choice(VENDORS)
    amount = round(random.uniform(10.00, 5000.00), 2)
    team = random.choice(TEAMS)
    
    new_expense = ExpenseEvent(
        # 1. Let the DB handle 'id' (Integer, Auto-increment)
        # 2. Put the UUID in 'transaction_id'
        transaction_id=str(uuid.uuid4()),
        
        source_system="Seed_Script",
        amount=amount,
        currency="USD",
        
        # 3. Use 'merchant_name' instead of 'vendor'
        merchant_name=vendor,
        
        timestamp=datetime.now(timezone.utc),
        
        # 4. Use the proper Enum
        status=ExpenseStatus.NEW,
        
        # 5. Stash extra info in JSON payload since columns don't exist
        raw_payload={
            "team": team,
            "description": f"Monthly subscription for {vendor}",
            "tenant_id": tenant_id
        }
    )
    db.add(new_expense)

def seed_database():
    """Generates and commits all seed data."""

    print("⚠️  NUKE PROTOCOL INITIATED...")
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    
    print("Recreating tables (including new L1/L2 tables)...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    TENANT_TO_SEED = "test-tenant"

    try:
        print(f"🌱 Seeding 20 L3 Machine Events...")
        for _ in range(20):
            create_random_machine_event(db, tenant_id=TENANT_TO_SEED)

        print(f"🌱 Seeding 10 L1 Expense Events (History)...")
        for _ in range(10):
            create_random_expense_event(db, tenant_id=TENANT_TO_SEED)

        db.commit()
        print("✅ Successfully seeded database with L1, L2, and L3 structures.")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()
        print("Database session closed.")

if __name__ == "__main__":
    seed_database()