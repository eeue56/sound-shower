Development Methodology and Workflow
====================================

### Methodology
As a strong advocate of the agile software development process, and working as a team with only one developer I decided that an agile approach to this project would be ideal. It enables me to come up with new ideas and fix prior implementations; without having to worry about completing full iterations returning to improve. The agile approach also lends itself to dynamic languages, such as Javascript, enabling

### Testing
The testing for this project was handled using [Mocha](http://visionmedia.github.io/mocha/), a tried and tested Javascript unit testing framework. The test code can be found within the tests/ directory of each project. The tests can be run by installing nodejs and navigating to the project root and running `node test`.

This project was developed in conjunction to running a nodejs server on my development machine, so that I could consistenty deploy and test.

### Source Control
To go forward as a usable product/project it was important that the source of this project was handled by a version control platform, enabling potential future developers to continue, or even just stand alone as a distribution platform. I have considerable experience using GitHub (and by extension Git) this was the logical choice for this project.

### Distribution
It was decided early on, that the best way to manage this project, would be to break it into distinct modular components which could then be open-sourced. I am currently distributing the components as packages on NPM (node's package manager) and they are already being downloaded and used by other developers within the JS community. 

### Release
I have a CentOS production server running in Amsterdam, that I am deploying my code to.
