import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene'

// Laniakea Night: deep-space blues, starlight text, gold flow-line accent.
const { theme, problems } = makeColors({
  label: 'Laniakea Night',
  only: 'dark',
  roles: { accent: '#f3c56b', danger: '#ff7a85', success: '#8fd6a8', warning: '#ffa86b', pro: '#78a9ff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#060914',
        'surface-1': '#0a1024',
        'surface-2': '#0c1330',
        'surface-3': '#111938',
        'text-primary': '#e9edff',
        'text-secondary': '#bcc3e3',
        'text-muted': '#8c95bd',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'laniakea', glass: { blur: 0, tint: '#060914', opacity: 0.3 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="Night sky with stars and Laniakea flow lines converging on the Great Attractor" isInteractive />
  })
}
