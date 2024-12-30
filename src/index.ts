// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { AiPlayer, HumanPlayer, Player, Game as ShowdownGame } from './showdownGame';


// --------------------------------------------------------------------------------------------------------------------
const players: Player[] = [
    new HumanPlayer(),
    new AiPlayer(),
    new AiPlayer(),
    new AiPlayer(),
];
const game = new ShowdownGame(players);
game.start();
