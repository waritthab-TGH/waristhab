import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene'

// Solar System: deep-space black with sunlight accent. Dark mode only.
const { theme, problems } = makeColors({
  label: 'Solar System',
  only: 'dark',
  roles: { accent: '#ffcc66', danger: '#ff7a85', success: '#8fd6a8', warning: '#ffb36b', pro: '#9ab8ff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#03040a',
        'surface-1': '#070a16',
        'surface-2': '#0a1024',
        'surface-3': '#101833',
        'text-primary': '#eef1ff',
        'text-secondary': '#b7bfdc',
        'text-muted': '#8a93b8',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'solar-system', glass: { blur: 0, tint: '#03040a', opacity: 0.3 } },
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
    return <Svg source={SCENE} alt="Solar system with orbiting planets, the asteroid belt and the Kuiper belt" isInteractive />
  })
}
