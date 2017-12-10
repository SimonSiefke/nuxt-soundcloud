let Soundcloud

if (process.browser) {
  Soundcloud = require('soundcloud')
  Soundcloud.initialize({
    client_id: process.env.SOUNDCLOUD_CLIENT_ID
  })
}

let players = []

export const state = () => ({
  track: null,
  tracks: [],
  trackNumber: -1
})

export const mutations = {
  setTracks(state, tracks) {
    state.tracks = tracks
  },
  setTrackNumber(state, newTrackNumber) {
    if (newTrackNumber !== state.trackNumber) {
      state.trackNumber = newTrackNumber
    } else {
      console.log('should not happen')
    }
  },
  incrementTrackNumber(state) {
    if (state.trackNumber === state.tracks.length - 1) {
      state.trackNumber = 0
    } else {
      state.trackNumber++
    }
  },
  decrementTrackNumber(state) {
    if (state.trackNumber === 0) {
      state.trackNumber = state.tracks.length - 1
    } else {
      state.trackNumber--
    }
  },
  setPlayer(state, newPlayer) {
    players[state.trackNumber] = newPlayer
  },
  playTrack(state) {
    if (players[state.trackNumber] && !players[state.trackNumber].isPlaying()) {
      players[state.trackNumber].play()
      state.tracks[state.trackNumber].playing = true
    }
  },
  setPlayingStatus(state, payload) {
    state.tracks[payload.trackNumber].playing = payload.newStatus
  },
  pauseTrack(state) {
    if (players[state.trackNumber] && players[state.trackNumber].isPlaying()) {
      players[state.trackNumber].pause()
    }
  },
  removeTrack(state, trackIndex) {
    if (state.tracks.length === 1) {
      players[state.trackNumber] = null
      state.trackNumber = -1
      state.tracks = []
    }
    state.tracks.splice(trackIndex, 1)
    for (let i = trackIndex; i < state.tracks.length; i++) {
      state.tracks[i].index--
    }
    if (state.trackNumber === trackIndex) {
      state.trackNumber = 0
    }
  }
}

export const actions = {
  initialize({ state, dispatch }) {
    document.body.onkeyup = event => {
      switch (event.keyCode) {
        case 32: // space
          if (state.tracks[state.trackNumber].playing) {
            dispatch('pause')
          } else {
            dispatch('playCurrentTrack')
          }
          break
        case 37: // left arrow
          dispatch('playPreviousTrack')
          break
        case 39: // right arrow
          dispatch('playNextTrack')
      }
    }
  },
  async playCurrentTrack({ commit, dispatch }) {
    await dispatch('updatePlayer')
    commit('playTrack')
  },
  playNextTrack({ commit, dispatch }) {
    dispatch('pause')
    commit('incrementTrackNumber')
    dispatch('playCurrentTrack')
  },
  playPreviousTrack({ state, commit, dispatch }) {
    dispatch('pause')
    commit('decrementTrackNumber')
    dispatch('playCurrentTrack')
  },
  togglePlay({ state, dispatch }) {
    if (state.tracks[state.trackNumber].playing) {
      dispatch('pause')
    } else {
      dispatch('playCurrentTrack')
    }
  },
  // async playTrack({ state, commit, dispatch }, track) {
  //   if (track.index !== state.trackNumber) {
  //     commit('setTrackNumber', track.index)
  //   }
  //   dispatch('playCurrentTrack')
  // },
  pause({ state, commit }) {
    commit('pauseTrack')
  },
  async updatePlayer({ state, dispatch, commit }) {
    console.log('updatePlayer')
    if (!players[state.trackNumber]) {
      try {
        const newPlayer = await Soundcloud.stream(
          `/tracks/${state.tracks[state.trackNumber].id}`
        )
        commit('setPlayer', newPlayer)
        players[state.trackNumber].on('state-change', newState => {
          switch (newState) {
            case 'playing':
              if (!state.tracks[state.trackNumber].playing) {
                commit('setPlayingStatus', {
                  trackNumber: state.trackNumber,
                  newStatus: true
                })
              }
              break
            case 'paused':
              if (state.tracks[state.trackNumber].playing) {
                commit('setPlayingStatus', {
                  trackNumber: state.trackNumber,
                  newStatus: false
                })
              }
              break
            case 'ended':
              dispatch('playNextTrack')
          }
        })
      } catch (error) {
        if (error.status === 404) {
          commit('removeTrack', state.trackNumber)
        }
        console.error(error)
      }
    }
  },
  async getTracks({ commit }, options) {
    const rawData = await Soundcloud.get('/tracks', options)

    const newTracks = rawData.map((track, index) => ({
      id: track.id,
      cover: track.artwork_url
        ? track.artwork_url.replace('large', 'crop')
        : '',
      name: track.title,
      duration: track.duration,
      love: track.likes_count,
      link: track.permalink_url,
      genre: track.genre,
      userAvatar: track.user.avatar_url,
      userLink: track.user.permalink_url,
      userName: track.user.username,
      playing: false,
      index
    }))
    commit('setTracks', newTracks)
    commit('setTrackNumber', 0)
  }
}

export const getters = {
  track(state) {
    if (state.tracks.length > 0) {
      return state.tracks[state.trackNumber]
    }
    return null
  }
}
