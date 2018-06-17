import {SET_CURRENT_SONG, SET_PLAYLIST, PLAY_STATUS_UPDATE, CHANGE_SETTING} from "../actions/play"
const initialState = {
	currentSong: {
		artist: null,
		albumTitle: null,
		title: null,
		albumCover: null,
		index: null
	},
	changeSetting: undefined,
	playList: [],
	playStatus: {}
}

export const playReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_SONG:
			return {...state, currentSong: {...action.song}}
		case SET_PLAYLIST:
			return {...state, playList: [...action.songs]}
		case PLAY_STATUS_UPDATE:
			const newStatus = updateStatus(action.status)
			return {...state, playStatus: newStatus}
		case CHANGE_SETTING:
			const {optionName, optionValue} = action
			return {...state, changeSetting: {optionName, optionValue}}
		default:
			return state
	}
}

const updateStatus = status => ({
	playbackInstancePosition: status.positionMillis,
	playbackInstanceDuration: status.durationMillis,
	shouldPlay: status.shouldPlay,
	isBuffering: status.isBuffering,
	muted: status.isMuted,
	volume: status.volume,
	loopingType: status.isLooping ? 1 : 0
})
//   if (status.didJustFinish && !status.isLooping) {
//     this._advanceIndex(true);
//     this._updatePlaybackInstanceForIndex(true);
//   }
// } else {
//   if (status.error) {
//     console.log(`FATAL PLAYER ERROR: ${status.error}`);
//   }

export default playReducer
