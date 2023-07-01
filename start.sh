#!/bin/bash

# Activate the pipenv shell and execute subsequent commands
pipenv run concurrently "cd backend && python manage.py runserver" "cd frontend && npm start"