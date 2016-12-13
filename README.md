[![Trails.js][trails-image]][trails-url]

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Linux + OSX Build Status][ci-image]][ci-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Follow @trailsjs on Twitter][twitter-image]][twitter-url]

Trails is a modern, community-driven web application framework for node.js. It
builds on the pedigree of [Rails](http://rubyonrails.org/) and [Grails](https://grails.org/)
to accelerate development by adhering to a straightforward, convention-based,
API-driven design philosophy.

## Getting Started

#### Install

```sh
$ npm install -g yo generator-trails
$ yo trails
```

#### Trailblaze

Trails uses [Yeoman](http://yeoman.io/) to generate scaffolding for new
applications, and to create resources inside the application.

```sh
$ yo trails --help

Usage:
  yo trails

Generators:

  Create New Model
    yo trails:model <model-name>

  Create New Controller
    yo trails:controller <controller-name>

  Create New Policy
    yo trails:policy <policy-name>

  Create New Service
    yo trails:service <service-name>
```

#### Run

Once installation is complete, begin your journey!
```sh
$ node server.js
```

#### Happy Trails!

## Trailpacks

[Trailpacks](https://github.com/trailsjs/trailpack) extend the framework's
capabilities and allow developers to leverage existing ecosystem tools through a
simple and well-defined API. New features, behavior, APIs, and other functionality
can be added to the Trails framework through Trailpacks.

Out of the box, Trails includes a small suite of trailpacks:

- [core](https://github.com/trailsjs/trailpack-core)
- [router](https://github.com/trailsjs/trailpack-router)
- [repl](https://github.com/trailsjs/trailpack-repl)
- [hapi](https://github.com/trailsjs/trailpack-hapi)
- [waterline](https://github.com/trailsjs/trailpack-waterline)

## Compatibility

- Windows, Mac, and Linux
- Node 4.0 and newer

## Resources

#### Tutorials
- [Getting started](http://blog.jaumard.com/en/2016/01/05/getting-started-with-trails/)
- [Create a custom Trailpack](http://blog.jaumard.com/en/2016/01/06/create-a-trailpack-for-trails/)

#### Videos
- [Getting Started with Trails.js](https://www.youtube.com/watch?v=AbSp8jqFDAY)

#### Support
- [Gitter chat room](https://gitter.im/trailsjs/trails)

## FAQ

#### Q. Does Trails have a Roadmap?

Yes! We have a [Trail Map](https://github.com/trailsjs/trails/blob/master/ROADMAP.md) that
lays out our future plans and release schedule. Feel free to contribute your
ideas.

#### Q. Why does Trails require Node 4+?

Trails is written entirely in ES6, and [runs natively on Node](https://nodejs.org/en/docs/es6/) without
transpiling. If you'd like to use Trails on an older version of node, you can
install babel and configure it to transpile your application into ES5.

#### Q. Is Trails compatible with Sails?

Trails can auto-migrate legacy Sails applications by installing the
[Sails Trailpack](https://github.com/trailsjs/trailpack-sails).
We want this upgrade to be as smooth as possible, and are committed to
maintaining it as a core module.

#### Q. Is Trails a fork of Sails?

No. Trails is built and maintained by former members of the Sails.js core team,
and offers an upgrade path from existing Sails applications, but it utilizes
exactly zero lines of code from the original Sails project.

#### Q. Can I use my own ORM, Webserver, whatever?

Yes! The core team maintains [several](https://github.com/trailsjs?query=trailpack)
popular trailpacks, but you are free to implement your own integration and use
that instead or in addition to the core packs. See the [Trailpack](https://github.com/trailsjs/trailpack)
docs for more info.

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trails/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

[trails-image]: http://i.imgur.com/0iVVRxi.png
[trails-url]: http://trailsjs.io
[npm-image]: https://img.shields.io/npm/v/trails.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trails
[ci-image]: https://img.shields.io/travis/trailsjs/trails.svg?style=flat-square&label=Linux%20/%20OSX
[ci-url]: https://travis-ci.org/trailsjs/trails
[appveyor-image]: https://img.shields.io/appveyor/ci/trailsjs/trails/master.svg?style=flat-square&label=Windows
[appveyor-url]: https://ci.appveyor.com/project/trailsjs/trails
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trails.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trails
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails
[twitter-image]: https://img.shields.io/twitter/follow/trailsjs.svg?style=social
[twitter-url]: https://twitter.com/trailsjs
