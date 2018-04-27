import { normalizeResponseErrors } from './utils'

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	song
})
export const REQUESTING = 'REQUESTING'
export const requesting = () => ({
	type: REQUESTING
})
// export const authUser = user => dispatch => {
// 	dispatch(requesting())
// 	return fetch()
// }
