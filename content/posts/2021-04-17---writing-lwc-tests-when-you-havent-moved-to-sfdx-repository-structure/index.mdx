---
title: Writing LWC tests when you haven't moved to SFDX repository structure
date: "2021-04-17T18:00:32.169Z"
slug: "writing-lwc-tests-when-you-havent-moved-to-sfdx-repository-structure"
template: "post"
draft: false
category: "LWC"
tags:
  - "salesforce"
  - "lwc"
  - "testing"
description: Utilizing LWC unit tests with package.xml based repository
---

If you are yet to migrate to SFDX but still want to start using Lightning Web Components, then it’s possible to do it. However, one of the best reasons to start using LWC is that it’s *testable*. `Jest` tests to test the front-end bring a lot of advantages that the `Aura` framework doesn't have. Well, `Aura` has it but it's so tedious that it's as if it's non-existent.

As you are still using the pre-sfdx repository structure, your code is likely to be in this structure:

```
<my-project-dir>
|- src
    |- aura
    |- classes
    ...
    |- package.xml
...
|- README.md
```

Let’s say you started with your first `helloWorld` LWC component. That'd go into the `src > lwc >` directory and as you write your first `Jest` test, you'll place it in the `__tests__` directory. Also, we have to make sure that we install the `Jest` library in the first place, which means we'll need the `package.json` file. Make sure you run the `npm install` command. The directory structure now looks like this:

```
<my-project-dir>
|- node_modules
|- ...
|- src
    |- aura
    |- classes
    |- lwc
        |- helloWorld
            |- __tests__
                |- helloWorld.test.js
            |- helloWorld.html
            |- helloWorld.js
            |- helloWorld.js-meta.xml
    ...
    |- package.xml
...
|- package.json
|- README.md
```

Now that it’s done, we can run the test. We do that using the command `npm run test:unit` as the `test:unit` script is already present in the `package.json`. Hold on, this doesn’t work.

```
Error: Could not find sfdx-project.json. Make sure is run from project root
```

> Alright, so we need to have an sfdx-project.json file even if we are not in an sfdx project structure.

Let's add one by copying an existing file that we can get from the [lwc-recipes repo](https://github.com/trailheadapps/lwc-recipes). It has some `package` and `version` references but we can remove them. Here's how it looks like when I pasted it in:

```json
{
  "packageDirectories": [
    {
      "path": "force-app",
      "default": true
    }
  ],
  "namespace": "",
  "sfdcLoginUrl": "https://login.salesforce.com",
  "sourceApiVersion": "51.0"
}
```

Hmmm, that `path` has `force-app` in it. That's not right - we don't use the sfdx project structure so we don't have the `force-app` directory at all! Let's see what happens when we re-run the tests.

```bash
FAIL  src/lwc/helloWorld/__tests__/helloWorld.test.js

● Test suite failed to run

Cannot find module 'c/helloWorld' from 'helloWorld.test.js'
```

So our test can’t find the module. Looks like it’s most likely because of the project structure.

> Let’s change the sfdx-project.json so that it now points to src directory instead.

```json
{
  "packageDirectories": [
    {
      "path": "src",
      "default": true
    }
  ],
  "namespace": "",
  "sfdcLoginUrl": "https://login.salesforce.com",
  "sourceApiVersion": "51.0"
}
```

If we re-run the tests now, we get a nice success:

```
PASS  src/lwc/helloWorld/__tests__/helloWorld.test.js
  c-hello-world
    ✓ hello test (21ms)Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.411s
```

That’s working now. Brilliant!

Let’s go ahead and deploy it using `ant`.

```
All Component Failures: 
1. lwc/helloWorld/__tests__/helloWorld.test.js (markup://c:helloWorld) -- Error: [Line: 1, Col: 9] LWC1518: Invalid LWC imported identifier *********** DEPLOYMENT FAILED ***********
```

Well hello! Looks like `ant` doesn't like some of our tests. 🤔

**Actually, these tests are only in our repository and never saved to our salesforce org even if we use _sfdx_!** That's why they are in the `.forceignore` file when the sfdx repository structure is used (sample [here](https://github.com/trailheadapps/lwc-recipes/blob/master/.forceignore)).

Anything in our `src` directory is deployed to our Org.

> **So, we'll have to keep our tests _outside_ src**. Let's create a `tests` directory at the same level as `src` instead, and move our tests there

```
<my-project-dir>
|- node_modules
    |- ...
|- src
    |- aura
    |- classes
    |- lwc
        |- helloWorld
            |- helloWorld.html
            |- helloWorld.js
            |- helloWorld.js-meta.xml
    ...
    |- package.xml
|- tests
    |- helloWorld
        |- helloWorld.test.js
...
|- package.json
|- README.md
```

You can also see that we’ve included the `helloWorld` directory name within tests directory so that all `tests` are segregated. Let's run deployment this time.

```
deploy:
    [echo] SFDC Deployment [STARTED]
    [sf:deploy] Request for a deploy submitted successfully.
    [sf:deploy] Request ID for the current deploy task: 0Af0I00000ivEC6SAM
    [sf:deploy] Waiting for server to finish processing the request...
    [sf:deploy] Request Status: InProgress
    [sf:deploy] Request Status: Succeeded
    [sf:deploy] *********** DEPLOYMENT SUCCEEDED ***********
    [sf:deploy] Finished request 0Af0I00000ivEC6SAM successfully.
```

Let’s run the tests to make sure that’s working too:

```
(node:17928) ExperimentalWarning: Conditional exports is an experimental feature. This feature could change at any time
 PASS  tests/helloWorld/helloWorld.test.js
  c-hello-world
    ✓ hello test (21ms)Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.489s
Ran all test suites.
```

That’s it! 🎉

## Conclusion - with all the steps

Here are all the steps required to write and run `Jest` tests in a non-sfdx repository structure:

1. Create an `sfdx-project.json` file that refers to `src` instead of `force-app`.
2. Also include the `package.json` file that has the unit test script and jest npm dependency. You can copy this from any standard sfdx repo.
3. Create a `tests` directory as a sibling of `src`.
4. Separate each tests by creating a directory with the same name as the component — `helloWorld` in our case.
5. That’s it!
6. Oh, and if you have a jest.config.js for any `jest-mocks`, you can put them in the same `tests` directory and update the `jest.config.js` to refer to it.
