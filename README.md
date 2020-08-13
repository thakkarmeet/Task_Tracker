# LabX Developer Tests

## Introduction

Thank you for applying to LabX Media Group. As part of the application process
we ask candidates to complete a technical task to show their skills in an
environment much like the one we do our day-to-day work in.

The exact test will vary from role-to-role, but all will consist of making
modifications to this sample project.

## Requirements

You don't need much to get started, but there are a few hard requirements:

  - Git
  - Node.js

This project was built to the current "Stable" node, which at the time of
writing is node 12.

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Copy the `.env.template` file to a new file called `.env`, and change any
   settings you'd like.
4. Run `npm run dev`. This will:

   - Compile/Transpile the frontend code
   - Start the node server
   - begin watching files for dynamic recompiling
   - Start Browsersync and open the site in your default browser

5. Follow the link to the appropriate test

## Technical Details

### Backend

The backend server for this site is a fairly typical — if simplistic — Node­– and
Express–based setup. It's not production-ready, but it mirrors our production
setup in the ways that matter for these tests. The `app.js` file contains the
setup for express. The `server.js` file is just a wrapper to run everything.

The view engine is [Pug][pug], which is what our current sites are using for
anything that's not react. Templates are in the `views` folder in the root of
the project.

None of the JS for the backend is transpiled or processed in any way. Node 12
supports most of the popular new JS syntax out-of the box, so the only thing you
will probably need to keep in mind is to use `require()` instead of `import`.

When you run `npm run dev`, the server is started using [`node-dev`][node-dev],
which will watch for changes to the backend code and restart itself as needed.
It does not watch the view templates, for that see the Frontend sections.

### Frontend

All frontend assest that need to be compiled or transformed are located in the
`frontend/src/` folder, and compiled to the `fronted/dist/` folder. The contents
of this folder are served at the root of the site by `express-static`. For
example, a file that's compiled to `frontend/dist/css/style.css` will be
available in the browser as `/css/style.css`.

The compilation is handled by [Gulp][gulp], as that is what our sites use in
production. The gulp task that runs with `npm run dev` watches and re-compiles
all assets automatically, and starts a [Browsersync][browsersync] server on port
7000 that refreshes if any of the css, js, images, or view templates changes.

#### HTML

Any server-side rendered html is handled by Express's views system. The
templates are written in [Pug][pug], and can be found in the `views` folder in
the root of the project.

#### CSS

Styles for this site are written as [Sass scss][sass] files. The scss files can be 
in the `frontend/src/scss` folder, or in the `frontend/src/jsx/` folder.

For styles in the `scss/` folder, only the `index.scss` file is directly
compiled, so any other files need to be imported there (either directly, or
by another file that is imported).

For styles in the `jsx/` folder, all the `scss` files are collected and
concatenated together. This is not "CSS in JS", and these files are not given
any special consideration or namespacing. This feature is solely an
organizational convenience.

#### JS

Normal js is in the `frontend/src/js` folder. Gulp will pass all these files
through [Babel][babel], so newer JS features are available, including `import`.
(It also passes through [Browserify][browserify], so `require()` should work
too.)

JSX files can be found in the `fronted/src/jsx` folder. JSX is currently set up
to use react.

The JS (including JSX) is all bundled starting from `frontend/src/js/index.js`.
That means that any JS or JSX you want on the page needs to be imported (either
directly or by another file that is imported) in that file. The resulting JS
file is incldued at the bottom of the `<body>` tag.

#### Images

Images go in the `frontend/src/images` folder. For consistency, they are copied
to the`frontend/dist/images` folder, but no processing or transformations are
performed.

[babel]: https://babeljs.io/
[browserify]: http://browserify.org/
[browsersync]: https://www.browsersync.io/
[gulp]: https://gulpjs.com/
[node-dev]: https://www.npmjs.com/package/node-dev
[pug]: https://pugjs.org/api/getting-started.html
[sass]: https://sass-lang.com/
