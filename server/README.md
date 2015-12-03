# Hands on React Native - Server

## Requirements

- working node.js v4.0
- **Twitter OAuth keys**
    - create new Twitter app here: https://apps.twitter.com/
    - go to **Keys and Access Tokens** tab in app setings
    - copy:
        - Consumer Key
        - Consumer Secret
        - Access Token (in section **Your Access Token**)
        - Access Token Secret

## Install Dependencies

```sh
npm install
```

## Run

- set twitter keys in shell:

    ```sh
    export TWITTER_CONSUMER_KEY="your key"
    export TWITTER_CONSUMER_SECRET="your key"
    export TWITTER_ACCESS_TOKEN_KEY="your key"
    export TWITTER_ACCESS_TOKEN_SECRET="your key"
    ```

- then run:

    ```sh
    npm start
    ```

## Run Dev

```sh
npm run watch
```

Works same as **Run** but restarts server on source code change.
