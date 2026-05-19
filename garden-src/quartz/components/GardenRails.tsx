// @ts-ignore
import gardenRailsScript from "./scripts/gardenRails.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Renders nothing. The two toggle buttons are created by the inline
// script after Quartz's "nav" event fires so they live correctly on
// SPA re-navigation. Keeping the component invisible means it can be
// dropped anywhere in the layout without affecting flow.
const GardenRails: QuartzComponent = () => null

GardenRails.afterDOMLoaded = gardenRailsScript

export default (() => GardenRails) satisfies QuartzComponentConstructor
