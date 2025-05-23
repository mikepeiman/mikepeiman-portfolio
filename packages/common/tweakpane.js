import { Pane } from 'tweakpane';

/**
 * Creates a Tweakpane instance with consistent styling
 * @param {string} title - Title for the pane
 * @param {HTMLElement} container - Container element to append the pane to
 * @returns {Pane} Tweakpane instance
 */
export function createPane(title, container = document.body) {
    const pane = new Pane({
        title,
        expanded: true,
        container
    });

    // Apply consistent styling
    pane.element.style.position = 'fixed';
    pane.element.style.top = '20px';
    pane.element.style.right = '20px';
    pane.element.style.zIndex = '1000';
    pane.element.style.fontFamily = 'Inter, sans-serif';

    return pane;
}

/**
 * Creates a folder in a pane with animation controls
 * @param {Pane} pane - Tweakpane instance
 * @param {string} title - Folder title
 * @param {boolean} expanded - Whether folder is expanded by default
 * @returns {Object} Folder instance
 */
export function createFolder(pane, title, expanded = false) {
    return pane.addFolder({
        title,
        expanded
    });
}

/**
 * Common animation parameter presets
 */
export const presets = {
    speed: { min: 0.1, max: 3.0, step: 0.1 },
    amplitude: { min: 0, max: 20, step: 0.5 },
    count: { min: 1, max: 50, step: 1 },
    size: { min: 0.5, max: 10, step: 0.1 },
    opacity: { min: 0, max: 1, step: 0.01 },
    angle: { min: 0, max: 360, step: 1 },
    frequency: { min: 0.1, max: 5.0, step: 0.1 }
};

/**
 * Creates a standard set of animation controls
 * @param {Object} folder - Tweakpane folder
 * @param {Object} params - Parameter object to bind to
 * @param {Array} controls - Array of control names to create
 */
export function addAnimationControls(folder, params, controls = ['speed', 'amplitude']) {
    controls.forEach(control => {
        if (presets[control] && params[control] !== undefined) {
            folder.addBinding(params, control, presets[control]);
        }
    });
}