<p><b>##########</b></p>
<h2>STEP-1 npm install</h2>
<p><<b>##########</b></p>

<p>if error given 
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.</p>

<p>The react-scripts package provided by Create React App requires a dependency:</p>

  "babel-eslint": "10.1.0"

<p>Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-eslint was detected higher up in the tree:</p>

  C:\Users\hp\Downloads\node_modules\babel-eslint (version: 7.2.3)

<p>Manually installing incompatible versions is known to cause hard-to-debug issues.</p>


<b>####################</b>

Paste these line inside your .env file 

SKIP_PREFLIGHT_CHECK=true

<p><b>##########</b></p>
<h2>STEP-2 npm start</h2>
<p><b>##########</b></p>

:) 

ScreenShot

getting all raw Data 

![alt text](src/assets/1.png)

getting filter data 

![alt text](src/assets/2.png)


<h2>Pending</h2>
<p>Login functionality</p>
<p>Cart functionality</p>
<p>Code review and removal of redundant component code.</p>
<p>Enabling 'flow' on individual files</p>
<p>Search functionality</p>
<p>UI (hover states), loading indications.</p>

Test
$ npm test
Debug Test
$ npm run test:debug
Coverage
$ npm test -- --coverage
Analyzing the Bundle Size
$ npm run build
$ npm run analyze
Check type error
$ npm run flow


Server API
API to use

GET Product Listing: https://xebiascart.herokuapp.com/products

Product Search by name: https://xebiascart.herokuapp.com/products?title=provogue

GET Product Filters: https://xebiascart.herokuapp.com/filters

User Login: https://xebiascart.herokuapp.com/users?username=amigo
