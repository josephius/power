# Copyright 2024 Joseph Lin Chu
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Peace Or War Each Round (POWER)
# Iterated Prisoner's Dilemma with Death, Asymmetric Power, and Aggressor Reputation
import random
# There are twelve strategies, six of which are cooperative and never defect first against a non-aggressor, and six that can defect first.
strategies = ['always_cooperate', 'always_defect', 'tit-for-tat', 'grim_trigger', 'pavlov', 'equalizer', 'opportunist', 'smart_opportunist', 'betrayer', 'random', 'enforcer', 'avenger', 'sycophant', 'strategic_opportunist']

class Player:
    points = 0
    strategy = None
    action = None
    opponent = None
    aggressor = False # A state that is determined by whether a player ever defected first in any round of any match
    allies = []
    enemies = []

    def __init__(self, points, strategy):
        self.points = points
        self.strategy = strategy

    def get_action(self):
        if self.strategy == 'always_cooperate':
            return 'cooperate'
        elif self.strategy == 'always_defect':
            return 'defect'
        elif self.strategy == 'tit-for-tat':
            if self.action == None:
                # Always open with cooperate
                return 'cooperate'
            else:
                # Copy opponent's last action
                return self.opponent.action
        elif self.strategy == 'grim_trigger':
            if self.action == None:
                # Always open with cooperate
                return 'cooperate'
            elif self.action == 'defect':
                # Continue retaliation forever
                return 'defect'
            elif self.opponent.action == 'defect':
                # Initiate retaliation
                return 'defect'
            else:
                # Cooperate otherwise
                return 'cooperate'
        elif self.strategy == 'pavlov':
            if self.action == None:
                # Always open with cooperate
                return 'cooperate'
            elif self.opponent.action == 'cooperate':
                # Do what worked before
                return self.action
            else:
                # If before didn't work, switch actions
                if self.action == 'cooperate':
                    return 'defect'
                else:
                    return 'cooperate'
        elif self.strategy == 'equalizer':
            if self.points >= self.opponent.points:
                # Cooperate if opponent is weaker or equal
                return 'cooperate'
            else:
                # Defect if opponent is stronger
                return 'defect'
        elif self.strategy == 'opportunist':
            if self.points > self.opponent.points:
                # Defect if opponent is weaker
                return 'defect'
            else:
                # Otherwise, play Tit-For-Tat
                if self.action == None:
                    return 'cooperate'
                else:
                    return self.opponent.action
        elif self.strategy == 'smart_opportunist':
            if self.points > self.opponent.points * 2.0:
                # Defect if opponent is less than half as strong
                return 'defect'
            else:
                # Otherwise, play Tit-For-Tat
                if self.action == None:
                    return 'cooperate'
                else:
                    return self.opponent.action
        elif self.strategy == 'betrayer':
            if self.points > self.opponent.points / 2.0 and self.opponent.action == 'cooperate':
                # If at least half as strong as opponent, and opponent is cooperating, betray them.
                return 'defect'
            else:
                # Otherwise, play Tit-For-Tat
                if self.action == None:
                    return 'cooperate'
                else:
                    return self.opponent.action
        elif self.strategy == 'random':
            # 50-50 chance of either action
            coin = random.randint(1, 2)
            if coin == 1:
                return 'cooperate'
            else:
                return 'defect'
        elif self.strategy == 'enforcer':
            #if self.opponent.aggressor == True and self.action == None:
            if self.opponent in self.enemies and self.action == None:
                #Open with retaliation against aggressor
                return 'defect'
            else:
                #Play Tit-For-Tat the rest of the time
                if self.action == None:
                    return 'cooperate'
                else:
                    return self.opponent.action
        elif self.strategy == 'avenger':
            #if self.opponent.aggressor == True and self.action == None:
            if self.opponent in self.enemies and self.action == None:
                # Open with retaliation against aggressor
                return 'defect'
            # Play Grim Trigger the rest of the time
            elif self.action == None:
                return 'cooperate'
            elif self.action == 'defect':
                return 'defect'
            elif self.opponent.action == 'defect':
                return 'defect'
            else:
                return 'cooperate'
        elif self.strategy == 'sycophant':
            if self.points > self.opponent.points:
                # Defect if opponent is weaker
                return 'defect'
            else:
                # Cooperate if opponent is stronger
                return 'cooperate'
        elif self.strategy == 'strategic_opportunist':
            max_points = 0
            for opponent in self.opponent.allies:
                if opponent.points > max_points:
                    max_points = opponent.points
            if self.points > max_points:
                # Defect if all opponents in alliance are weaker
                return 'defect'
            else:
                # Otherwise, play Tit-For-Tat
                if self.action == None:
                    return 'cooperate'
                else:
                    return self.opponent.action
