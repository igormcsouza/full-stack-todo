# FullStack Todo

![Continuous Integration](https://github.com/igormcsouza/full-stack-todo/workflows/Continuous%20Integration/badge.svg)

Many times, when I'm coding my projects, I found myself forgetting some specific
steps to build something, or a snippet, or something very useful which is done
just sometimes. Thinking of it, I came up with an idea, to create an entire
project to hold all those pieces of code, such as github actions sintax,
database connections and so on.

## Deploy applications with Github Actions

### Backend

The service I choose to host the backend was the Heroku! It is very limited, but
for this purpose it will suite just fine! There is an Actions prepared and very
good for this, go to this
[link](https://github.com/marketplace/actions/deploy-to-heroku#env-file) for
more information on the matter.

In order to work fine, you'll need to get you _HEROKU API KEY_ on the account
settings. Add this on the secrets, and should be great.

The application is running on https://full-stack-todo-bknd.herokuapp.com/

### Frontend

Deployed using simple [gh-pages](https://github.com/tschaub/gh-pages) package.

I had many issues on the way
publishing this project, but fortunetly I found this issue which helped me 10
folds! The [link](https://github.com/tschaub/gh-pages/issues/345) to anyone
which want to take a look.

More details on how to deploy, please refer to this
[link](https://create-react-app.dev/docs/deployment/#github-pages)

The application is running on https://igormcsouza.github.io/full-stack-todo
