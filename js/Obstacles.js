class Obstacles {
    constructor() {
        this.obstacleTypes = [
            'tree',
            'treeCluster',
            'rock1',
            'rock2'
        ];
        this.obstacles = [];
    }

    drawObstacles(ctx, player) {
        var newObstacles = [];

        _.each(this.obstacles, (obstacle) => {
            var obstacleImage = AssetManager.getInstance().getImage(obstacle.type);
            var x = obstacle.x - player.skierMapX - obstacleImage.width / 2;
            var y = obstacle.y - player.skierMapY - obstacleImage.height / 2;

            if(x < -100 || x > GAME_WIDTH + 50 || y < -100 || y > GAME_HEIGHT + 50) {
                return;
            }

            ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

            newObstacles.push(obstacle);
        });

        this.obstacles = newObstacles;
    };

    placeInitialObstacles() {
        var numberObstacles = Math.ceil(_.random(5, 7) * (GAME_WIDTH / 800) * (GAME_HEIGHT / 500));

        var minX = -50;
        var maxX = GAME_WIDTH + 50;
        var minY = GAME_HEIGHT / 2 + 100;
        var maxY = GAME_HEIGHT + 50;

        for(var i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles = _.sortBy(this.obstacles, function(obstacle) {
            var obstacleImage = AssetManager.getInstance().getImage(obstacle.type);
            return obstacle.y + obstacleImage.height;
        });
    };

    placeNewObstacle(direction, player, obs, GAME_WIDTH, GAME_HEIGHT) {
        var shouldPlaceObstacle = _.random(1, 8);
        if(shouldPlaceObstacle !== 8) {
            return;
        }

        var leftEdge = player.skierMapX;
        var rightEdge = player.skierMapX + GAME_WIDTH;
        var topEdge = player.skierMapY;
        var bottomEdge = player.skierMapY + GAME_HEIGHT;

        switch(direction) {
            case 1: // left
            obs.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                break;
            case 2: // left down
            obs.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
            obs.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 3: // down
            obs.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 4: // right down
            obs.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
            obs.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 5: // right
            obs.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                break;
            case 6: // up
            obs.placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
                break;
        }
    };

    placeRandomObstacle(minX, maxX, minY, maxY) {
        var obstacleIndex = _.random(0, this.obstacleTypes.length - 1);

        var position = this.calculateOpenPosition(minX, maxX, minY, maxY);

        this.obstacles.push({
            type : this.obstacleTypes[obstacleIndex],
            x : position.x,
            y : position.y
        })
    };

    calculateOpenPosition(minX, maxX, minY, maxY) {
        var x = _.random(minX, maxX);
        var y = _.random(minY, maxY);

        var foundCollision = _.find(this.obstacles, function(obstacle) {
            return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
        });

        if(foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            }
        }
    };
}