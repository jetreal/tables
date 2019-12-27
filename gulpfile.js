var gulp           = require('gulp'), // Подключаем Gulp
	browserSync  		 = require('browser-sync').create(),
	autoprefixer 		 = require('gulp-autoprefixer'),
	sass         		 = require('gulp-sass'), //Подключаем Sass пакет,
	cssnano      		 = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       		 = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	concat       		 = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       		 = require('gulp-uglify-es').default, // Подключаем gulp-uglifyjs (для сжатия JS)
	del          		 = require('del'), // Подключаем библиотеку для удаления файлов и папок
	// imagemin     		 = require('gulp-imagemin') // Подключаем библиотеку для работы с изображениями
	webp             = require('gulp-webp'),
	htmlmin          = require('gulp-htmlmin');
	pug              = require('gulp-pug');



	const { series } = require('gulp');  // новый синтаксис
	const { parallel } = require('gulp'); // новый синтаксис галп 4 

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
gulp.task('watch', function() {
	gulp.watch("app/*.pug").on('change', gulp.parallel('pug'));
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch("app/*.html").on('change', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// pug
gulp.task('pug', function () {
  return gulp.src('app/*.pug')
  .pipe(pug({
    pretty: true
	}))
	.pipe(gulp.dest('app'));
});

// html replace
gulp.task('html-replace', async function() {
	gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(gulp.dest('dist'));
})

gulp.task('html-minify', () => {
  return gulp.src('dist/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('dist'));
});


// sass and css tasks
gulp.task('sass', function () { // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});
gulp.task('css-replace', function() {
	return gulp.src('app/css/main.css')
		.pipe(gulp.dest('dist/css'))
})

gulp.task('css-fonts', function() {
	return gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fonts'))
	})

gulp.task('css-min', function() {
	return gulp.src('app/css/main.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('dist/css'))  ,
				gulp.src('app/libs/**/*.css') // Для библиотек
				    .pipe(concat('libs.min.css'))
				    .pipe(cssnano())
				    .pipe(gulp.dest('dist/css'));
});

// js 
gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/**/*.js', // Берем jQuery
		// 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
				.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
				.pipe(uglify()) // Сжимаем JS файл
				.pipe(gulp.dest('dist/js')), // Выгружаем в папку app/js
			gulp.src('app/js/*.js')
				.pipe(uglify())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('dist/js')),
			gulp.src('app/js/*.js')
				.pipe(gulp.dest('dist/js'))
});
// сжатие изображений в формат webp
gulp.task('img', () =>
    gulp.src('app/images/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/images'))
);

// delete
gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

exports.build = gulp.series('clean', 'html-replace', 'sass', gulp.parallel('img', 'css-min', 'css-replace', 'css-fonts', 'scripts') )

exports.see = parallel('browser-sync', 'watch');



