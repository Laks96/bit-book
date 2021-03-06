import * as actionTypes from '../actions/actionTypes'
import Post from '../../entities/Post'
import { favouritePost } from '../actions/actionCreators/posts'

const initialState = {
    allPosts: [],
    favouritePosts: [],
    myPosts: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                allPosts: action.posts.map(post => new Post(post))
            }
        case actionTypes.FAVOURITE_POSTS:
            const updatedPosts = state.allPosts.map(post => {
                if (parseInt(action.postId) === parseInt(post.id)) {
                    return {
                        ...post,
                        fav: !post.fav
                    }
                }
                return post;
            })
            const favouritePosts = updatedPosts.filter(post => post.fav)
            localStorage.setItem('savedFavPosts', JSON.stringify(favouritePosts))
            return {
                ...state,
                allPosts: updatedPosts
            }

        case actionTypes.FETCH_MYPOSTS_SUCCESS:
            const myPosts = action.myPosts.map(post => new Post(post))
            return {
                ...state,
                myPosts
            }

        default:
            return state;
    }

}


export default reducer