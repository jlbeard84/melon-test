/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.setMaxVelocity(3, 3);
        this.body.setFriction(0.4, 0.4);
        this.body.gravity.x = 0;
        this.body.gravity.y = 0;

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        this.alwaysUpdate = true;

        const walkSpeed = 250;

        this.renderable.addAnimation("walkDown", [0, 1], walkSpeed);
        this.renderable.addAnimation("walkLeft", [2, 3], walkSpeed);
        this.renderable.addAnimation("walkUp", [4, 5], walkSpeed);
        this.renderable.addAnimation("walkRight", [6, 7], walkSpeed);

        this.renderable.setCurrentAnimation("walkDown");
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if (me.input.isKeyPressed("left")) {
            this.body.force.x = -this.body.maxVel.x;

            if (!this.renderable.isCurrentAnimation("walkLeft")) {
                this.renderable.setCurrentAnimation("walkLeft");
            }
        } else if (me.input.isKeyPressed("right")) {
            this.body.force.x = this.body.maxVel.x;

            if (!this.renderable.isCurrentAnimation("walkRight")) {
                this.renderable.setCurrentAnimation("walkRight");
            }
        } else if (me.input.isKeyPressed("up")) {
            this.body.force.y = -this.body.maxVel.y;

            if (!this.renderable.isCurrentAnimation("walkUp")) {
                this.renderable.setCurrentAnimation("walkUp");
            }
        } else if (me.input.isKeyPressed("down")) {
            this.body.force.y = this.body.maxVel.y;

            if (!this.renderable.isCurrentAnimation("walkDown")) {
                this.renderable.setCurrentAnimation("walkDown");
            }
        } else {
            this.body.force.x = 0;
            this.body.force.y = 0;
        }


        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
