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
7. reload the page and select a user

### docker

- requires docker

1. `docker run -p 3000:3000 nwylynko/budget-youtube`
2. go to http://localhost:3000/
3. click reset database to set up database
4. reload the page and select a user