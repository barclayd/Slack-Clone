# Slack

Slack clone built using React.js, Node.js and GraphQL.

### Features

- [x] Advanced user login and sign up with refresh token - handled and verified through muiddleware and afterware
- [x] Create Teams
- [x] Add new channels
- [x] Add new members to teams
- [x] Instant messaging with the use of GraphQL subscriptions as an implementation of web sockets
- [x] Fully authenticated
- [x] Sending of direct messages

### How to Setup

Please ensure that Progres is set up on your machine and a database named $user exists.

If you are starting from scratch, follow these steps to set up Postgres, replacing your user name within ``<user>``:

### MacOS

```shell script

brew doctor
brew update
brew install postgresql
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
pg_start
createdb <user>
```

To verify you have Postgres installed correctly, running the following command:

```shell script
psql
```

should produce an output in the terminal that looks similar to this:

```shell script
$ psql
psql (11.5)
Type "help" for help.

<user>=# 
```

```
$ git clone https://github.com/barclayd/Slack-Clone.git
$ cd server
$ npm run setup
$ cd .. && cd client
$ npm run start
```
### How to Run

```
$ git clone https://github.com/barclayd/Slack-Clone.git
$ cd server
$ npm run start
$ cd .. && cd client
$ npm run start
```

### Frontend

### Server

### Future improvements

* Member of channel is typing
* Drag and drop files for upload
