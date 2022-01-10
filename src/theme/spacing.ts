/**
 * NOTE TO DEVS:
 *
 * Spacing should consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 10 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   0. none: 0
 *   1. tiny: 4,
 *   2. smaller: 8
 *   3. small: 12,
 *   4. medium: 16,
 *   5. medium+ 24
 *   6. large: 32,
 *   7. huge: 48,
 *   8. massive: 64
 *   0. grand: 100
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 */

const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64, 100];

export const spacingPresets = {
  none: spacing[0],
  tiny: spacing[1],
  smaller: spacing[2],
  small: spacing[3],
  medium: spacing[4],
  mediumPlus: spacing[5],
  large: spacing[6],
  huge: spacing[7],
  massive: spacing[8],
  grand: spacing[9],
};
