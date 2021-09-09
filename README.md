# budget-YouTube
a very budget somewhat scuffed youtube rip off using nextjs and a sqlite database 

## how to run

### native

- requires nodejs version 14 (lts)
- requires yarn

1. `git clone https://github.com/nwylynko/budget-youtube`
2. `yarn install`
3. `yarn build`
4. `yarn start`
5. go to http://localhost:3000/
6. click reset database to set up database
7. wait for page to reload and select a user

### docker

- requires docker

1. `docker pull nwylynko/budget-youtube:main`
2. `docker run -p 3000:3000 nwylynko/budget-youtube:main`
3. go to http://localhost:3000/
4. click reset database to set up database
5. wait for page to reload and select a user

## warning

- for currently unknown reasons multier throws an error when uploading a video to an instance of this server running in docker