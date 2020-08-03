const gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  cleanCss = require("gulp-clean-css"),
  babel = require("gulp-babel");

//  Copy HTML
gulp.task("copyHTML", () => gulp.src("*.html").pipe(gulp.dest("dist")));

// Min CSS
gulp.task("minifyCss", () =>
  gulp.src("css/*.css").pipe(cleanCss()).pipe(gulp.dest("dist/css"))
);

// Transpile/Minify JS
gulp.task("scripts", () =>
  gulp
    .src("js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
);

// Copy SVGs
// gulp.task("copySVGs", () =>
//   gulp.src("assets/*.svg").pipe(gulp.dest("dist/assets"))
// );

// Optimize images
gulp.task("imageMin", () =>
  gulp
    .src(["assets/*.jpg", "assets/*.png"])
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets"))
);

// Copy svg
gulp.task("copySvg", () =>
  gulp.src("assets/*.svg").pipe(gulp.dest("dist/assets"))
);

// Copy favicon
gulp.task("copyFavicon", () => gulp.src("favicon.png").pipe(gulp.dest("dist")));

// defualt task
gulp.task(
  "default",
  gulp.series(
    gulp.parallel(
      "copyHTML",
      "minifyCss",
      "scripts",
      "imageMin",
      "copySvg",
      "copyFavicon"
    )
  )
);
