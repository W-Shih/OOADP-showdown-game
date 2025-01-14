// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { AiPlayer, Card, Deck, HumanPlayer, Player, Rank, Game as ShowdownGame, Suit } from './showdownGame';


// --------------------------------------------------------------------------------------------------------------------
function _createDeck(): Deck {
    const cards = [];
    for (let rank = Rank.TWO; rank <= Rank.ACE; rank++) {
        for (let suit = Suit.CLUBS; suit <= Suit.SPADES; suit++) {
            const card = new Card(rank, suit);
            cards.push(card);
        }
    }
    const deck = new Deck(cards);
    return deck;
}


// --------------------------------------------------------------------------------------------------------------------
const players: Player[] = [
    new HumanPlayer(),
    new AiPlayer(),
    new AiPlayer(),
    new AiPlayer(),
];
const deck = _createDeck();

const game = new ShowdownGame(players, deck);
game.start();
