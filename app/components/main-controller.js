app.controller('MainController', function($scope) {
   this.test = "Angular is up and running!";

});

app.service('CardService', function() {
    var base = 'assets/img/cards/';
    this.cards = [{
        title: '100 Miles',
        effect: function(player) {
            player.move(100);
        },
        img: base+'100mile.png'
    },{
        title: '200 Miles',
        effect: function(player) {
            player.move(200);
        },
        img: base+'200mile.png'
    },{
        title: '25 Miles',
        effect: function(player) {
            player.move(25);
        },
        img: base+'25mile.png'
    },{
        title: '75 Miles',
        effect: function(player) {
            player.move(75);
        },
        img: base+'75mile.png'
    },{
        title: 'Accident!',
        effect: function(player) {
            player.setHazard('accident');
            player.setStop(true);
        },
        img: base+'accident.png'
    },{
        title: 'Out of Gas!',
        effect: function(player) {
            player.setHazard('out-of-gas');
            player.setStop(true);
        },
        img: base+'outOfGas.png'
    },{
        title: 'Flat Tire!',
        effect: function(player) {
            player.setHazard('flat-tire');
            player.setStop(true);
        },
        img: base+'flatTire.png'
    },{
        title: 'Speed Limit!',
        effect: function(player) {
            player.setLimit(true);
        },
        img: base+'speedLimit.png'
    },{
        title: 'Red Light!',
        effect: function(player) {
            player.setStop(true);
        },
        img: base+'stop.png'
    },{
        title: 'Green Light',
        effect: function(player) {
            player.setStop(false);
        },
        img: base+'go.png'
    },{
        title: 'Spare Tire',
        effect: function(player) {
            player.removeHazard('flat-tire');
            player.setStop(false);
        },
        img: base+'spareTire.png'
    },{
        title: 'Repairs',
        effect: function(player) {
            player.removeHazard('accident');
            player.setStop(false);
        },
        img: base+'repair.png'
    },{
        title: 'Fuel Truck',
        effect: function(player) {
            player.removeHazard('out-of-gas');
            player.setStop(false);
        },
        img: base+'extraTank.png'
    },{
        title: 'Green Light',
        effect: function(player) {
            player.setStop(false);
        },
        img: base+'go.png'
    },{
        title: 'End of Speed Limit',
        effect: function(player) {
            player.setLimit(false);
        },
        img: base+'endOfLimit.png'
    },{
        title: 'Extra Tank!',
        effect: function(player) {
            player.removeHazard('out-of-gas');
            player.setStop(false);
            player.setImmunity('out-of-gas');
        },
        img: base+'extraTank.png'
    },{
        title: 'Driving Ace!',
        effect: function(player) {
            player.removeHazard('accident');
            player.setStop(false);
            player.setImmunity('accident');
        },
        img: base+'drivingAce.png'
    },{
        title: 'Puncture Proof!',
        effect: function(player) {
            player.removeHazard('flat-tire');
            player.setStop(false);
            player.setImmunity('flat-tire');
        },
        img: base+'punctureProof.png'
    },{
        title: 'Right of Way!',
        effect: function(player) {
            player.setStop(false);
            player.setLimit(false);
            player.setImmunity('limit');
            player.setImmunity('stop');
        },
        img: base+'rightOfWay.png'
    },]
});