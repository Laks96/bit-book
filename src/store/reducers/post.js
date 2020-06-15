import * as actionTypes from '../actions/actionTypes'
import Post from '../../entities/Post'

const initialState = {
    allPosts: [],
    
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
            
            return {
                ...state,
                allPosts: updatedPosts
            }

        default:
            return state;
    }

}


export default reducer