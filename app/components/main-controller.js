app.controller('MainController', function ($scope, CardService) {
    
    //game.isValidPlay(card, player);
    
    var mc = this;
    
    function Game(options) {
        $scope.deck = CardService.getDeck();
        $scope.players = [];
        $scope.activePlayerIndex = 0;
        var playerCount = options.totalPlayers;
        while (playerCount) {
            $scope.players.push(new Player(prompt("Player Name:"), prompt("What is your favorite color?")));
            playerCount--;
        }

        deal();
        startTurn();
        // while(!victory(options.trip)) {
        //     takeTurn();
        // }

    };

    function startTurn() {
        var activePlayer = $scope.players[$scope.activePlayerIndex];
        activePlayer.hand.push(takeCard());
    }

    $scope.playCard = function() {
        //TODO: call is a valid play function
        if(!mc.activeCard && !mc.currentTarget) {
            return;
        }
        mc.activeCard.effect(mc.currentTarget);
        $scope.activePlayerIndex++;
        if ($scope.activePlayerIndex > $scope.players.length - 1) {
            $scope.activePlayerIndex = 0;
        }
        //TODO: remove played card
        mc.activeCard = '';
        mc.currentTarget = '';
        startTurn();
    }

    function victory(trip) {
        for (var i = 0; i < $scope.players.length; i++) {
            var currentPlayer = $scope.players[i];
            if (currentPlayer.distance >= trip) {
                $scope.winner = currentPlayer;
                return true;
            }
        }
    };

    function deal() {
        for (var i = 0; i < $scope.players.length; i++) {
            var currentPlayer = $scope.players[i];
            while (currentPlayer.hand.length < 6) {
                currentPlayer.hand.push(takeCard());
            }
        }
    };

    function takeCard() {
        if ($scope.deck.length > 0) {
            return $scope.deck.pop();
        }
    }

    function Player(name, color) {
        var player = this;
        player.name = name;
        player.color = color;
        player.immunities = {};
        player.hazards = {};
        player.limit = false;
        player.stopped = true;
        player.distance = 0;
        player.hand = [];

        player.setImmunity = function (type) {
            player.immunities[type] = true;
        }
        player.move = function (distance) {
            player.distance += distance;
        }
        player.setHazard = function (type) {
            player.hazards[type] = true;
        }
        player.removeHazard = function (type) {
            player.hazards[type] = false;
        }
        player.setStop = function (bool) {
            player.stopped = bool;
        }
        player.setLimit = function (bool) {
            player.limit = bool;
        }
    }

    new Game({ totalPlayers: 3 });

});

app.service('CardService', function () {
    var base = 'assets/img/cards/';
    var cards = [
        {
            title: '25 Miles',
            effect: function (player) {
                player.move(25);
            },
            img: base + '25mile.png',
            quantity: 10
        }, {
            title: '75 Miles',
            effect: function (player) {
                player.move(75);
            },
            img: base + '75mile.png',
            quantity: 10
        }, {
            title: '50 Miles',
            effect: function (player) {
                player.move(50);
            },
            img: base + '50mile.png',
            quantity: 10
        }, {
            title: '100 Miles',
            effect: function (player) {
                player.move(100);
            },
            img: base + '100mile.png',
            quantity: 12
        }, {
            title: '200 Miles',
            effect: function (player) {
                player.move(200);
            },
            img: base + '200mile.png',
            quantity: 4
        }, {
            title: 'Accident!',
            effect: function (player) {
                player.setHazard('accident');
                player.setStop(true);
            },
            img: base + 'accident.png',
            quantity: 3
        }, {
            title: 'Out of Gas!',
            effect: function (player) {
                player.setHazard('out-of-gas');
                player.setStop(true);
            },
            img: base + 'outOfGas.png',
            quantity: 3
        }, {
            title: 'Flat Tire!',
            effect: function (player) {
                player.setHazard('flat-tire');
                player.setStop(true);
            },
            img: base + 'flatTire.png',
            quantity: 3
        }, {
            title: 'Speed Limit!',
            effect: function (player) {
                player.setLimit(true);
            },
            img: base + 'speedLimit.png',
            quantity: 4
        }, {
            title: 'Red Light!',
            effect: function (player) {
                player.setStop(true);
            },
            img: base + 'stop.png',
            quantity: 5
        }, {
            title: 'Green Light',
            effect: function (player) {
                player.setStop(false);
            },
            img: base + 'go.png',
            quantity: 14
        }, {
            title: 'Spare Tire',
            effect: function (player) {
                player.removeHazard('flat-tire');
                player.setStop(false);
            },
            img: base + 'spareTire.png',
            quantity: 6
        }, {
            title: 'Repairs',
            effect: function (player) {
                player.removeHazard('accident');
                player.setStop(false);
            },
            img: base + 'repairs.png',
            quantity: 6
        }, {
            title: 'Extra Tank',
            effect: function (player) {
                player.removeHazard('out-of-gas');
                player.setStop(false);
            },
            img: base + 'gasoline.png',
            quantity: 6
        }, {
            title: 'End of Speed Limit',
            effect: function (player) {
                player.setLimit(false);
            },
            img: base + 'endOfLimit.png',
            quantity: 6
        }, {
            title: 'Fuel Truck!',
            effect: function (player) {
                player.removeHazard('out-of-gas');
                player.setStop(false);
                player.setImmunity('out-of-gas');
            },
            img: base + 'extraTank.png',
            quantity: 1
        }, {
            title: 'Driving Ace!',
            effect: function (player) {
                player.removeHazard('accident');
                player.setStop(false);
                player.setImmunity('accident');
            },
            img: base + 'drivingAce.png',
            quantity: 1
        }, {
            title: 'Puncture Proof!',
            effect: function (player) {
                player.removeHazard('flat-tire');
                player.setStop(false);
                player.setImmunity('flat-tire');
            },
            img: base + 'punctureProof.png',
            quantity: 1
        }, {
            title: 'Right of Way!',
            effect: function (player) {
                player.setStop(false);
                player.setLimit(false);
                player.setImmunity('limit');
                player.setImmunity('stop');
            },
            img: base + 'rightOfWay.png',
            quantity: 1
        }
    ];

    var Card = function (card) {
        this.title = card.title;
        this.effect = card.effect;
        this.img = card.img;
    }

    this.getDeck = function () {
        var deck = [];
        for (var i = 0; i < cards.length; i++) {
            var currentCard = cards[i];
            for (var j = 0; j < currentCard.quantity; j++) {
                deck.push(new Card(currentCard));
            }
        }
        var shuffled = shuffle(deck, 6);
        return shuffled;
    }


    function shuffle(deck, timesToShuffle) {
        while (timesToShuffle) {
            for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
            timesToShuffle--;
        }
        return deck;
    }

});