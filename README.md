##Idea
Create a service that will take various parameters and return an screenshot from a specified URL. 

Parameters could include a selector, coodinates, viewport, user-agent, etc. Use cases include instagram/twitter bots, 'dynamic' newsletter content, testing, advertising, etc.

##Dependencies
[express](http://expressjs.com/) for the main web-application and [pageres](https://github.com/sindresorhus/pageres) for the screen shoting service.

[configuration](https://www.npmjs.com/package/config) is based on environmental variables but is very versatile

##Why node?
Mainly [pageres](https://github.com/sindresorhus/pageres) but I also like the idea that you could request a screenshot and node could automatically start processing a new image but reply to the client with a cached copy. That way popular images stay more fresh than less popular. 

##TL;DR;
Clone this repo
```
cd screen-canon
```
```
make dev
```
*Make sure you have a ```config/development.json``` file or whatever relevant environment you want. 

Go and grab a [screenshot of buzzfeed splash](http://localhost:3000/1280x1024/buzzfeed.com?opt[selector]=.splash__container)

##Options
| param    | default | note |
| -----    | ------- | ---- |
| delay    | 2       |      |
| crop     | false   |      |
| cookies  | []      |      |
| selector | ""      |      |
| hide     | []      |      |
| username | ""      |      |
| password | ""      |      |
| scale    | 1       |      |
| fast     | true    | false to fetch live |
| format   | "png"   |      |
|userAgent|  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"||
