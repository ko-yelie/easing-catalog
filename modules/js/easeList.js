export const EASE_LIST = {
  linear: {
    out: {
      css: 'linear',
      gsap: 'none',
    },
    in: {
      css: 'linear',
      gsap: 'none',
    },
    inOut: {
      css: 'linear',
      gsap: 'none',
    },
  },
  ease: {
    default: {
      css: 'ease',
      gsap: '.25,.1,.25,1',
    },
    out: {
      css: 'ease-out',
      gsap: '0,0,.58,1',
    },
    in: {
      css: 'ease-in',
      gsap: '.42,0,1,1',
    },
    inOut: {
      css: 'ease-in-out',
      gsap: '.42,0,.58,1',
    },
  },
  sine: {
    out: {
      css: 'cubic-bezier(0.61, 1, 0.88, 1)',
      gsap: 'sine.out',
    },
    in: {
      css: 'cubic-bezier(0.12, 0, 0.39, 0)',
      gsap: 'sine.in',
    },
    inOut: {
      css: 'cubic-bezier(0.37, 0, 0.63, 1)',
      gsap: 'sine.inOut',
    },
  },
  quad: {
    out: {
      css: 'cubic-bezier(0.5, 1, 0.89, 1)',
      gsap: 'quad.out',
    },
    in: {
      css: 'cubic-bezier(0.11, 0, 0.5, 0)',
      gsap: 'quad.in',
    },
    inOut: {
      css: 'cubic-bezier(0.45, 0, 0.55, 1)',
      gsap: 'quad.inOut',
    },
  },
  cubic: {
    out: {
      css: 'cubic-bezier(0.33, 1, 0.68, 1)',
      gsap: 'cubic.out',
    },
    in: {
      css: 'cubic-bezier(0.32, 0, 0.67, 0)',
      gsap: 'cubic.in',
    },
    inOut: {
      css: 'cubic-bezier(0.65, 0, 0.35, 1)',
      gsap: 'cubic.inOut',
    },
  },
  quart: {
    out: {
      css: 'cubic-bezier(0.25, 1, 0.5, 1)',
      gsap: 'quart.out',
    },
    in: {
      css: 'cubic-bezier(0.5, 0, 0.75, 0)',
      gsap: 'quart.in',
    },
    inOut: {
      css: 'cubic-bezier(0.76, 0, 0.24, 1)',
      gsap: 'quart.inOut',
    },
  },
  quint: {
    out: {
      css: 'cubic-bezier(0.22, 1, 0.36, 1)',
      gsap: 'quint.out',
    },
    in: {
      css: 'cubic-bezier(0.64, 0, 0.78, 0)',
      gsap: 'quint.in',
    },
    inOut: {
      css: 'cubic-bezier(0.83, 0, 0.17, 1)',
      gsap: 'quint.inOut',
    },
  },
  expo: {
    out: {
      css: 'cubic-bezier(0.16, 1, 0.3, 1)',
      gsap: 'expo.out',
    },
    in: {
      css: 'cubic-bezier(0.7, 0, 0.84, 0)',
      gsap: 'expo.in',
    },
    inOut: {
      css: 'cubic-bezier(0.87, 0, 0.13, 1)',
      gsap: 'expo.inOut',
    },
  },
  circ: {
    out: {
      css: 'cubic-bezier(0, 0.55, 0.45, 1)',
      gsap: 'circ.out',
    },
    in: {
      css: 'cubic-bezier(0.55, 0, 1, 0.45)',
      gsap: 'circ.in',
    },
    inOut: {
      css: 'cubic-bezier(0.85, 0, 0.15, 1)',
      gsap: 'circ.inOut',
    },
  },
  back: {
    out: {
      css: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      gsap: 'back.out',
    },
    in: {
      css: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      gsap: 'back.in',
    },
    inOut: {
      css: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      gsap: 'back.inOut',
    },
  },
  elastic: {
    out: {
      css: null,
      gsap: 'elastic.out',
    },
    in: {
      css: null,
      gsap: 'elastic.in',
    },
    inOut: {
      css: null,
      gsap: 'elastic.inOut',
    },
  },
  bounce: {
    out: {
      css: null,
      gsap: 'bounce.out',
    },
    in: {
      css: null,
      gsap: 'bounce.in',
    },
    inOut: {
      css: null,
      gsap: 'bounce.inOut',
    },
  },
}
EASE_LIST.power1 = EASE_LIST.quad
EASE_LIST.power2 = EASE_LIST.cubic
EASE_LIST.power3 = EASE_LIST.quart
EASE_LIST.power4 = EASE_LIST.quint

export const EASE_NAME_LIST = {
  custom: 'custom',
  linear: 'linear (none)',
  ease: 'ease',
  sine: 'sine',
  quad: 'quad (power1)',
  cubic: 'cubic (power2)',
  quart: 'quart (power3)',
  quint: 'quint (power4)',
  expo: 'expo',
  circ: 'circ',
  back: 'back',
  elastic: 'elastic',
  bounce: 'bounce',
}

export const EASE_TYPE_LIST = ['default', 'out', 'in', 'inOut']
