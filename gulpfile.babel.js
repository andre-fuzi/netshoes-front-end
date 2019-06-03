
import Taskerify from 'taskerify';

Taskerify.config.sourcemaps    = false;
Taskerify.config.srcPath       = './src/assets';  // Src Path
Taskerify.config.distPath      = './dist/assets'; // Dist Path
Taskerify.config.srcViewsPath = './src'; // Views Src Path
Taskerify.config.distViewsPath = './'; // Compiled Views Dist Path (HTML)

const SRC          = Taskerify.config.srcPath;
const DIST         = Taskerify.config.distPath;

const storeName    = 'netshoes';
const commomFiles  = ['globals', 'home'];

Taskerify((mix) => {

    // PugJS Template
    mix.pug();

    // Image Minifier
    mix.imagemin(`${SRC}/images`, `${DIST}/images`);

    // Desktop Files
    commomFiles.map((file) => {
        mix.browserify(`${SRC}/js/${storeName}-${file}.js`, `${DIST}/js`)
            .sass(`${SRC}/scss/${storeName}-${file}.scss`,  `${DIST}/css`);
    });
});
