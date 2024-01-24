// Copyright 2024 Joseph Lin Chu
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http) {//www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Peace Or War Each Round (POWER)
// Iterated Prisoner's Dilemma with Death, Asymmetric Power, and Aggressor Reputation
// There are fifteen strategies, six of which are cooperative and never defect first against a non-aggressor, and nine that can defect first.
strategies = [
    'AlwaysCooperate', 
    'AlwaysDefect', 
    'TitForTat', 
    'GrimTrigger', 
    'Pavlov', 
    'Equalizer', 
    'Opportunist', 
    'SmartOpportunist', 
    'Betrayer', 
    'Random', 
    'Enforcer', 
    'Avenger', 
    'Sycophant', 
    'StrategicOpportunist', 
    'Farmer'
];

var max_start_points = 5 // Minimum 1
var gains_outside_match = 4.0 // 1/4
var chance_of_match = 5 // 1/5
var chance_of_end = 200 // 1/200

var cooperate_player_gains = 8.0 // 1/8
var cooperate_opponent_gains = 4.0 // 1/4
var defect_player_gains = 4.0 // 1/4
var defect_opponent_loses = 2.0 // 1/2
var cap_defect_gains = true

var aggressor_tag = false
var alliances = true

class Player {
    points = 0;
    strategy = null;
    action = null;
    opponent = null;
    aggressor = false; // A state that is determined by whether a player ever defected first in any round of any match
    allies = new Set();
    enemies = new Set();

    constructor(points, strategy) {
        this.points = points;
        this.strategy = strategy;
    }

    get_action() {
        if (this.strategy == 'AlwaysCooperate') {
            return 'cooperate';
        }
        else if (this.strategy == 'AlwaysDefect') {
            return 'defect';
        }
        else if (this.strategy == 'TitForTat') {
            if (this.action == null) {
                // Always open with cooperate
                return 'cooperate';
            }
            else {
                // Copy opponent's last action
                return this.opponent.action;
            }
        }
        else if (this.strategy == 'GrimTrigger') {
            if (this.action == null) {
                // Always open with cooperate
                return 'cooperate';
            }
            else if (this.action == 'defect') {
                // Continue retaliation forever
                return 'defect';
            }
            else if (this.opponent.action == 'defect') {
                // Initiate retaliation
                return 'defect';
            }
            else {
                // Cooperate otherwise
                return 'cooperate';
            }
        }
        else if (this.strategy == 'Pavlov') {
            if (this.action == null) {
                // Always open with cooperate
                return 'cooperate';
            }
            else if (this.opponent.action == 'cooperate') {
                // Do what worked before
                return this.action;
            }
            else {
                // if before didn't work, switch actions
                if (this.action == 'cooperate') {
                    return 'defect';
                }
                else {
                    return 'cooperate';
                }
            }
        }
        else if (this.strategy == 'Equalizer') {
            if (this.points >= this.opponent.points) {
                // Cooperate if opponent is weaker or equal
                return 'cooperate';
            }
            else {
                // Defect if opponent is stronger
                return 'defect';
            }
        }
        else if (this.strategy == 'Opportunist') {
            if (this.points > this.opponent.points) {
                // Defect if opponent is weaker
                return 'defect';
            }
            else {
                // Otherwise, play Tit-For-Tat
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
        else if (this.strategy == 'SmartOpportunist') {
            if (this.points > this.opponent.points * 2.0) {
                // Defect if opponent is less than half as strong
                return 'defect';
            }
            else {
                // Otherwise, play Tit-For-Tat
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
        else if (this.strategy == 'Betrayer') {
            if (this.points > this.opponent.points / 2.0 && this.opponent.action == 'cooperate') {
                // if at least half as strong as opponent, and opponent is cooperating, betray them.
                return 'defect';
            }
            else {
                // Otherwise, play Tit-For-Tat
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
        else if (this.strategy == 'Random') {
            // 50-50 chance of either action
            var coin = Math.floor(Math.random() * 2) + 1;
            if (coin == 1) {
                return 'cooperate';
            }
            else {
                return 'defect';
            }
        }
        else if (this.strategy == 'Enforcer') {
            if (aggressor_tag && this.opponent.aggressor == true && this.action == null) {
                //Open with retaliation against aggressor
                return 'defect';
            }
            if (alliances && this.enemies.has(this.opponent) && this.action == null) {
                //Open with retaliation against aggressor
                return 'defect';
            }
            else {
                //Play Tit-For-Tat the rest of the time
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
        else if (this.strategy == 'Avenger') {
            if (aggressor_tag && this.opponent.aggressor == true && this.action == null) {
                //Open with retaliation against aggressor
                return 'defect';
            }
            if (alliances && this.enemies.has(this.opponent) && this.action == null) {
                //Open with retaliation against aggressor
                return 'defect';
            }
            // Play Grim Trigger the rest of the time
            else if (this.action == null) {
                return 'cooperate';
            }
            else if (this.action == 'defect') {
                return 'defect';
            }
            else if (this.opponent.action == 'defect') {
                return 'defect';
            }
            else { 
                return 'cooperate';
            }
        }
        else if (this.strategy == 'Sycophant') {
            if (this.points > this.opponent.points) {
                // Defect if opponent is weaker
                return 'defect';
            }
            else {
                // Cooperate if opponent is stronger
                return 'cooperate';
            }
        }
        else if (this.strategy == 'StrategicOpportunist') {
            var max_points = this.opponent.points;
            for (var ally of this.opponent.allies) {
                if (ally.points > max_points) {
                    max_points = ally.points;
                }
            }
            if (this.points > max_points) {
                // Defect if all opponents in alliance are weaker
                return 'defect';
            }
            else {
                // Otherwise, play Tit-For-Tat
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
        else if (this.strategy == 'Farmer') {
            if (this.points > this.opponent.points * 2.0) {
                // Don't kill weaklings
                return 'cooperate';
            }
            else if (this.points > this.opponent.points) {
                // Defect if opponent is weaker but not immediately killable
                return 'defect';
            }
            else {
                // Otherwise, play Tit-For-Tat
                if (this.action == null) {
                    return 'cooperate';
                }
                else {
                    return this.opponent.action;
                }
            }
        }
    }
}
                
class Game {
    players = [];
    pairs = new Map();
    constructor() {
        for (var strat of strategies) {
            for (var i = 0; i < Number(document.getElementById("Num" + strat).innerHTML); i++) {
                // Initialize 10 players per strategy, with a random starting points between 1 and 5
                this.players.push(new Player(Math.floor(Math.random() * max_start_points) + 1, strat));
            }
        }
    }
    
    play_round() {
        var done = []; // Flags for whether a player as already gone or is dead
        for (var p of this.players) {
            // Go through the list of players and check if they are alive or dead
            if (p.points > 0) {
                // Living players
                done.push(false);
            }
            else {
                // Dead players
                done.push(true);
            }
        }
        for (var i = 0; i < this.players.length; i++) {
            // Go through the list of players again to actually play the game
            var roll = Math.floor(Math.random() * chance_of_match) + 1; // 1/5 chance to either enter or exit a match
            if (done[i] == false) {
                // Alive and hasn't played yet
                if (!this.pairs.has(i)) {
                    // Not paired currently
                    if (roll == 1) {
                        // Pair players
                        var pairing = null;
                        var tries = new Set();
                        while (pairing == null) {
                            var index = Math.floor(Math.random() * this.players.length); // Choose a random player
                            if (index != i && !this.pairs.has(index) && done[index] == false) {
                                // Random player is not the same player, is not already in a match, and is still alive and hasn't gone
                                pairing = index;
                            }
                            tries.add(index)
                            if (tries.size == this.players.length) {
                                // Gone through all the players in the list and still no match means there are no open options
                                pairing = i;
                            }
                        }
                        if (pairing != i) {
                            // Match the players up
                            this.pairs.set(i, pairing);
                            this.pairs.set(pairing, i);
                            this.players[i].opponent = this.players[pairing];
                            this.players[i].opponent.opponent = this.players[i];
                            PlayDilemma(this.players[i]); // Play first round of match
                            done[i] = true;
                            done[pairing] = true;
                        }
                    }
                    else {
                        // Gain points when not in a match
                        if (gains_outside_match > 0) {
                            this.players[i].points += this.players[i].points / gains_outside_match;
                        }
                    }
                }
                else {
                    // Player is in a match
                    PlayDilemma(this.players[i]); // Play next round of match
                    done[i] = true;
                    done[this.pairs.get(i)] = true;
                    if (roll == 1 || this.players[i].points <= 0 || this.players[i].opponent.points <= 0) {
                        // Exit the match if rolled or if either player is dead
                        this.pairs.delete(this.pairs.get(i));
                        this.pairs.delete(i);
                        this.players[i].action = null;
                        this.players[i].opponent.action = null;
                        this.players[i].opponent.opponent = null;
                        this.players[i].opponent = null;
                    }
                }
            }
        }
    }                

    score() {
        var surviving_strategies = new Set();
        var strategy_counts = new Map(); // Count number of each surviving strategy
        var strategy_points = new Map(); // Count total points of each surviving strategy
        for (var player of this.players) {
            if (player.points > 0) {
                // Only count survivors
                if (surviving_strategies.has(player.strategy)) {
                    strategy_counts.set(player.strategy, strategy_counts.get(player.strategy) + 1);
                    strategy_points.set(player.strategy, strategy_points.get(player.strategy) + player.points);
                }
                else {
                    surviving_strategies.add(player.strategy);
                    strategy_counts.set(player.strategy, 1);
                    strategy_points.set(player.strategy, player.points);
                }
            }
        }
        // Display results
        for (var strategy of strategies) {
            if (surviving_strategies.has(strategy)) {
                document.getElementById("Pop" + strategy).innerHTML = strategy_counts.get(strategy);
                document.getElementById("Points" + strategy).innerHTML = strategy_points.get(strategy);
            }
            else {
                document.getElementById("Pop" + strategy).innerHTML = 0;
                document.getElementById("Points" + strategy).innerHTML = 0;
            }
        }
    }
}

function PlayDilemma(player) {
    // Create temporary state variables
    var player_1_action = player.get_action();
    var player_2_action = player.opponent.get_action();
    var player_1_points = player.points;
    var player_2_points = player.opponent.points;
    var player_1_aggressor = player.aggressor;
    var player_2_aggressor = player.opponent.aggressor;
    // Player 1 can cooperate or defect
    if (player_1_action == 'cooperate') {
        if (cooperate_player_gains > 0) {
            player_1_points += player.points / cooperate_player_gains;
        }
        if (cooperate_opponent_gains > 0) {
            player_2_points += player.points / cooperate_opponent_gains;
        }
        if (alliances && !player.opponent.allies.has(player) && !player.opponent.enemies.has(player) && player_2_action == 'cooperate') {
            // Peace
            player.opponent.allies.add(player);
            for (var ally of player.opponent.allies) {
                // Join the alliance
                if (!ally.allies.has(player)) {
                    ally.allies.add(player);
                }
            }
        }
    }
    else if (player_1_action == 'defect') {
        if (defect_player_gains > 0) {
            if (cap_defect_gains) {
                player_1_points += Math.min(player.points / defect_player_gains, player.opponent.points); // Can't gain more points than the opponent's points
            
            }
            else {
                player_1_points += player.points / defect_player_gains;
            }
        }
        if (defect_opponent_loses > 0) {
            player_2_points -= player.points / defect_opponent_loses;
        }
        if (aggressor_tag && player.opponent.aggressor == false) {
            // When a player defects first against a non-aggressor, they are labeled an aggressor
            player_1_aggressor = true;
        }
        if (alliances && !player.opponent.enemies.has(player) && !player.enemies.has(player.opponent)) {
            // Act of aggression
            if (player.opponent.allies.has(player)) {
                // Remove from allies and make enemy
                player.opponent.allies.delete(player);
            }
            player.opponent.enemies.add(player)
            for (var ally of player.opponent.allies) {
                // Remove from alliance and make enemy of entire alliance
                if (ally.allies.has(player)) {
                    ally.allies.delete(player);
                }
                ally.enemies.add(player);
            }
            if (player_2_action == 'defect') {
                if (player.allies.has(player.opponent)) {
                    // Remove from allies and make enemy
                    player.allies.delete(player.opponent);
                }
                player.enemies.add(player.opponent)
                for (var ally of player.allies) {
                    // Remove from alliance and make enemy of entire alliance
                    if (ally.allies.has(player.opponent)) {
                        ally.allies.delete(player.opponent);
                    }
                    ally.enemies.add(player.opponent);
                }
            }
        }
    }
        
    // Player 2 can cooperate or defect
    if (player_2_action == 'cooperate') {
        if (cooperate_player_gains > 0) {
            player_2_points += player.opponent.points / cooperate_player_gains;
        }
        if (cooperate_opponent_gains > 0) {
            player_1_points += player.opponent.points / cooperate_opponent_gains;
        }
        if (alliances && !player.allies.has(player.opponent) && player.enemies.has(player.opponent) && player_1_action == 'cooperate') {
            // Peace
            player.allies.add(player.opponent)
            for (var ally of player.allies) {
                // Join the alliance
                if (!ally.allies.has(player.opponent)) {
                    ally.allies.add(player.opponent);
                }
            }
        }
    }
    else if (player_2_action == 'defect') {
        if (defect_player_gains > 0) {
            if (cap_defect_gains) {
                player_2_points += Math.min(player.opponent.points / defect_player_gains, player.points); // Can't gain more points than the opponent's points
            }
            else {
                player_2_points += player.opponent.points / defect_player_gains;
            }
        }
        if (defect_opponent_loses > 0) {
            player_1_points -= player.opponent.points / defect_opponent_loses;
        }
        
        if (aggressor_tag && player.aggressor == false) {
            // When a player defects first against a non-aggressor, they are labeled an aggressor
            player_2_aggressor = true;
        }
        if (alliances && !player.enemies.has(player.opponent) && !player.opponent.enemies.has(player)) {
            // Act of aggression
            if (player.allies.has(player.opponent)) {
                // Remove from allies and make enemy
                player.allies.delete(player.opponent);
            }
            player.enemies.add(player.opponent)
            for (var ally of player.allies) {
                // Remove from alliance and make enemy of entire alliance
                if (ally.allies.has(player.opponent)) {
                    ally.allies.delete(player.opponent);
                }
                ally.enemies.add(player.opponent);
            }
            if (player_1_action == 'defect') {
                if (player.opponent.allies.has(player)) {
                    // Remove from allies and make enemy
                    player.opponent.allies.delete(player);
                }
                player.opponent.enemies.add(player)
                for (var ally of player.opponent.allies) {
                    // Remove from alliance and make enemy of entire alliance
                    if (ally.allies.has(player)) {
                        ally.allies.delete(player);
                    }
                    ally.enemies.add(player);
                }
            }
        }
    }
    // Set permanent state variables with temporary ones to ensure that round is a single simultaneous turn
    player.action = player_1_action;
    player.opponent.action = player_2_action;
    player.points = player_1_points;
    player.opponent.points = player_2_points;
    player.aggressor = player_1_aggressor;
    player.opponent.aggressor = player_2_aggressor;
}

function RunSimulation() {
    max_start_points = Number(document.getElementById("MaxStartPoints").innerHTML)
    gains_outside_match = getDenominator(document.getElementById("GainsOutsideMatch").innerHTML)
    chance_of_match = getDenominator(document.getElementById("ChanceOfMatch").innerHTML)
    chance_of_end = getDenominator(document.getElementById("ChanceOfEnd").innerHTML)
    
    cooperate_player_gains = getDenominator(document.getElementById("CooperatePlayerGains").innerHTML)
    cooperate_opponent_gains = getDenominator(document.getElementById("CooperateOpponentGains").innerHTML)
    defect_player_gains = getDenominator(document.getElementById("DefectPlayerGains").innerHTML)
    defect_opponent_loses = getDenominator(document.getElementById("DefectOpponentLoses").innerHTML)
    cap_defect_gains = document.getElementById("CapDefectGains").checked
    
    aggressor_tag = document.getElementById("AggressorTag").checked
    alliances = document.getElementById("Alliances").checked

    var game = new Game()
    var round = 1
    var running = true
    while (running == true) {
        document.getElementById("RoundCounter").innerHTML = round;
        game.play_round();
        round += 1;
        roll = Math.floor(Math.random() * chance_of_end) + 1; // Each round there is a 1/200 chance of the game ending
        if (roll == 1) {
            running = false;
        }
    }
    game.score()
}