class Game:
    players = []
    pairs = {}
    def __init__(self):
        for strat in strategies:
            for i in range(10):
                # Initialize 10 players per strategy, with a random starting points between 1 and 5
                self.players.append(Player(random.randint(1, 5), strat))
    
    def play_round(self):
        done = [] # Flags for whether a player as already gone or is dead
        for p in self.players:
            # Go through the list of players and check if they are alive or dead
            if p.points > 0:
                # Living players
                done.append(False)
            else:
                # Dead players
                done.append(True)
        for i, player in enumerate(self.players):
            # Go through the list of players again to actually play the game
            roll = random.randint(1, 5) # 1/5 chance to either enter or exit a match
            if done[i] == False:
                # Alive and hasn't played yet
                if i not in self.pairs:
                    # Not paired currently
                    if roll == 1:
                        # Pair players
                        pairing = None
                        tries = set()
                        while pairing == None:
                            index = random.randint(0, len(self.players) - 1) # Choose a random player
                            if index != i and index not in self.pairs and done[index] == False:
                                # Random player is not the same player, is not already in a match, and is still alive and hasn't gone
                                pairing = index
                            tries.add(index)
                            if len(tries) == len(self.players):
                                # Gone through all the players in the list and still no match means there are no open options
                                pairing = i
                        if pairing != i:
                            # Match the players up
                            self.pairs[i] = pairing
                            self.pairs[pairing] = i
                            player.opponent = self.players[pairing]
                            player.opponent.opponent = player
                            play_dilemma(player) # Play first round of match
                            done[i] = True
                            done[self.pairs[i]] = True
                    else:
                        # Gain points when not in a match
                        player.points += player.points / 2.0
                else:
                    # Player is in a match
                    play_dilemma(player) # Play next round of match
                    done[i] = True
                    done[self.pairs[i]] = True
                    if roll == 1 or player.points <= 0 or player.opponent.points <= 0:
                        # Exit the match if rolled or if either player is dead
                        self.pairs.pop(self.pairs[i])
                        self.pairs.pop(i)
                        player.action = None
                        player.opponent.action = None
                        player.opponent.opponent = None
                        player.opponent = None                      

    def score(self):
        surviving_strategies = set()
        strategy_counts = {} # Count number of each surviving strategy
        strategy_points = {} # Count total points of each surviving strategy
        for player in self.players:
            if player.points > 0:
                # Only count survivors
                if player.strategy in surviving_strategies:
                    strategy_counts[player.strategy] += 1
                    strategy_points[player.strategy] += player.points
                else:
                    surviving_strategies.add(player.strategy)
                    strategy_counts[player.strategy] = 1
                    strategy_points[player.strategy] = player.points
        # Order by highest to lowest
        strategy_counts = dict(sorted(strategy_counts.items(), key=lambda item: item[1], reverse=True))
        strategy_points = dict(sorted(strategy_points.items(), key=lambda item: item[1], reverse=True))
        # Display results
        print('Surviving Strategies: ' + str(surviving_strategies))
        print('Strategy Counts' + str(strategy_counts))
        print('Strategy Points' + str(strategy_points))


