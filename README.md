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

There are a total of fifteen strategies, six strategies that are cooperative and never defect first against a non-aggressor, and nine that can defect first. Each strategy will start with 10 players for a total of 150 players in the pool.

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
* Farmer (Plays Opportunist except it leaves weaklings alive)

## Scoring

Two scores will be calculated at the end of the game:

* Number of surviving players of each strategy
* Total points between players of each strategy

## Results

With the cooperative strategies that target aggressors in play (having Avenger in particular seems to matter), a decent sized bunch of cooperative strategy players will usually win with enough rounds, with all aggressor strategy players being dead except for Strategic Opportunist and occasionally a few weaker opportunistic ones. Those opportunistic aggressors that survived were probably so weak to start with that they never actually aggressed, hence why they survived.

Without the anti-aggressor strategies in play, it tends to be the case that there are a few cooperative strategy players alive but everyone else has been eaten by an Opportunist strategy player, who only leaves the few alive because they are stronger than it. Occasionally only a single Opportunist or Betrayer survives to the end.

## Analysis

### Justification For Payoff Matrix

Given that outside of a match, a player will gain a quarter of their points to represent peaceful expansion and building, this means that when they cooperate, they each split that quarter into two eighths and give one of the eighths to the other player, and the process of this trade generates an extra eighth based on the friend’s strength, representing gains from trade equal to the amount shared.

Defecting on the other hand results in destruction to the other player equal to one half of the defector’s strength. This loss is twice what can be gained from peaceful building alone outside a match, to represent how much easier it is to destroy than it is to create. The defector also gains a quarter of its own strength up to the max of the other player’s total points, to represent the amount they are able to steal from the other player in the process of warring. It is half the amount of destruction to represent how some things are destroyed entirely rather than just stolen.

Overall, the payoff matrix is asymmetric in the sense that mutual cooperation generates more value than dual defections destroy, and cooperate/defect scenarios there is still a small net benefit generally. Thus the net value of the total payoff matrix is positive This can be changed so that the net value is negative, but this does not affect the result. However, causing the payoff matrix to be symmetric so that net value is zero can create a situation where for stronger players it can be significantly more advantageous to engage in defect/defect rather than cooperate/cooperate. This degenerate state breaks the Prisoner’s Dilemma conditions and leads to a scenario where a single Opportunist or even an Always Defect will frequently win the entire game as the sole survivor, even with anti-aggressor strategies in play. Note this only happens if the cap on points from killing an opponent is removed as well.

### Real World Considerations

Given reasonable assumptions for the payoff matrix, and a varied mix of strategies to start the game with, the general result is usually that an alliance of Cooperative strategies end up surviving to the end, with only the Strategic Opportunist strategy among the Aggressor strategies surviving because it behaves cooperatively amongst the environment of strong alliances once they are formed. It also is functionally a free rider on the Cooperative alliance, and so it is better to be a Cooperative strategy than a Strategic Opportunist because it contributes more to the establishment of the alliance. In any case, usually a significant fraction of entities survive in this scenario, and a Cooperative strategy has a substantial survival rate proportional to the proportion of strategies that are Cooperative.

The exceedingly rare event that a single Opportunist strategy wins is a worse case scenario for the universe, as the probability of survival becomes 1/N, where N is the number of entities in the universe.

Thus, the vast majority of the time, it is best to operate under a Cooperative strategy, preferably one that remembers past aggressors. It is also very beneficial to join an alliance of Cooperative strategies. The more Cooperative strategies, the more likely you are to survive, assuming you play a Cooperative strategy.

Conversely, if the world is filled with Aggressor strategies, the odds of survival fall to 1/N, and really, the survivor is likely the one that was strongest to begin with. Odds are that you are not the first and most powerful entity in the universe. Thus, from a game theoretic point of view, you should play an anti-aggressor Cooperative strategy to maximize your odds of survival and flourishing.

Other sufficiently advanced civilizations and entities in the universe should be able to discover this argument with fairly trivial simulations. This should increase the odds that they will use Cooperative strategies, and further strengthen the argument. It is thus in the best interests of humanity, and also you as an individual, to operate accordingly.

## Conclusion

This simulation has essentially provided a detailed game theoretic proof of the common sense intuition that a world with reciprocal cooperation and retaliation for aggression will lead to a universally better outcome for most people who follow these behaviors than a dog eat dog world where the strong survive and the weak perish, which will eventually lead to one top dog, highlander style, with odds being that you aren’t them. You should therefore open with cooperate, never defect first, and retaliate against aggressors who hurt your friends.

## License

Apache 2.0
