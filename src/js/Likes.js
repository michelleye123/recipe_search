export default class Likes {
    constructor() {
        this.likes = [];
    }

    toggleLike(recipe) {
        if (this.isLiked(recipe.id)) {
            this._deleteLike(recipe.id);
        } else {
            return this._addLike(recipe.id, recipe.title, recipe.author, recipe.img);
        }
    }

    isLiked(id) {
        return this.likes.findIndex(e => e.id === id) !== -1;
    }

    _addLike(id, title, author, image_url) {
        const like = {
            id,
            title,
            author,
            image_url
        }
        this.likes.push(like);
        return like;
    }

    _deleteLike(id) {
        const i = this.likes.findIndex(e => e.id === id);
        this.likes.splice(i, 1);
    }

    getNumLikes() {
        return this.likes.length;
    }

}
