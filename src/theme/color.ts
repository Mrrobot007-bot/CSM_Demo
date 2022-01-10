import { palette } from './palette';

export const hexToRgbA = (hex: string, opacity: number) => {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    const data = [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
    return `'rgba(${data},${opacity})'`;
  }
  throw new Error('Bad Hex');
};

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,

  primary: palette.blue,
  primary_10: hexToRgbA(palette.blue, 0.1),
  primary_15: hexToRgbA(palette.blue, 0.15),
  primary_20: hexToRgbA(palette.blue, 0.2),
  primary_30: hexToRgbA(palette.blue, 0.3),
  primary_60: hexToRgbA(palette.blue, 0.6),

  backgroundPrimary: palette.blue,
  backgroundSecondary: palette.lightYellow_50,

  buttonBackgroundPrimary: palette.blue,
  buttonBackgroundSecondary: palette.darkGrey,
  buttonBackgroundDisabled: palette.grey6,
  badgeBackgroundDisabled: palette.grey6,
  buttonText: palette.lightYellow,
  buttonTextDisabled: palette.grey5,
  badgeTextDisabled: palette.grey5,

  textPrimary: palette.blue,
  textSecondary: palette.lightYellow,
  textDark: palette.grey2,
  textLight: palette.white,
  textInputPlaceHolderText: palette.grey9,
  textInputLabel: palette.grey9,
  textInputText: palette.grey2,
  textInputDisabledText: palette.grey5,
  textInputBackground: palette.white,

  alertWarning: palette.darkYellow,
  alertError: palette.darkRed,
  alertSuccess: palette.darkGreen,
  alertInfo: palette.darkBlue,
  overlayWhite: palette.white_40,
  overlayBlack: palette.black_40,
  overlayLightBlack: palette.black_10,
};
