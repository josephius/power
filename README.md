# Peace Or War Each Round (POWER)

## Iterated Prisoner’s Dilemma with Death, Asymmetric Power, and Aggressor Reputation

A modification to the Iterated Prisoner’s Dilemma with the following changes:

## Death

Players can now lose points as well as gain them. They start with a random number of points between 1 and 5 and die if they fall to zero or less points at the end of a round.

## Asymmetric Power

The payoff matrix now includes the points variable, and works as follows:

### Cooperate

When a player cooperates, they gain points equal to a quarter of the cooperator’s points, and the other player gains points equal to half the cooperator’s points.

### Defect

When a player defects, they cause the other player to lose points equal to half the defector’s points, and the defector gains a quarter of the defector’s points (up to the other player’s total points).

### C + C

Players each gain points equal to a quarter of the player’s points plus half the other player’s points. Note that this means that over time the player’s points will gradually approach parity. Stronger players benefit proportionately less than weaker players from this, to the point that if the stronger player is more than double the weaker player’s strength, it is worse than not interacting at all.

### C + D

The cooperator gains points equal to a quarter of the cooperator’s points minus half the defector’s points, and the defector gains points equal to half the cooperator’s points plus a quarter of the defector’s points. Note this means that a weaker player can leapfrog a stronger player if they are greater than half as strong.

### D + D

Players gain points equal to a quarter of their points (up to the other player’s total points) minus half the other player’s points. Note that this means the stronger player must be at least double the strength of the weaker player to avoid losing points as well.

## Aggressor Reputation

If a player defects against a non-aggressor, they get labelled an aggressor for the remainder of the game.

## Rounds

Each round of the tournament, there is a random 1/5 chance that two players will make contact. Once contact starts the players will interact for a random number of rounds (each round there is a 1/5 chance of it being the last round) or until one of them dies, after which the surviving players will return to the pool to again have a random chance of making contact. At the end of each round, players that are not interacting will gain points equal to half of their points. Each round there is a 1/200 chance that it will be the last round.

## Strategies

There are a total of twelve strategies, six strategies that are cooperative and never defect first against a non-aggressor, and six that can defect first. Each strategy will start with 10 players for a total of 120 players in the pool.

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

## Scoring

Two scores will be calculated at the end of the game:

* Number of surviving players of each strategy
* Total points between players of each strategy

## Results

With the Avenger strategy in play, the cooperative strategies that are never aggressors seem to always win with enough rounds, with all aggressor strategies dead eventually. Without the Avenger strategy in play, the results vary, but occasionally a single Opportunist strategy ends up winning as the sole survivor.

## License

Apache 2.0