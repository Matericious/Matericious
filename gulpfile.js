const {src, task, dest, watch, series} = require("gulp"),
path = require("path"),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
sourcemaps = require("gulp-sourcemaps"),
header = require("gulp-header-comment"),
strip = require("gulp-strip-comments"),
uglify = require("gulp-uglify"),
concat = require("gulp-concat"),
babel = require("gulp-babel"),
include = require("gulp-include"),
sasslint = require("gulp-sass-lint"),
eslint = require("gulp-eslint")

let autoprefixerOptions = {
  browsers: "> 5%, last 2 versions, Firefox ESR",
  cascade: false
},
dirSass = "src/scss/**/*.scss",
dirEs = ["src/js/_base.js", "src/js/*.js"]

task("lintsass", (cb) => {
  return src(dirSass)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
})

task("lintjs", () => {
  return src(dirEs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

task("compilecss", (cb) => {
  return src(dirSass)
    .pipe(sass({outputStyle: "expanded"})
      .on("error", (err) => {
        cb(err)
      }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(dest("css/"))
})

task("combinecss", (cb) => {
  return src(dirSass)
    .pipe(concat("matericious.css"))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"})
      .on("error", function(err) {
        cb(err)
      }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css/"))
})

task("mincss", (cb) => {
  return src(dirSass)
    .pipe(concat("matericious.min.css"))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"})
      .on("error", function (err) {
        cb(err)
      }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css/"))
})

task("sass:watch", () => {
  watch(dirSass, ["scss"])
})

task("compilejs", () => {
  return src(["src/js/*.js", "!src/js/_base.js"])
    .pipe(include())
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(strip())
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(dest("js"))
})

task("combinejs", () => {
  return src(dirEs)
    .pipe(sourcemaps.init())
    .pipe(concat("matericious.js"))
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(strip())
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js/"))
})

task("minjs", () => {
  return src(dirEs)
    .pipe(sourcemaps.init())
    .pipe(concat("matericious.min.js"))
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(uglify())
    .pipe(header({file: path.join(__dirname, "src/info.txt")}))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js/"))
})

task("js", series(["compilejs", "combinejs", "minjs"]))
task("css", series(["compilecss", "combinecss", "mincss"]))
task("default", series(["css", "js"]))
