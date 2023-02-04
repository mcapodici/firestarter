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

* Add testing to Github action

* Visit actions page https://github.com/mcapodici/firestarter/actions/new
* Find Node.js By GitHub Actions, and click Configure.
* Rename file generated to `tests.yml`
* 