require("dotenv").config();
const port = process.env.PORT || 3030;

const babelify = require("babelify");
const browserSync = require("browser-sync");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const concat = require("gulp-concat");
const del = require("del");
const moduleImporter = require("sass-module-importer");
const sass = require("gulp-sass");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");

const {
    dest,
    parallel,
    series,
    src,
    watch,
} = require("gulp");

const sync = browserSync.create();

// Configure browserify.
const bundler = browserify([
    "frontend/src/js/index.js",
], {
    extensions: [".js",".jsx"],
    transform: [babelify.configure({
        sourceMaps: true,
        sourceType: "module",
        presets: ["@babel/preset-env", "@babel/preset-react"],
    })],
    debug: true,
});

/**
 * Task to clean out old builds.
 */
const clean = () => del("frontend/dist/**/*");

/**
 * Task to transpile and bundle frontend javascript.
 */
const js = () => bundler.bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("frontend/dist/js/"));

/**
 * Image task.
 */
const images = () => src("frontend/src/images/**/*").pipe(dest("frontend/dist/images"));

/**
 * Task to transpile scss.
 */
const scss = () => src(["frontend/src/scss/*.scss", "frontend/src/jsx/**/*.scss"])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({importer: moduleImporter}).on("error", sass.logError))
    .pipe(concat("styles.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("frontend/dist/css"));

/**
 * Start the browsersync instance.
 */
const serve = () => sync.init({
    proxy: `http://localhost:${port}/`,
    files: [
        "app.js",
        "routes/**/*.*",
        "views/**/*.*",
        "frontend/dist/**/*.*",
    ],
    browser: "google chrome",
    port: 7000
});

/**
 * Auto-build and browsersync.
 */
const dev = series(
    clean,
    parallel(js, scss, images),
    parallel(
        serve,
        function recompile () {
            watch(["frontend/src/js/**/*.js", "frontend/src/jsx/**/*.js"], js);
            watch(["frontend/src/scss/**/*.scss", "frontend/src/jsx/**/*.scss"], scss);
            watch("frontend/dist/images/**/*", images);
        },
    ),
);

module.exports.default = dev;
module.exports.clean = clean;
module.exports.dev = dev;
module.exports.images = images;
module.exports.js = js;
module.exports.scss = scss;
module.exports.serve = serve;
