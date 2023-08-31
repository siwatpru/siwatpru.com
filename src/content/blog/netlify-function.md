---
title: Trying out Netlify's Functions
description: Check out Netlify's new fucntion as a service
pubDate: 'Mar 24 2018'
heroImage: '/blog-placeholder-2.jpg'
---

In this blog, we'll be checking out Netlify's Functions which just dropped
earlier this week. If you don't know Netlify, it's a service where you can deploy
static site with all the good stuff (HTTPS, Automate deployment with Git hook,
Custom domain and many other [stuff](https://www.netlify.com/features/)) for free.

## 🎉 What's functions?

Netlify's Functions is a feature where you can deploy Lambda functions by just push
your functions to the Git repository. So we can write some backend code and have them
running without having to set up any servers. That's it, nice and simple!

For the free tier, Netlify offers up to `125k requests` and `100 hours run time` per month.
That's a lot! But if that's not enough for you, check out the pricing [here](https://www.netlify.com/pricing/).

## 🎬 Get started

In order to start using Functions, we can either write a config file
or use the web interface but the idea is the same, we need to designate
a directory where function's code will be stored.

Let's create a config file called `netlify.toml`

```toml
[build]
  functions = "/functions"
```

Then we can write functions in the directory `functions` by export a function called `handler`. Let's
say hello to the world!

```javascript
// functions/hello_world.js

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World!',
  });
};
```

After we push to Git, this function will be deployed and can be called from the site at
`/.netlify/functions/hello_world`. Neat! (File name will be used for the endpoint)

```javascript
// functions/hello_world.js

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World!',
  });
};
```

## 🛠 Example

Let's build an API that will response with `yes` or `no` when we call it and let user
able to config which word they want to use instead of `yes` and `no` as well.

```javascript
// functions/yes_no.js

exports.handler = function(event, context, callback) {
  const {yes = 'yes', no = 'no'} = event.queryStringParameters;
  callback(null, {
    statusCode: 200,
    body: Math.floor(Math.random() * 2) ? yes : no,
  });
};
```

In the example above, we get the query string parameters from the `event` object which
contains information about the request.

```json
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": {Incoming request headers}
    "queryStringParameters": {query string parameters }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

From the example, we can call `/.netlify/functions/yes_no` and get `yes` or `no` as the response.
Or we can call `/.netlify/functions/yes_no?yes=Yeah&no=Nah` to get `Yeah` and `Nah` instead.

## 👍🏻 Try it out for yourself

The code we using for this blog is available [here](https://github.com/siwatpru/netlify-functions-example).
You can also try calling the API we just created using the link below.

- https://netlify-functions-example.netlify.com/.netlify/functions/hello_world
- https://netlify-functions-example.netlify.com/.netlify/functions/yes_no

## 🗒 Note

* For more information. Check out Netlify's Functions doc https://www.netlify.com/docs/functions
* This blog also hosted on Netlify 😀

