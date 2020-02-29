#!/bin/bash

docker build . -t registry.heroku.com/studies-pk/web
docker push registry.heroku.com/studies-pk/web
heroku container:login
heroku container:release web --app=studies-pk
heroku ps:scale web=1 --app=studies-pk