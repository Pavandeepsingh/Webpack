npx webpack

npx webpack --stats detailed

rm -r dist

Asset Modules : 
1. 'asset/resource', 
2. 'asset/inline', 
3. 'asset' , 
4. 'asset/source'


Loaders : 'use' in place of type
eg: 'style-loader', 'css-loader', 'sass-loader', 'babel-loader'


'@babel/env' : compiles ES6, ES7, ES8  =>  ES5


plugins: 1. additional js that do everything loaders cannot do
         2. Eg : UglifiyjsPlugin
         TerserPlugin => for compressing js 


https://eslint.org/docs/latest/


https://eslint.org/docs/latest/use/configure/rules
    