# Implementation

|[Methodology](methodology.md) - [Applications](applications.md)|
|:-----------------------------------------------------:|
||

### Technology Stack

#### Tools
| Name | Definition | Reference |
|------|------------|-----------|
|Git|Source control manager|[http://git-scm.com/](http://git-scm.com/)|
|NPM|Server package management|[https://npmjs.org/](https://npmjs.org/)|
|Bower|Client package management|[http://bower.io/](http://bower.io/)|
|Yo|Webapp seed generator|[http://yeoman.io/](http://yeoman.io/)|
|Grunt|Js task runner|[http://gruntjs.com/](http://gruntjs.com/)|

===

#### Server
| Name | Definition | Reference |
|------|------------|-----------|
|Nodejs|Server platform|[http://nodejs.org](http://nodejs.org)|
|Express|Web framework|[http://expressjs.com/](http://expressjs.com/)|
|Socket.io|Socket communication|[http://socket.io/](http://socket.io/)|

===

#### Client
| Name | Definition | Reference |
|------|------------|-----------|
|HTML5|Cool stuff|[http://en.wikipedia.org/wiki/HTML5](http://en.wikipedia.org/wiki/HTML5)|
|Socket.io|Socket communication|[http://socket.io/](http://socket.io/)|
|AngularJS|MVC framework|[http://angularjs.org/](http://angularjs.org/)|


===

### Design

#### Server Events
 - Start
 - Stop
 - Create Session
 - Remove Session
 - Device Connect
 - Device Ready
 - Device Error
 - Device Disconnect
 - Start Stream
 - Message
 - Get Audio
 - Process Command

#### Device Events
 - Ready
 - Error
 - Receive Stream
 - Message

#### Admin Events
 - Create Session
 - Remove Session
 - Session Created
 - Select Session
 - Device Connects
 - Device Updates
 - Error
 - Get Audio
 - Start Stream
 - Send Command

===
|[Methodology](methodology.md) - [Applications](applications.md)|
|:-----------------------------------------------------:|
||
