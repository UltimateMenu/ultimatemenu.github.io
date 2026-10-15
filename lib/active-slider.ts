/**
 * Keyboard arbitration for the page sliders.
 * Showcase + gallery both react to ArrowLeft/ArrowRight — without this,
 * one keypress would advance BOTH. The slider the user last hovered,
 * focused, or tapped owns the keys; it defaults to the showcase.
 */
let active: string = "showcase"

export function setActiveSlider(id: string) {
  active = id
}

export function isActiveSlider(id: string) {
  return active === id
}
