import { SET_CURRENT_SONG, REQUESTING } from '../actions/play'
const initialState = {
	loading: false,
	pause: false,
	error: null,
	artist: null,
	albumTitle: null,
	title: null,
	albumCover: null
}

export default function playReducer(state = initialState, action) {
	let newState
	if (action.type === SET_CURRENT_SONG) {
		return { ...state, ...action.song }
	}
	if (action.type === REQUESTING) {
		return { ...state, loading: true }
	}
	return state
}
