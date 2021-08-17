# giyera.io 

## Prerequisites

- Docker
- Docker-Compose

## Getting Started

Run the following commands:

```shell
$ bash run init
$ ./run start
```

## Running Commands

```shell
$ # Passing `api` as the first argument will pass the rest as arguments to `manage.py`
$ ./run api shell # Equivalent to `./manage.py shell`
$ # Doing the same with `node` is the same, this time passed to `yarn`
$ ./run node add axios # Equivalent to `yarn add axios`
$ # Passing `sh` as the second argument will connect your terminal to the container
$ ./run api sh # Or `./run node sh` will get you access to the container shell
$ ./run help # Shows more options
```

## Client

The SPA frontend for the _name to be determined_ project, inspired by the game ["Game of the Generals"](https://en.wikipedia.org/wiki/Game_of_the_Generals).

## Under Construction

We are still cleaning up our boots and preparing our muskets for the coming battle. This readme file will contain random bits of information in a "brain-dump" format. We'll try to get some structure soon!

## The Brain-Dump

- The stack used is as follows:
    - React as the core frontend tech
    - [React DND](https://react-dnd.github.io/react-dnd/) to implement drag and drop
    - Redux for state management
        - I only chose redux at the point where implemeting the board state in vanilla React became tedious, I suggest you do the same when adding new dependencies!
- The backend will probably use [Django](https://djangoproject.com) with [Channels](https://channels.readthedocs.io/en/stable/). Whether it will live in this same repo or not is still up for debate.
- There is no CSS library/framework used at the moment. Should probably start using SASS!
- The `src/components` is a big amalgam of, well, React components. Might start putting them in subdirectories in the future, but everythin works so far.
    - `Constsants.js` and `helpers.js` might not be properly placed here?
- Redux related stuff is at `src/features` and `src/store`.
- Audio files are stored at the `public` directory and is accessed via relative (to the webserver) paths.

## License

See the [LICENSE](LICENSE) file.
