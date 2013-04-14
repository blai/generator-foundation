# Foundation Generator [![Build Status](https://secure.travis-ci.org/blai/generator-foundation.png?branch=master)](http://travis-ci.org/blai/generator-foundation)

> [Yeoman](http://yeoman.io/) generator (1.0 beta) for [Zurb Foundation v4](http://foundation.zurb.com/), based on [Foundation Sass Version](http://foundation.zurb.com/docs/sass.html)

## The [Stylus](https://github.com/learnboost/stylus) version of Foundation!
While Sass works great with Ruby projects, I think Stylus makes more sense for Node.js web applications for it's native modular support using npm. I spent some time creating the a [Stylus port of the Foundation framework](https://github.com/zurb/foundation/pull/2041), so for those fans of Node.js, you no longer need Ruby/Gem installed in your system to use Foundation! It is not officially adopted by Zurb yet, so if you like the idea, please help vote for it. I also published my fork of the Foundation (with Stylus port) to npm [here](https://npmjs.org/package/foundation) while Zurb is making up their mind to adopt it. Starting from v0.2.0, this generator will use the Stylus port by default (you can still choose to use Sass version from the prompt).

## [fashionista](https://github.com/blai/fashionista) makes it easy to integrate custom Foundation themes with express.js


## Usage
First make a new directory, and `cd` into it:
```
mkdir my-foundation && cd $_
```

Then install `generator-foundation`:
```
npm install -g generator-foundation
```

Run `yo foundation`, optionally passing an app name:
```
yo foundation [app-name] [--base=my-base-foundation]
```

Finally, install npm dependencies:
```
npm install
```


### Running the generated foundation project

```
grunt
```


## Release History
 * 2013-04-10 `v0.3.1` save the dependency in package.json when doing npm install
 * 2013-04-09 `v0.3.0` Integration with fashionista
 * 2013-04-02 `v0.2.6` Also run "npm install" programmatically on the theme dependencies.
 * 2013-03-28 `v0.2.5` Add instruction at end of project generation
 * 2013-03-28 `v0.2.4` Fixed middleware bug, it did not call 'stylus.use' on the base theme
 * 2013-03-28 `v0.2.3` Clean up deprecated contents
 * 2013-03-27 `v0.2.2` Re-factored theme-global to make themes more extensible. Use 'foundation' module from public npm.
 * 2013-03-26 `v0.2.1` For stylus port, import foundation-global settings after importing local setting
 * 2013-03-26 `v0.2.0` Added Stylus port of foundation version
 * 2013-03-19 `v0.1.1` fixed incorrect task name in watcher
 * 2013-03-12 `v0.1.0` first draft.
