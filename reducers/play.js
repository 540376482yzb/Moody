import {SET_CURRENT_SONG, SET_PLAYLIST} from "../actions/play"
import produce from "immer"
const initialState = {
	artist: null,
	albumTitle: null,
	title: null,
	albumCover: null,
	playList: []
}

export const playReducer = (state = initialState, action) =>
	produce(state, draft => {
		if (action.type === SET_CURRENT_SONG) {
			return {...state, ...action.song}
		}
		if (action.type === SET_PLAY_LIST) {
			return {...state, playList: action.songs}
		}
		return state
	})
