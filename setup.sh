#!/bin/bash
# pipenv shell
start git-bash -c "echo 'Running in window #1'; echo "$PWD"; cd backend/; python manage.py runserver;"
start git-bash -c "echo 'Running in window #1'; echo "$PWD"; cd frontend/; npm start;"
