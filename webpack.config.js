const path = require('path');

module.exports = {
  entry: './client/app/index.jsx',
  mode: 'development',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.join(__dirname, 'client/app'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: ['@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /.(woff(2)?|ttf|eot|svg)(?v=\d+.\d+.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /.(jpe?g|png|gif|svg)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '/public/icons/[name].[ext]'
      //   }
      // }
    ],
  },
};
