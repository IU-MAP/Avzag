# Avzag Dictionary

![deployment status](https://github.com/IU-MAP/avzag/actions/workflows/dist.yml/badge.svg)
![code quality](https://github.com/IU-MAP/avzag/actions/workflows/lint.yml/badge.svg)
![test](https://github.com/IU-MAP/avzag/actions/workflows/test.yml/badge.svg)

This repo is a fork of [Avzag](https://github.com/alkaitagi/avzag) project for _IU-S21-MAP_ course. During the course the **team** of [@qazybi](https://github.com/QazyBi), [@alkaitagi](https://github.com/alkaitagi/), [@annwhoorma](https://github.com/annwhoorma) will develop the new Dictionary module for the application. The web site is written using VueJS framework in TypeScript language.

The goal of the project is to develop a cross-lingual dictionary with efficient search and rich data representation. The system should provide capability for searching offline, and in various grammatical forms and usage samples for the dictionary entries.

Our backlog can be found in the ["Projects" -> "Dictionary"](https://github.com/IU-MAP/avzag/projects/1) section.

## Use documentation (or how to use it)

Whenever you need to get a quick translation of a word and see some examples of how to use it, you can go to the website, choose a set of languages you need and then you'll be transferred to the dictionary. It will take a few seconds to load the words according to the languages you chose. Then you can type in a word you need to get translation of. Within a second you'll see possible matches for the language you chose. You can also see some use cases and forms for those words. Yup, that simple :)

## Technical documentation

Unfortunately, we didn't deploy our technical documentation. Instead, we store it in _./docs_ folder. You can clone the project, and do the following commands:
```
~/.../Avzag >>> cd docs
~/.../Avzag/docs >>> python -m http.server
```

Most probably it will be served at `localhost:8000` and all you need to do is to go there.

## Project setup

After donwloading the repo for the first time `yarn install`. To run the app locally `yarn serve`.

## Sprints

You can find sprints-related information (including burndown chart) in [this discussion](https://github.com/IU-MAP/avzag/discussions/20).

You can find our backlog and sprints board [here](https://github.com/IU-MAP/avzag/projects/1). Note that we have one board for all sprints, each task has a tag with a sprint number.
