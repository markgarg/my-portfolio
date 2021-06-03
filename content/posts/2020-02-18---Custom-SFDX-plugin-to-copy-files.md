---
title: Custom SFDX plugin to copy files
date: "2020-02-18T20:11:19.233Z"
slug: "custom-sfdx-plugin-to-copy-files"
template: "post"
draft: false
category: "sfdx"
tags:
  - "salesforce"
  - "sfdx"
description: A simple plugin to ensure correct files are used for deployment
---

This post talks about a SFDX plugin that copies files from one directory to another. All the code is in [this repo here.](https://github.com/markgarg/sfdx-copy-files-plugin).

## Why?

As with most orgs, we have a lot of third party API integrations and we use [Named Credentials](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_named_credentials.htm) for most of them. The endpoints vary based on the environment we are in. In our development environment, we point these integrations to a mock server. Our testing and staging environments point to the testing and staging URLs of target system and our production points to the live URLs of the third party systems. This is a similar setup to most orgs, I’d imagine.

Storing Named Credentials in `git` in such setup is not straightforward as they can point to only a single URL at a time. Hence, we have a custom `config` directory that stores the URLs based on the environment and then our custom `ant` target copies these files into the `src/namedCredentials` during deployment as illustrated below.

This is how the project looks like:
![Project directory when there's at rest](/media/proj-dir-empty.png)
*Project directory when there’s no deployment — notice `src/namedCredentials` is empty*

To deploy to our staging environment, we run:
```bash
 ENVIRONMENT=staging ant build
 ```

This will run a custom ant code that moves the named credential(s) from `config/staging/namedCredentials` to `src/namedCredentials` as shown below:
![Project directory when custom ant script runs for staging environment](/media/proj-dir-with-ant.png)
*Project directory when custom `ant` script runs for `staging` environment*

This way, we are able to use the named credential specific to an environment for deployment. We can extend this to custom metadata/CORS endpoints/remote site settings etc. which change from one environment to the other.

When we move to Salesforce DX, such a custom ant script doesn’t exist and hence we needed to create our own custom DX plugin.

## How?

The code in the [GitHub repo](https://github.com/markgarg/sfdx-copy-files-plugin) represents a custom DX plugin. I haven’t published this to npm (yet) so you’ll have to do that yourself by forking the repo and using your own namespace. Once it’s published to npm, you can use the following command (the following command assumes that you’ve used the namespace `copyutil` when publishing the plugin):

```bash
sfdx copyutil:copy-files --sourcedir config/namedCredentials --targetdir force-app/main/default/namedCredentials
```

This command moves the contents of your `config/namedCredentials` to `force-app/main/default/namedCredentials`.

That’s it!
