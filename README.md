##Idea
Create a service that will take various parameters and return an screenshot from a specified URL. 

Parameters could include a selector, coodinates, viewport, user-agent, etc. Use cases include instagram/twitter bots, 'dynamic' newsletter content, testing, advertising, etc.

##Dependencies
[express](http://expressjs.com/) for the main web-application and [pageres](https://github.com/sindresorhus/pageres) for the screen shoting service.

[configuration](https://www.npmjs.com/package/config) is based on environmental variables but is very versatile

##Why node?
Mainly [pageres](https://github.com/sindresorhus/pageres) but I also like the idea that you could request a screenshot and node could automatically start processing a new image but reply to the client with a cached copy. That way popular images stay more fresh than less popular. 

##TL;DR;

```
cd
git clone https://github.com/photodialectic/screen-canon.git
cd screen-canon
```

Install node modules then build and minify CSS from SASS
```
npm run build
```

Start the development server
```
npm run start:dev
```

*Make sure you have a ```config/development.json``` file or whatever relevant environment you want. 

##Options
| param     | default                                                                                                | note                                                                                                |
| ----------| -------------------------------------------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------|
| delay     | 2 (number)                                                                                             | This is currently (not working)[https://github.com/sindresorhus/pageres/issues/183]                 |
| crop      | false (bool)                                                                                           | Crop to the set height.                                                                             |
| cookies   | [] (string or array)                                                                                   | A string with the same format as a browser cookie or an object of what phantomjs.addCookie accepts. |
| selector  | "" (string)                                                                                            | Capture a specific DOM element.                                                                     |
| hide      | [] (array)                                                                                             | Hide an array of DOM elements. *currently not working                                               |
| username  | "" (string)                                                                                            | Username for authenticating with HTTP auth.                                                         |
| password  | "" (string)                                                                                            | Password for authenticating with HTTP auth.                                                         |
| scale     | 1 (number)                                                                                             | Scale webpage ```n``` times.                                                                        |
| fast      | true (bool)                                                                                            | false to fetch live                                                                                 |
| format    | "png" (string)                                                                                         | Image format.                                                                                       |
| userAgent | "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36" | Custom user agent.                                                                                  |
