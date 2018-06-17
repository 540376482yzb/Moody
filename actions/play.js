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
export const SAVE_PROGRESS = "SAVE_PROGRESS"
export const saveProgress = progress => ({
	type: SAVE_PROGRESS,
	progress
})
