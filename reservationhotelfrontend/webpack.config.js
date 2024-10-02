const path = require('path');

module.exports = {
  entry: './src/index.js', // Modifiez le chemin d'entrée en fonction de votre projet
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Nom de votre fichier de sortie
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000, // Choisissez le port que vous souhaitez
    setupMiddlewares: (middlewares, devServer) => {
      // Ici vous pouvez ajouter d'autres middlewares si nécessaire
      return middlewares;
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Assurez-vous que vous avez babel-loader installé
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensions à résoudre
  },
};
