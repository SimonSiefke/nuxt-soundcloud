let Soundcloud

if (process.browser) {
  Soundcloud = require('soundcloud')
  Soundcloud.initialize({
    client_id: process.env.SOUNDCLOUD_CLIENT_ID
  })
}

export const state = () => ({
  tracks: [],
  trackNumber: -1,
  player: null
})

export const mutations = {
  setTracks(state, tracks) {
    state.tracks = tracks
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
  setTrackNumber(state, newTrackNumber) {
    state.trackNumber = newTrackNumber
  },
  setPlayer(state, player) {
    const trackNumber = state.trackNumber
    state.player = player

    state.player.on('pause', () => {
      state.tracks[trackNumber].playing = false
    })
    // state.player.on('finish', () => {
    //   state.tracks[trackNumber].playing = false
    // })
    state.player.on('play', () => {
      state.tracks[trackNumber].playing = true
    })
  },
  playTrack(state) {
    if (state.player) {
      state.player.play()
    }
  },
  pauseTrack(state) {
    if (state.player) {
      state.player.pause()
    }
  },
  removeTrack(state, trackIndex) {
    if (state.tracks.length === 1) {
      state.player = null
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
    // commit('setTrackNumber', 0)
    console.log(state.tracks.map(x => x.index))
    // console.log(newTracks.map(x => x.index))
  }
}

export const actions = {
  async updatePlayer({ state, commit }) {
    const trackIndex = state.trackNumber
    console.log('TRACKINDEX', trackIndex)
    try {
      const newPlayer = await Soundcloud.stream(
        `/tracks/${state.tracks[trackIndex].id}`
      )
      commit('setPlayer', newPlayer)
    } catch (error) {
      if (error.status === 404) {
        commit('removeTrack', trackIndex)
      }
      console.error(error)
    }
  },
  async play({ state, commit, dispatch }, track) {
    console.log('play', state.tracks)
    if (state.trackNumber < 0) {
      return
    }
    console.log('tracknumber', state.trackNumber)
    // TODO tidy up
    if (track) {
      if (track.index === state.trackNumber) {
        if (!state.player) {
          await dispatch('updatePlayer')
        }
        commit('playTrack')
        return
      } else {
        commit('setTrackNumber', track.index)
      }
    }
    await dispatch('updatePlayer')
    commit('playTrack')
  },
  pause({ state, commit }) {
    if (state.player) {
      commit('pauseTrack')
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
  },
  playNext({ commit, dispatch }) {
    dispatch('pause')
    commit('incrementTrackNumber')
    dispatch('play')
  },
  playPrevious({ state, commit, dispatch }) {
    dispatch('pause')
    commit('decrementTrackNumber')
    dispatch('play')
  }
}

export const getters = {
  track(state) {
    if (state.trackNumber >= 0) {
      return state.tracks[state.trackNumber]
    }
    return null
  }
}
