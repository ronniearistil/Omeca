import random
import os
from faker import Faker
from sqlalchemy.orm import Session

try:
    from app.core.database import SessionLocal, engine, Base
except ImportError:
    print("Error: Could not import 'SessionLocal', 'engine', or 'Base' from 'app.core.database'.")
    exit()

try:
    # --- UPDATED: Import the new Enum status ---
    from app.models.machine_event import MachineEvent, AuditStatusEnum
except ImportError:
    print("Error: Could not import 'MachineEvent' or 'AuditStatusEnum' from 'app.models.machine_event'.")
    exit()

# Initialize Faker
fake = Faker()

AGENTS = ['GenAI_Agent_01', 'AutoDev_Agent', 'DataSync_Robot', 'Compliance_Bot', 'Shadow_Compute']
ACTIONS = ['API Call: GPT-4o-mini', 'Compute: Kubernetes Pod (AWS)', 'Database Write Operation', 'Data Transfer (Azure)', 'Compute: Unallocated GPU (GCP)']
EXPLANATIONS_PASS = 'Audit pass: Cost center tag validated against policy "P&L-CAT-101".'
EXPLANATIONS_FAIL = 'Audit fail: Missing "Cost Center" tag. Event quarantined.'

def create_random_machine_event(db: Session, tenant_id: str):
    """Creates one new machine event record."""

    # --- THIS IS THE UPDATED LOGIC ---
    # 1. Decide if the event passed or failed
    is_pass = random.choices([True, False], weights=[0.75, 0.25], k=1)[0]
    
    # 2. Set the narrative and status based on the pass/fail
    narrative = EXPLANATIONS_PASS if is_pass else EXPLANATIONS_FAIL
    status = AuditStatusEnum.AUDITED if is_pass else AuditStatusEnum.PENDING
    # --- END UPDATED LOGIC ---

    agent = random.choice(AGENTS)

    new_event = MachineEvent(
        agent=agent,
        action=random.choice(ACTIONS),
        cost=random.uniform(0.001, 1.5),
        
        # --- FIXED: Use the new field names ---
        rule_narrative=narrative,
        audit_status=status,
        
        chain_hash=fake.sha256(),
        rule_version=f'v1.{random.randint(1,3)}.{random.randint(0,9)}',
        tenant_id=tenant_id
    )
    db.add(new_event)

def seed_database():
    """Generates and commits all seed data."""

    print("Dropping and recreating tables...")
    # Drop all tables to ensure schema is in sync
    Base.metadata.drop_all(bind=engine)
    # Create all tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    TENANT_TO_SEED = "test-tenant"

    try:
        # Note: Clearing is no longer needed since we drop/create
        print(f"Generating 20 new events for tenant: {TENANT_TO_SEED}...")
        for _ in range(20):
            create_random_machine_event(db, tenant_id=TENANT_TO_SEED)

        db.commit()
        print("Successfully seeded database.")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()
        print("Database session closed.")

if __name__ == "__main__":
    seed_database()