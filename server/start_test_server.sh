#!/bin/bash

dropdb testslack
createdb testslack
npm run start:test:server
