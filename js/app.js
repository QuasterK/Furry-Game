function Furry() {

    this.x = 5;
    this.y = 5;
    this.direction = 'right';

}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    var self = this;
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();

    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);

    };
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');

    };
    this.moveFurry = function () {
        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y - 1;

        } else {
            this.furry.y = this.furry.y + 1;

        }
        startGame.gameOver();
        startGame.showFurry();
        startGame.checkMoney();
    };


    this.hideVisibleFurry = function () {
        this.furryPosition = document.querySelector('.furry');
        this.furryPosition.classList.remove('furry');
    };

    this.turnFurry = document.addEventListener('keydown', function (event) {
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';

                break;
            case 38:
                self.furry.direction = 'up';

                break;
            case 39:
                self.furry.direction = 'right';

                break;
            case 40:
                self.furry.direction = 'down';

                break;
        }


        /*startGame.turnFurry();*/
    });
    this.checkMoney = function () {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.coinPosition = document.querySelector('.coin');
            this.coinPosition.classList.remove('coin');

            this.score++;
            console.log(this.score);
            this.mainScore = document.querySelector('#score strong');
            this.mainScore.innerHTML = this.score;
            this.coin = new Coin();

            this.showCoin(this.coin);

        }
    };
    this.gameOver = function () {

        if (this.furry.x <= -1 || this.furry.x >= 10) {
            startGame.hideVisibleFurry();
            clearInterval( this.setInterval)
            var endGame = document.querySelector('#over');
            endGame.classList.remove('invisible');
            var end_text = document.querySelector('#end_text');
            end_text.classList.add('end_game');
            var end_score = document.querySelector('#end_text span');
            end_score.innerHTML = this.score;
        }
        if (this.furry.y <= -1 || this.furry.y >= 10) {
            startGame.hideVisibleFurry();
            clearInterval( this.setInterval);
            var endGame = document.querySelector('#over');
            endGame.classList.remove('invisible');
            var end_text = document.querySelector('#end_text');
            end_text.classList.add('end_game');
            var end_score = document.querySelector('#end_text span');
            end_score.innerHTML = this.score;
        }
    };

    this.startGame = function () {


        var self = this;
        this.setInterval = setInterval(function () {
            self.moveFurry();
            }, 250)
    }
}
var startGame = new Game();

startGame.showFurry();
startGame.showCoin();
startGame.startGame();

