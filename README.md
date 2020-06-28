# react-autocomplete-demo

Demo app for autocomplete widget using React and Elastic Search

The full write-up is available at https://medium.com/@rcdexta

### Setup

Clone the repository and install the dependencies

```bash
$ git clone git@github.com:rcdexta/react-autocomplete-demo.git
$ cd react-autocomplete-demo
$ yarn
```

Start the server by running `yarn start` command

The UI expects elastic search to be running on 9200 port.

### Start in node container

```
sudo docker run -ti -p 3000:3000 -v `pwd`/react-autocomplete-demo:/usr/src/app node:12 bash
cd /usr/src/app
yarn start
```

Navigate to "host:3000"



