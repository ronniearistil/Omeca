# Melucra

**The Explainability Core powering the $1.3 Trillion Machine Economy.**  
Omeca captures every action and decision at the source, giving enterprises  
clear context, verified proof, and financial clarity across the machine economy.

### 🚀 Run Locally
```bash
npm install
npm run dev
cd backend --> python run.py

# View Component Tree
# Backend
tree -L 4 app
# Frontend
tree -L 4 src
# All Tree
tree -L 3 .


# Seed " Current use "Nuke and Pave" not best practice convert to alembic once the basics have been stablized.
python seed.py


# Key End Points
http://127.0.0.1:8000/api/v1/reconciliation/status
http://127.0.0.1:8000/api/v1/integrity/score
http://127.0.0.1:8000/api/v1/reconciliation/status
http://127.0.0.1:8000/api/v1/governance/proofs

# Deployment
1. npm run build
2. Fly - flyctl deploy
Gcloud - gcloud run deploy omeca-backend --source .

# New Termial 
code -n
