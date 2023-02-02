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