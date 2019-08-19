const { src, task, dest, watch, series } = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  eslint = require("gulp-eslint"),
  header = require("gulp-header-comment"),
  include = require("gulp-include"),
  path = require("path"),
  sass = require("gulp-sass"),
  sasslint = require("gulp-sass-lint"),
  sourcemaps = require("gulp-sourcemaps"),
  strip = require("gulp-strip-comments"),
  uglify = require("gulp-uglify");

const autoprefixerOptions = {
    browsers: "> 5%, last 2 versions, Firefox ESR",
    cascade: false
  },
  dirEs = ["src/js/_utilities.js", "src/js/*.js"],
  dirSass = "src/scss/**/*.scss",
  distCss = "dist/css/",
  distJs = "dist/js/",
  fileInfo = "src/info.txt";

task("lintsass", cb => {
  return src(dirSass)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

task("lintjs", () => {
  return src(dirEs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

task("compilecss", cb => {
  return src(dirSass)
    .pipe(
      sass({ outputStyle: "expanded" }).on("error", err => {
        cb(err);
      })
    )
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(dest("css/"));
});

task("combinecss", cb => {
  return src(dirSass)
    .pipe(concat("matericious.css"))
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "expanded" }).on("error", err => {
        cb(err);
      })
    )
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(distCss));
});

task("mincss", cb => {
  return src(dirSass)
    .pipe(concat("matericious.min.css"))
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "compressed" }).on("error", err => {
        cb(err);
      })
    )
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(distCss));
});

task("sass:watch", () => {
  watch(dirSass, ["scss"]);
});

task("compilejs", () => {
  return src(["src/js/*.js", "!src/js/_utilities.js"])
    .pipe(include())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(strip())
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(dest("js"));
});

task("combinejs", () => {
  return src(dirEs)
    .pipe(sourcemaps.init())
    .pipe(concat("matericious.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(strip())
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(distJs));
});

task("minjs", () => {
  return src(dirEs)
    .pipe(sourcemaps.init())
    .pipe(concat("matericious.min.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(header({ file: path.join(__dirname, fileInfo) }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(distJs));
});

task("lint", series(["lintsass", "lintjs"]));
task("js", series(["compilejs", "combinejs", "minjs"]));
task("css", series(["compilecss", "combinecss", "mincss"]));
task("default", series(["css", "js"]));
