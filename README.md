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

<h2>Test</h2>
<p> $ npm test</p>
<h2>Debug Test</h2>
<p>$ npm run test:debug</p>
<h2>Coverage</h2>
<p>$ npm test -- --coverage</p>
<h2>Analyzing the Bundle Size</h2>
<p>$ npm run build</p>
<p>$ npm run analyze</p>
<h2>Check type error</h2>
<p>$ npm run flow</p>


<p>Server API</p>

GET Product Listing: https://xebiascart.herokuapp.com/products

Product Search by name: https://xebiascart.herokuapp.com/products?title=provogue

GET Product Filters: https://xebiascart.herokuapp.com/filters

User Login: https://xebiascart.herokuapp.com/users?username=amigo

<h2>redux Store Structure</h2> 
<pre>
{
  "filterable_product_list": {
    "filterable_products": {
      "product_id": {
        "id": "product_id",
        "colour": {
          "color": "#FFD700",
          "title": "Gold"
        },
        "brand": "nike",
        "discount": 50,
        "rating": 4,
        "image": "",
        "price": {
          "mrp": 2299,
          "final_price": 1149
        },
        "title": ""
      }
    },
    "products_searchable_criteria":{
      "brand":{
        "nike":["product_id"]
      },
      "color":{
        "#FFD700":["product_id"]
      }
    },
  },
  "filter": {
    "applied_filters":{ "brand":[], "color":[], "price":[] "discount":[]},
    "filter_list":[
      {
        "type": "BRAND",
        "values": [ { "title": "",  "value": "" } ]
      },
      {
        "type": "PRICE",
        "values": [ { "displayValue": "Min", "key": "Min" } ]
      },
      {
        "type": "COLOUR",
        "values": [ { "color": "#F5F5DC", "title": "Beige" } ]
      },
      {
        "type": "DISCOUNT",
        "values": [ { "displayValue": "Min", "key": "Min" } ]
      },
    ]
  },
  "products_list":[]
}
</pre>