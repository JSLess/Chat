
export { renderTSX , render }

import { render as renderTSX } from 'Preact/Render'
import { VNode } from 'preact'


/**
 *  Wrapper for Preact's renderer to add missing attributes
 */

function render <P = {}> ( node : VNode<P> ){

    const html = renderTSX(node)

    return `<!DOCTYPE html>` + html
}
