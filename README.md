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

##Example URLs
```
http://localhost:3000/1366x768/buzzfeed.com?opt[selector]=.splash__container
http://localhost:3000/1366x768/buzzfeed.com?opt[selector]=.badge-list
http://localhost:3000/1366x768/buzzfeed.com?opt[crop]=true
http://localhost:3000/iPhone/buzzfeed.com?opt[userAgent]=Mozilla%2F5.0(iPhone%3BU%3BCPUiPhoneOS4_0likeMacOSX%3Ben-us)AppleWebKit%2F532.9(KHTML%2ClikeGecko)Version%2F4.0.5Mobile%2F8A293Safari%2F6531.22.7
http://localhost:3000/iPhone/buzzfeed.com?opt[userAgent]=Mozilla%2F5.0(iPhone%3BU%3BCPUiPhoneOS4_0likeMacOSX%3Ben-us)AppleWebKit%2F532.9(KHTML%2ClikeGecko)Version%2F4.0.5Mobile%2F8A293Safari%2F6531.22.7&opt
http://localhost:3000/375x667/buzzfeed.com?opt[crop]=true&opt[userAgent]=Mozilla%2F5.0(iPhone%3BU%3BCPUiPhoneOS4_0likeMacOSX%3Ben-us)AppleWebKit%2F532.9(KHTML%2ClikeGecko)Version%2F4.0.5Mobile%2F8A293Safari%2F6531.22.7
http://localhost:3000/375x667/buzzfeed.com?opt[selector]=.splash__container&opt[userAgent]=Mozilla%2F5.0(iPhone%3BU%3BCPUiPhoneOS4_0likeMacOSX%3Ben-us)AppleWebKit%2F532.9(KHTML%2ClikeGecko)Version%2F4.0.5Mobile%2F8A293Safari%2F6531.22.7
http://localhost:3000/1366x768/startribune.com?opt[selector]=.nav-weather-mod
http://localhost:3000/1366x768/startribune.com?opt[crop]=true
http://localhost:3000/1366x768/weather.com?opt[selector]=.condition-hp
```
