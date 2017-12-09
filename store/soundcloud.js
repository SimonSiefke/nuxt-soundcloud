let Soundcloud
const clientID = 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt'

if (process.browser) {
  Soundcloud = require('soundcloud')
  Soundcloud.initialize({
    client_id: clientID
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
    if (newTrackNumber === state.trackNumber) {
      console.error('wrong')
    }
    state.trackNumber = newTrackNumber
  },
  setPlayer(state, player) {
    state.player = player
  },
  playTrack(state) {
    state.player.play()

    // disable playing state of other tracks
    state.tracks.forEach((track, index) => {
      if (track.playing && index !== state.trackNumber) {
        track.playing = false
      }
    })
    // enable playing state of current track
    state.tracks[state.trackNumber].playing = true
  },
  pauseTrack(state) {
    state.player.pause()
    state.tracks[state.trackNumber].playing = false
  }
}

export const actions = {
  async updatePlayer({ state, commit }) {
    try {
      const newPlayer = await Soundcloud.stream(
        `/tracks/${state.tracks[state.trackNumber].id}`
      )
      commit('setPlayer', newPlayer)
    } catch (error) {
      if (error.status === 404) {
        console.log(404)
      }
      console.error(error)
    }
  },
  async play({ state, commit, dispatch }, track) {
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
  pause({ commit }) {
    commit('pauseTrack')
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
    commit('incrementTrackNumber')
    dispatch('play')
  },
  playPrevious({ commit, dispatch }) {
    commit('decrementTrackNumber')
    dispatch('play')
  }
}

export const getters = {
  track(state) {
    return state.tracks[state.trackNumber]
  }
}
