
export { renderTSX , render }

import { render as renderTSX } from 'Preact/Render'

/**
 *  Wrapper for Preact's renderer to add missing attributes
 */

function render ( ... args : Parameters<typeof renderTSX> ){

    const html = renderTSX( ... args )

    return `<!DOCTYPE html>` + html
}
