# Changelog

## [1.4.1] - 2022-09-03

### Added

- Added continuationToken to achievements getTitle() call

## [1.4.0] - 2022-08-19

### Added

- Added parameter to use a different market (Also set default market to en-us)
- Userstats provider for fetching game statistics

### Changed

- getRecentAchievements() got renamed to getTitleAchievements()
- getRecentAchievements360() got renamed to getTitleAchievements360()

## [1.3.0] - 2022-04-24

### Added

- Added a CLI interface to explore the api calls. Run using `xbox-webapi`.
- Added `UserPresence` provider

## [1.2.0] - 2021-07-23

### Added

- Added the ability to provide the user token + uhs as alternative method.

## [1.1.1] - 2020-12-04

### Fixed

- Fixed authserver not being able to listen on an alternate port

## [1.1.0] - 2020-12-04

### Added

- Added Achievements provider
- Added Screenshots provider
- Added Gameclips provider
- Added Messages provider

### Changed

- Improved token refresh flow

## [1.0.2] - 2020-11-07

### Added

- Added tests for all providers and client

### Changed

- Improved oauth token flow

## [1.0.1] - 2020-10-31

### Changed

- Fixed broken npm package
- Improved oauth token refresh flow

## [1.0.0] - 2020-10-31

### Added

- Renewed api with OAuth support
