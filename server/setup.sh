#!/bin/bash

dropdb slack
createdb slack
psql slack < setup.sql
npm i
npm start
