# Avzag Dictionary

![deployment status](https://github.com/IU-MAP/Avzag/actions/workflows/dist.yml/badge.svg)
![code quality](https://github.com/IU-MAP/Avzag/actions/workflows/lint.yml/badge.svg)
![test](https://github.com/IU-MAP/Avzag/actions/workflows/test.yml/badge.svg)

This repo is a fork of [Avzag](https://github.com/alkaitagi/Avzag) project for _IU-S21-MAP_ course. During the course the **team** of [@qazybi](https://github.com/QazyBi), [@alkaitagi](https://github.com/alkaitagi/), [@annwhoorma](https://github.com/annwhoorma) will develop the new Dictionary module for the application. The web site is written using VueJS framework in TypeScript language.

The goal of the project is to develop a cross-lingual dictionary with efficient search and rich data representation. The system should provide capability for searching offline, and in various grammatical forms and usage samples for the dictionary entries.

Our backlog can be found in the ["Projects" -> "Dictionary"](https://github.com/IU-MAP/Avzag/projects/1) section.

## Project setup

After donwloading the repo for the first time `yarn install`. To run the app locally `yarn serve`.


## Sprints

You can find sprints-related information (including burndown chart) in [this discussion](https://github.com/IU-MAP/avzag/discussions/20).
You can find our backlog and sprints board [here](https://github.com/IU-MAP/avzag/projects/1). Note that we have one board for all sprints, each task has a tag with a sprint number.

### Sprint 0

We've completed knowledge acquisition: 
- decided to use web workers for loading DB and searching; 
- decided to use jsdoc to generate documentation for our project;

### Sprint 1
We've implemented cleaning and loading of DB with web-workers.
We've failed to set up documentation generationg with jsdoc because vue plugins for jsdoc don't support Vue 3.0.

### Sprint 2
We've optimized search.
We've moved search to another dbworker.
We've implemented parallel search.
We've managed workers' communication and lifecycle.
We've created a separate branch `dev` for development which is merged to main after each sprint.
We've made little progress in generating documentation as no plugins worked. We've found another tool - tsdoc.
