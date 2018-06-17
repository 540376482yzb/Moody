import {SET_CURRENT_SONG, SET_PLAYLIST, SAVE_PROGRESS} from "../actions/play"
const initialState = {
	currentSong: {
		artist: null,
		albumTitle: null,
		title: null,
		albumCover: null,
		index: null
	},
	playList: [],
	soundObject: null
}

export const playReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_SONG:
			return {...state, currentSong: {...action.song}}
		case SET_PLAYLIST:
			return {...state, playList: [...action.songs]}
		case SAVE_PROGRESS:
			console.log("save progress", action.progress)
			return {...state, progress: action.progress}
		default:
			return state
	}
}

export default playReducer
