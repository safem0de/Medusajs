### Document and Installation
https://docs.medusajs.com/learn/installation

#### 0. Requirement and recommend
```bash 
node.js 20+
git cli
postgres
``` 
```bash 
nvm  # to install node
1. download installer
2. nvm --version    # check nvm version
3. nvm ls           # check nvm list
4. 
nvm install lts
nvm use lts
5.
npm -v              # check npm version
npx -v              # check npx version
``` 
#### 1. Run docker compose
```bash 
docker compose up -d
``` 
or (for Rancher)
```bash 
nerdctl compose up -d
``` 
#### 2. Run medusa command for create project
```bash
npx create-medusa-app@latest my-medusa-store
```

#### 3. Config medusa project
```bash
D:\Nextjs\Medusajs>npx create-medusa-app@latest my-medusa-store
? Would you like to create the Next.js storefront? You can also create it later Yes
? Enter your Postgres username <follow docker-compose>
? Enter your Postgres password <follow docker-compose>
? Enter your Postgres users database name <follow docker-compose>
```

#### 4. install medusa CLI (global)
```bash
npm install -g @medusajs/medusa-cli
```
check version

```bash
medusa --version
```
---
backend
```bash
npx medusa develop --host 0.0.0.0
```
frontend
```bash
npm run dev
```