def play_dilemma(player):
    # Create temporary state variables
    player_1_action = player.get_action()
    player_2_action = player.opponent.get_action()
    player_1_points = player.points
    player_2_points = player.opponent.points
    player_1_aggressor = player.aggressor
    player_2_aggressor = player.opponent.aggressor
    # Player 1 can cooperate or defect
    if player_1_action == 'cooperate':
        player_1_points += player.points / 4.0
        player_2_points += player.points / 2.0
        if player not in player.opponent.allies and player_2_action == 'cooperate':
            # Peace
            for p in player.opponent.allies:
                # Join the alliance
                if player not in p.allies:
                    p.allies.append(player)
            player.opponent.allies.append(player)
    elif player_1_action == 'defect':
        player_1_points += min(player.points / 4.0, player.opponent.points) # Can't gain more points than the opponent's points
        player_2_points -= player.points / 2.0
        if player.opponent.aggressor == False:
            # When a player defects first against a non-aggressor, they are labeled an aggressor
            player_1_aggressor = True
        if player not in player.opponent.enemies and player.opponent not in player.enemies:
            # Act of aggression
            if player in player.opponent.allies:
                # Remove from allies and make enemy
                player.opponent.allies.remove(player)
            player.opponent.enemies.append(player)
            for p in player.opponent.allies:
                # Remove from alliance and make enemy of entire alliance
                if player in p.allies:
                    p.allies.remove(player)
                p.enemies.append(player)
            if player.opponent in player.allies:
                # Remove from allies and make enemy
                player.allies.remove(player.opponent)
            player.enemies.append(player.opponent)
            for p in player.allies:
                # Remove from alliance and make enemy of entire alliance
                if player.opponent in p.allies:
                    p.allies.remove(player.opponent)
                p.enemies.append(player.opponent)
        
    # Player 2 can cooperate or defect
    if player_2_action == 'cooperate':
        player_2_points += player.opponent.points / 4.0
        player_1_points += player.opponent.points / 2.0
        if player not in player.allies and player_1_action == 'cooperate':
            # Peace
            for p in player.allies:
                # Join the alliance
                if player not in p.allies:
                    p.allies.append(player)
            player.allies.append(player)
    elif player_2_action == 'defect':
        player_2_points += min(player.opponent.points / 4.0, player.points) # Can't gain more points than the opponent's points
        player_1_points -= player.opponent.points / 2.0
        if player.aggressor == False:
            # When a player defects first against a non-aggressor, they are labeled an aggressor
            player_2_aggressor = True
        if player.opponent not in player.enemies and player not in player.opponent.enemies:
            # Act of aggression
            if player.opponent in player.allies:
                # Remove from allies and make enemy
                player.allies.remove(player.opponent)
            player.enemies.append(player.opponent)
            for p in player.allies:
                # Remove from alliance and make enemy of entire alliance
                if player.opponent in p.allies:
                    p.allies.remove(player.opponent)
                p.enemies.append(player.opponent)
            if player in player.opponent.allies:
                # Remove from allies and make enemy
                player.opponent.allies.remove(player)
            player.opponent.enemies.append(player)
            for p in player.opponent.allies:
                # Remove from alliance and make enemy of entire alliance
                if player in p.allies:
                    p.allies.remove(player)
                p.enemies.append(player)
    # Set permanent state variables with temporary ones to ensure that round is a single simultaneous turn
    player.action = player_1_action
    player.opponent.action = player_2_action
    player.points = player_1_points
    player.opponent.points = player_2_points
    player.aggressor = player_1_aggressor
    player.opponent.aggressor = player_2_aggressor

def main():
    game = Game()
    round = 1
    running = True
    while running == True:
        print(round)
        game.play_round()
        round += 1
        roll = random.randint(1, 200) # Each round there is a 1/100 chance of the game ending
        if roll == 1:
            running = False
    game.score()

if __name__ == "__main__":
    main()
