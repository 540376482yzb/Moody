import {normalizeResponseErrors} from "./utils"

export const SET_CURRENT_SONG = "SET_CURRENT_SONG"
export const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	song
})
export const SET_PLAYLIST = "SET_PLAYLIST"
export const setPlayList = songs => ({
	type: SET_PLAYLIST,
	songs
})

export const PLAY_STATUS_UPDATE = "PLAY_STATUS_UPDATE"
export const playStatusUpdate = status => ({
	type: PLAY_STATUS_UPDATE,
	status
})
export const CHANGE_SETTING = "CHANGE_SETTING"
export const changeSetting = (optionName, optionValue) => ({
	type: CHANGE_SETTING,
	optionName,
	optionValue
})
