quickquiz-backend
===============

The backend for the quickquiz project.

It works as a JSON API for the MongoDB backend.

It also serves static files from two folders called *public* and *media*. 

## Setup
* Install node.js
* Install MongoDB
* 
```
mongod
```
* 
```
npm install
```
* 
```
node main.js
```

***DONE!***

The server is now running at part 80.

The port can easily be changed by changing the ```PORT``` variable located in *main.js*.

## Usage

*public* is where the minified quickquiz-frontend should be located, everything you need should be created by running the ```grunt``` command in the quickquiz project.

You can send HTTP POST requests towards the ```/result``` and ```/upload``` routes.

You can HTTP GET ```/result``` as well as ```/questions.json```.


### /result
A POST towards ```/result``` should have the following parameters:   

* name
* group
* x
* y
* z

Where ```name``` is the name of the person who's result you're trying to save. ```group``` is the name of the group the ```name``` and ```x```, ```y``` and```z``` are the results of the quiz.

A GET towards ```/result``` should have a single paramenter:

* group
 
The group parameter can be the name of a single group or the names of several group seperated by a ```,```.

### /upload

A POST towards ```/upload``` should be a simple image send using the parameters:

* images
* group

The ```images``` parameter should be a file (an image) from a ```input type="file"```-field.

The ```group``` is the name of the group the image should belong to.
