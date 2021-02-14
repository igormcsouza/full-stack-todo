# FullStack Todo

![Continuous Integration](https://github.com/igormcsouza/full-stack-todo/workflows/Continuous%20Integration/badge.svg)
![Continuous Deployment](https://github.com/igormcsouza/full-stack-todo/workflows/Continuous%20Deployment/badge.svg)
![Heroku](http://heroku-badge.herokuapp.com/?app=full-stack-todo-bknd&style=flat&svg=1)

Many times, when I'm coding my projects, I found myself forgetting some specific
steps to build something, or a snippet, or something very useful which is done
just sometimes. Thinking of it, I came up with an idea, to create an entire
project to hold all those pieces of code, such as github actions sintax,
database connections and so on.

## How is it built?

I decided to split the frontend and the backend. I'm using
[React.js](https://reactjs.org/) on the front side, and
[Flask](https://flask.palletsprojects.com/en/1.1.x/) on the back side.

### Frontend

The frontend is deployed at [Github Pages](https://pages.github.com/), which is
a great feature to deploy those kind of applications! There are a Javascript
Package that helps to put **React.js** applications at **Github Pages**.

More about on [Frontend](frontend/README.md)

### Backend

On the backend side, I choose to use **Flask** only because is the tool I'm used
to. Nevertheless, this tool is very scalable and simple to use when you have
small projects like this one. I used [Heroku](https://www.heroku.com/) to host
my backend, is very nice even when is free.

More about on [Backend](backend/README.md)

### Database

The database for production was built using Mongo Atlas! There are free clusters
available to small usage!
