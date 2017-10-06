# Changelog

## [0.3.0] - 2017-10-06
### Added
- `loadScript(src, callbackName)` action creator can now take an optional second parameter for specific JSONP callbacks

## [0.2.0] - 2016-11-27
### Added
- `loadScript(src)` action creator can now take a single-parameter `Function` for JSONP callbacks

## [0.1.1] - 2016-10-22
### Changed
- Updated build status badge style

## [0.1.0] - 2016-10-22
### Added
- `loadScript(src)` action creator now returns a `Promise` that resolves when the script has loaded
- [`redux`](http://reduxjs.org) is now specified in `peerDependencies`
- [`redux-thunk`](https://github.com/gaearon/redux-thunk) is now a peer dependency
- Changelog

## [0.0.1] - 2016-10-15
Initial release
