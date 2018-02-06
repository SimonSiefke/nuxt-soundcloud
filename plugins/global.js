import Vue from 'vue'
import Placeholder from '~/components/Placeholder.vue'
import WithPlaceholder from '~/components/WithPlaceholder.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

Vue.component('placeholder', Placeholder)

Vue.component('with-placeholder', WithPlaceholder)

Vue.component('pulse-loader', PulseLoader)
