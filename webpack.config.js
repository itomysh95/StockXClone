const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')


process.env.NODE_ENV=process.env.NODE_ENV||'development'

// if it's the test enviroment we set up test variables
if (process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path:'.env.test'});
}// else if it's the development we set up development variables
else if (process.env.NODE_ENV ==='development'){
    require('dotenv').config({path:'.env.development'})
}

module.exports = (env)=>{
    const CSSExtract = new ExtractTextPlugin('styles.css');
    const isProduction = env ==='production';
    
    return {
<<<<<<< HEAD
        entry: './front-end/src/app.js',
=======
        entry: './FrontEnd/src/app.js',
>>>>>>> 2411ca756a1a655b2b54cd94da58e147b6afe002
        output:{
            path:path.join(__dirname,'public','dist'),
            filename: 'bundle.js'
        },
        module:{
            rules: [
                {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
                },{
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader:"css-loader",
                            options:{
                                sourceMap: true
                            }
                        },
                        {
                            loader:"sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                    }
                )
                },{
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                    {
                        loader: 'file-loader',
                    },
                    ],
                }
            ]
        },
        plugins: [
            CSSExtract,
            // lets us pass an object, and on the object define what we want to pass down?
            // looks for process.env.firebase_api_key and replaces with this?
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction? 'source-map':'inline-source-map',
        devServer:{
            contentBase:path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}
