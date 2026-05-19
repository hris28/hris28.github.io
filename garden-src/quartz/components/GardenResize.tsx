// @ts-ignore
import gardenResizeScript from "./scripts/gardenResize.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Renders nothing. The handle DOM is created by the inline script
// after Quartz's "nav" event fires, so it lives correctly on SPA
// re-navigations too. Keeping the component invisible means it can
// be dropped anywhere in the layout without affecting flow.
const GardenResize: QuartzComponent = () => null

GardenResize.afterDOMLoaded = gardenResizeScript

export default (() => GardenResize) satisfies QuartzComponentConstructor
