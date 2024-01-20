# Peace Or War Each Round (POWER)

## Iterated Prisoner’s Dilemma with Death, Asymmetric Power, and Aggressor Reputation

A modification to the Iterated Prisoner’s Dilemma with the following changes:

## Death

Players can now lose points as well as gain them. They start with a random number of points between 1 and 5 and die if they fall to zero or less points at the end of a round.

## Asymmetric Power

The payoff matrix now includes the points variable, and works as follows:

### Cooperate

When a player cooperates, they gain points equal to an eighth of the cooperator’s points, and the other player gains points equal to a quarter of the cooperator’s points.

### Defect

When a player defects, they cause the other player to lose points equal to half the defector’s points, and the defector gains a quarter of the defector’s points (up to the other player’s total points).

### C + C

Players each gain points equal to an eighth of the player’s points plus a quarter of the other player’s points. Note that this means that over time the player’s points will gradually approach parity. Stronger players benefit proportionately less than weaker players from this, to the point that if the stronger player is more than double the weaker player’s strength, it is worse than not interacting at all.

### C + D

The cooperator gains points equal to an eighth of the cooperator’s points minus half the defector’s points, and the defector gains points equal to a quarter of the cooperator’s points plus a quarter of the defector’s points (up to the cooperator’s total points). Note this means that a weaker player can leapfrog a stronger player if they are greater than half as strong.

### D + D

Players gain points equal to a quarter of their points (up to the other player’s total points) minus half the other player’s points. Note that this means the stronger player must be at least double the strength of the weaker player to avoid losing points as well.

### Payoff Matrix

|           | Cooperate | Defect |
|-----------|-----------|--------|
| Cooperate | 3, 3      | -3, 4  |
| Defect    | 4, -3     | -2, -2 |

## Aggressor Reputation

~If a player defects against a non-aggressor, they get labelled an aggressor for the remainder of the game.~

Players can form alliances (technically defensive pacts) with players they are cooperating with and make enemies with anyone who defects first against themselves or an ally. Such enemies are considered aggressors to everyone in the alliance.

## Rounds

Each round of the tournament, there is a random 1/5 chance that two players will make contact. Once contact starts the players will interact for a random number of rounds (each round there is a 1/5 chance of it being the last round) or until one of them dies, after which the surviving players will return to the pool to again have a random chance of making contact. At the end of each round, players that are not interacting will gain points equal to a quarter of their points. Each round there is a 1/200 chance that it will be the last round.

## Strategies

There are a total of fourteen strategies, six strategies that are cooperative and never defect first against a non-aggressor, and eight that can defect first. Each strategy will start with 10 players for a total of 140 players in the pool.

### Cooperative

* Always Cooperate
* Tit-For-Tat
* Grim Trigger
* Pavlov
* Enforcer (Opens with Defect against aggressors, otherwise Tit-For-Tat)
* Avenger (Opens with Defect against aggressors, otherwise Grim Trigger)

### Aggressive

* Always Defect
* Equalizer (Cooperate when stronger or equal, Defect when weaker)
* Opportunist (Defect when stronger, otherwise Tit-For-Tat)
* Smart Opportunist (Defect when twice as strong or greater, otherwise Tit-For-Tat)
* Betrayer (Defect when greater than half as strong and other player Cooperates, otherwise Tit-For-Tat)
* Random (50% Cooperate, 50% Defect)
* Sycophant (Defect when stronger, otherwise Cooperate)
* Strategic Opportunist (Defect when stronger than strongest player in alliance, otherwise Tit-For-Tat)

## Scoring

Two scores will be calculated at the end of the game:

* Number of surviving players of each strategy
* Total points between players of each strategy

## Results

With the cooperative strategies that target aggressors in play (having Avenger in particular seems to matter), a decent sized bunch of cooperative strategy players will usually win with enough rounds, with all aggressor strategy players being dead except for Strategic Opportunist and occasionally a few weaker opportunistic ones. Those opportunistic aggressors that survived were probably so weak to start with that they never actually aggressed, hence why they survived.

Without the anti-aggressor strategies in play, it tends to be the case that there are a few cooperative strategy players alive but everyone else has been eaten by an Opportunist strategy player, who only leaves the few alive because they are stronger than it. Occasionally only a single Opportunist or Betrayer survives to the end.

## License

Apache 2.0
