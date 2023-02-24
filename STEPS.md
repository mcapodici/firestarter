# Steps taken to create this repo:

* Created new repo in Github, MIT license.
* Create NextJS app:

```
mkdir nextjs
cd nextjs
npx create-next-app@latest
```

Version: `create-next-app@13.1.6`

Answers given:

> ✔ What is your project named? … firestarter-nextjs  
> ✔ Would you like to use TypeScript with this project? … Yes  
> ✔ Would you like to use ESLint with this project? … Yes  
> ✔ Would you like to use `src/` directory with this project? … Yes  
> ✔ Would you like to use experimental `app/` directory with this project? … No   
> ✔ What import alias would you like configured? … @/*  

* Set up project in Vercel: 
    * Log into Vercel
    * Add a new project
    * Use this repo
    * Choose root directory `firestarter-nextjs`
    * Click Deploy

    This will deploy off main, so use branches to avoid deployments.

    Note: this got deployed to `https://firestarter-three.vercel.app/` in my case.

    No code changes to repo.

* Add testing

```
yarn add --dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom jest jest-environment-jsdom
```

For good measure rearrange `package.json` so things like `typescript` are in `devDependencies`

Copied various files from https://github.com/vercel/next.js/blob/canary/examples/with-jest/, adapting them. See [this PR](https://github.com/mcapodici/firestarter/pull/2) for details.

Removed test that only passes for old next.js welcome page. Since the welcome page will go, no need to really get that working.

* Add testing to Github action (.github/workflows/firestarter-nextjs-test.yml)
* Add tailwind support

* Create a Firebase Project
* Copy the JSON of all cliend-side variables to these environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN
NEXT_PUBLIC_FIREBASE_PROJECTID
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET
NEXT_PUBLIC_FIREBASE_SENDERID
NEXT_PUBLIC_FIREBASE_APPID
```

    * In codespaces this can be set under {url_to_repo}/settings/secrets/codespaces/new
    * In vercel, se this under {url_to_project}/settings/environment-variables

Note that none of this configuration is secret, it will be available in the bundled JS.

* Enable Auth in Firebase portal - just Email/Password for now.
* Enable Firestore in Firebase portal - https://console.firebase.google.com/project/fire-starter-demo/firestore 

Github Firebase Deployment Integration

* Added permissions to project IAM role for Firebase Rules Admin and Service Account User (see https://github.com/marketplace/actions/github-action-for-firebase?version=v11.22.0)
* Added environment secret GCP_SA_KEY and environment variable PROJECT_ID as per (see https://github.com/marketplace/actions/github-action-for-firebase?version=v11.22.0)

