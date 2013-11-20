# Methodology

|[Research](research.md) - [Implmentation](implementation.md)|
|:-----------------------------------------------------:|
||


### Methodology  
As a strong advocate of the agile software development process and working as a one developer team, an agile approach was taken with regards to development on this project. It enables the generation of new ideas and hotfixes implementations; without having to worry about completing full iterations returning to improve. The agile approach also lends itself to dynamic languages, such as Javascript, enabling

### Testing  
The testing for this project was handled using [Mocha](http://visionmedia.github.io/mocha/), a tried and tested Javascript unit testing framework. The test code can be found within the tests/ directory of each project. The tests can be run by installing nodejs and navigating to the project root and running `node test`.

This project was developed on a nodejs server on my development machine, so that that deployment and testing could be handled with relative ease.

### Source Control
To go forward as a usable product/project it was essential that the source of this project would be handled by a version control platform, enabling potential future developers to continue (or even just as a distribution platform). A proficiency with GitHub and it's surrounding technologies made this the ideal version control platform.

### Distribution
It was decided early on, that the best way to manage this project, would be to break it into distinct modular components which could then be open-sourced. The components of this project are being distributed as packages on NPM (node's package manager) where they can be downloaded and used by other developers within the JS community. 

### Release
A CentOS production server running in Amsterdam, with a clean install of Node and Git is being used for releases.



===
|[Research](research.md) - [Implmentation](implementation.md)|
|:-----------------------------------------------------:|
||
