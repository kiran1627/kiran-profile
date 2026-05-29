'use client';

import { useCallback, useMemo } from 'react';

/**
 * Expression presets mapped to ARKit blend shape morph targets.
 * Each expression defines target values for relevant morph targets.
 * All values are 0-1 range.
 */
const EXPRESSIONS = {
  idle: {
    // Neutral - all zeroed out (natural resting face)
    mouthSmileLeft: 0.05,
    mouthSmileRight: 0.05,
  },

  greeting: {
    mouthSmileLeft: 0.6,
    mouthSmileRight: 0.6,
    cheekSquintLeft: 0.3,
    cheekSquintRight: 0.3,
    browInnerUp: 0.4,
    eyeSquintLeft: 0.2,
    eyeSquintRight: 0.2,
  },

  thinking: {
    browInnerUp: 0.5,
    browOuterUpLeft: 0.3,
    eyeSquintLeft: 0.15,
    eyeSquintRight: 0.15,
    mouthLeft: 0.2,
    mouthPucker: 0.15,
    eyeLookUpLeft: 0.3,
    eyeLookUpRight: 0.3,
  },

  happy: {
    mouthSmileLeft: 0.8,
    mouthSmileRight: 0.8,
    cheekSquintLeft: 0.5,
    cheekSquintRight: 0.5,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.4,
    browInnerUp: 0.2,
    noseSneerLeft: 0.1,
    noseSneerRight: 0.1,
  },

  listening: {
    browInnerUp: 0.3,
    browOuterUpLeft: 0.15,
    browOuterUpRight: 0.15,
    mouthSmileLeft: 0.15,
    mouthSmileRight: 0.15,
    eyeWideLeft: 0.1,
    eyeWideRight: 0.1,
  },

  talking: {
    mouthSmileLeft: 0.2,
    mouthSmileRight: 0.2,
    browInnerUp: 0.15,
    cheekSquintLeft: 0.1,
    cheekSquintRight: 0.1,
    // Mouth shapes are driven by lip sync system, not here
  },
};

// All possible morph target names used across expressions
const ALL_MORPH_NAMES = [
  'mouthSmileLeft', 'mouthSmileRight',
  'cheekSquintLeft', 'cheekSquintRight',
  'browInnerUp', 'browOuterUpLeft', 'browOuterUpRight',
  'eyeSquintLeft', 'eyeSquintRight',
  'eyeWideLeft', 'eyeWideRight',
  'eyeLookUpLeft', 'eyeLookUpRight',
  'mouthLeft', 'mouthPucker',
  'noseSneerLeft', 'noseSneerRight',
  'mouthOpen', 'jawOpen',
  'eyeBlinkLeft', 'eyeBlinkRight',
];

export function useAvatarExpressions() {
  /**
   * Get the morph target values for a given expression.
   * Returns a complete map with 0 for any unused targets,
   * so the lerp system can smoothly transition everything.
   */
  const getExpressionTargets = useCallback((expressionName) => {
    const expr = EXPRESSIONS[expressionName] || EXPRESSIONS.idle;
    const targets = {};

    for (const morphName of ALL_MORPH_NAMES) {
      // Don't override blink targets (handled by blink system)
      if (morphName === 'eyeBlinkLeft' || morphName === 'eyeBlinkRight') continue;
      // Don't override mouth targets during talking (handled by lip sync)
      if (expressionName === 'talking' && (morphName === 'mouthOpen' || morphName === 'jawOpen')) continue;

      targets[morphName] = expr[morphName] || 0;
    }

    return targets;
  }, []);

  const expressionNames = useMemo(() => Object.keys(EXPRESSIONS), []);

  return { getExpressionTargets, expressionNames };
}
