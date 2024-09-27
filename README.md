# aptitude-test

Create a website when a school student user comes, signs up using their information, pays Rs 1000 fee and gives an aptitude test of 2 horus based on their convinience

# Setting up the project locally

### Step1: Installing the dependencies

```
npm install
```

### Step2: Copy .env.sample to .env

### Step3: Update all the .env variables with the generated keys/ values

#### 1. Create database and Update DB URL

#### 2. Create Google client ID and client secret from this url https://console.cloud.google.com/apis/credentials

#### 3. Create Github client ID and client secret from this url https://github.com/settings/developers#oauth-apps

#### 4. Create Discord client ID and client secret from this url https://discord.com/developers/applications/

### Step4: Migrate Prisma schema to generate tables

```
npx prisma migrate dev
```
