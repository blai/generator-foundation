# Foundation Generator [![Build Status](https://secure.travis-ci.org/blai/generator-foundation.png?branch=master)](http://travis-ci.org/blai/generator-foundation)

> [Yeoman](http://yeoman.io/) generator (1.0 beta) for [Zurb Foundation v4](http://foundation.zurb.com/), based on [Foundation Sass Version](http://foundation.zurb.com/docs/sass.html)

## The [Stylus](https://github.com/learnboost/stylus) version of Foundation!
While Sass works great with Ruby projects, I think Stylus makes more sense for Node.js web applications for its native modular support using npm. I spent some time creating the a [Stylus port of the Foundation framework](https://github.com/zurb/foundation/pull/2041), so for those fans of Node.js, you no longer need Ruby/Gem installed in your system to use Foundation! It is not officially adopted by Zurb yet, so if you like the idea, please help vote for it. I also published my fork of the Foundation (with Stylus port) to npm [here](https://npmjs.org/package/foundation) while Zurb is making up their mind to adopt it. Starting from v0.2.0, this generator will use the Stylus port by default (you can still choose to use Sass version from the prompt).

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

## Generated output

### `yo foundation` basic generator
When you run `yo foundation` without any parameter from your project folder (e.g. `my-foundatino-theme`), and accept the default options, you will get the following tree (omitting the content in `public` folder):
```
~/my-foundation-theme> tree
.
├── Gruntfile.js
├── README.md
├── assets
│   └── favicon.ico
├── index.js
├── index.styl
├── package.json
├── public
│   (omitting the content here...)
└── stylus
    ├── my-foundation-theme
    │   └── variables.styl
    ├── my-foundation-theme-components.styl
    ├── my-foundation-theme.styl
    └── foundation
        ├── components.styl
        └── variables.styl

```

#### The project files
Let us go over some important parts of the generated project files/folders to see how it works.

##### `package.json`
Your npm project file, laying out all the dependencies, your project name (as the npm package name), and other project information.

##### `Gruntfile.js`
This is the [Grunt](http://gruntjs.com/) configuration file with a bunch of (opinionated) predefined setup. By default, running `grunt` will compile the theme files, start a server at port 3000, and open a browser with livereload (using the default livereload port) so you can just start editing your theme and see the changes as you go. If you know grunt, feel free to make changes as you see fit.

##### `index.styl`
A simple one-liner referencing your main theme files. Usually you do not have to touch this.

##### `index.js`
Here we exports all the necessary information for any descending theme to have a way to get their hands on the resources of the current theme. For example, the generator by default generates a folder called `assets`, and index.js will export the absolute path to the `assets` folder so any Node.js server that is hosting the theme can expose it as a static path.

##### `public` (or whatever folder name you appointed as the public folder)
This folder contains a set of default foundation html/css/javascript files for you to visually inspect the theme. This folder is not part of the paths being exported in `index.js`, so basically, you can put any testing html/css/javascript here.

##### `stylus` (or the folder name you choose to hold the theme files)
Let us say you have generated this theme from a project folder named `my-foundation-theme`, you will automatically get 1 folder and 3 files:
 
 * stylus/my-foundation-theme.styl
 * stylus/my-foundation-theme-components.styl
 * stylus/my-foundation-theme
 * stylus/my-foundation-theme/variables.styl

Please take a look at the stylus port of Foundation itself https://github.com/blai/foundation as an example. It is recommended for you to manage components under `stylus/my-foundation-theme/components/`, and for each new component file you created, you link it into the theme by adding an import statement in `stylus/my-foundation-theme-components.styl`. If you decide to expose variables for descending themes to override, you would also want to add it to the `stylus/my-foundation-theme/variables.styl` using `?=` and comment it out.

Any ancestoring themes in you theme inheritance structure should have been properly flatten and ported to their individual folder (of the theme name itself) under `stylus` folder. If you did not specify a theme to extend from, Foundation would be the ancestor and you should see a `stylus/foundation/` folder generated for you with 2 files in it
 
 * stylus/foundation/components.styl
 * stylus/foundation/variables.styl

Feel free to comment/uncomment/change these two files to customize the default set of components provided by Foundation theme. Your customization to these files would be inherited automatically to any descending theme as well.

##### `assets` folder
As mentioned above in `index.js` section, `assets` folder would be exported along with your theme files as port of the npm package. This gives you to place any none-stylus assets (e.g. font, image, etc), knowing that they will be available to you when this theme is being hosted by a node.js server. You may refer to the assets from your css/stylus files using relative path (without mentioning `assets` as part of the path) like so:
Assuming your assets folder has this:

└── assets
    └── images
        └── my-background.png

```css
.my-nice-background {
  background: url('images/my-background.png');
  background-size: 100% 100%;
}
```
Any assets of your ancestor(s) would also be available to you the same way.


## Release History
 * 2013-04-29 `v0.5.0` Use Foundation 4.1.5 structure, use local project override to extend inherited styles.
 * 2013-04-15 `v0.4.1` Enhanced logic to expose assetPaths from baseTheme
 * 2013-04-15 `v0.4.0` For stylus version, updated the environment.styl and settings.styl to use the variables from Foundation 4.1.2
 * 2013-04-15 `v0.3.4` Check for the existence of theme.assetPaths before iterating
 * 2013-04-14 `v0.3.3` Mount all asset folders from dependencies in grunt for development environment.
 * 2013-04-14 `v0.3.2` Exports plugin function from index.js
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
