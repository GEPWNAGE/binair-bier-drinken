# Binair Bier Drinken

Binair Bier Drinken (Binary Beer Drinking), a fun alcohol related game created
and developed by GEPWNAGE. It runs on https://binairbierdrinken.nl/.

## Rules

Binair Bier Drinken is a team game, for teams of all sizes.

At the start of a game, make sure that you have at least two equal-sized teams,
and ensure that every player has a full glass of beer in front of him/her. Every
participant should have a clear view of the screen which displays the timer.
Make sure that you clearly state who represents the Most Significant Bit and who
represents the Least Significant Bit.

When a game starts, a timer will count down from `2^participants`, to a randomly
chosen number. The moment the timer stops, each team should have the binary
representation of the number in front of them as quickly as possible. Where a 1
is a full glass, and a 0 is an empty glass. The team that has the correct
representation in front of them as quickly as possible, wins the round.

If no team has the correct binary representation in front of them, and they
cannot reach it either (for example, some person in a position with a 1 has
emptied their glass), there is no winner.

Note that players with high bits can start drinking their glasses early, when
the timer goes low enough that their bit will definitely be 0.

Now you know how to play and you can start using https://binairbierdrinken.nl/.

### Example run

Two teams of 4 people start playing. Everyone gets a full glass of beer in front
of them, and gets ready to play.

The host starts the game and the timer starts going down from 16. When it goes
below 8, the people in the most significant bit position start emptying their
glass. The timer ultimately stops at 6, after which both teams have to make sure
that their glasses next to each other look like:

![beers](https://user-images.githubusercontent.com/138556/64081812-5d47df80-cd06-11e9-98d7-e747a4fb511b.png)

Which would be the same as the binary representation of 6: 0110. The team that
has completed this the first, has won the round.

## How to use binairbierdrinken.nl

If you open https://binairbierdrinken.nl/ you can immediately start playing. You
can control the amount of players and the difficulty with which they play. The
difficulty is directly related to how many players will need to drink each
round. The difficulty is the probability that each (independant) bit will be 0.
This immensely helps to reduce or increase the beer consumption of players.

There is also a remote control, which can be used by the judge of the game to
start the game from their phone and change the difficulty and number of players.
The remote control also shows a handy display of the binary representation when
the timer has stopped.

The remote can be used by pressing the `r` button on the keyboard. A QR code
will pop-up, which contains a URL to the remote for the current screen.

# Installation

## For production (using docker)

Use the [gepwnage/binair-bier-drinken](https://hub.docker.com/r/gepwnage/binair-bier-drinken) docker image.

## For development

- Clone this repository
- Clone
  [GEPWNAGE/binair-bier-drinken-ws](https://github.com/GEPWNAGE/binair-bier-drinken-ws).
- Then run `yarn` in both directories.
- In the `binair-bier-drinken-ws`, copy `.env.dev` to `.env`.
- Run `yarn start` in both directories.
- Open `http://localhost:5000`
