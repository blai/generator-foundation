# Foundation Generator [![Build Status](https://secure.travis-ci.org/blai/generator-foundation.png?branch=master)](http://travis-ci.org/blai/generator-foundation)

> [Yeoman](http://yeoman.io/) generator (1.0 beta) for [Zurb Foundation v4](http://foundation.zurb.com/), based on [Foundation Sass Version](http://foundation.zurb.com/docs/sass.html)


## Usage
First make a new directory, and `cd` into it:
```
mkdir my-foundation && cd $_
```

Then install `generator-foundation`:
```
npm install generator-foundation
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
 * 2013-03-26   v0.2.1   For stylus port, import foundation-global settings after importing local setting
 * 2013-03-26   v0.2.0   Added Stylus port of foundation version
 * 2013-03-19   v0.1.1   fixed incorrect task name in watcher
 * 2013-03-12   v0.1.0   first draft.
