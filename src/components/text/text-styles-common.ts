import {color} from '../../theme';
import {TextPresetStyles, TextFontWeightTypes} from './constants';
import {DEVICE_HEIGHT, isAndroid} from '../../utility';

const darkHelveticaTextDefaultStyle = {
  fontFamily: 'Helvetica',
  color: color.textDark,
  fontStyle: 'normal',
};

/**
 * Raw text styles. These are typically imported from Figma.
 */
export const RawAppTextStyles = {
  //Caption 1
  [TextPresetStyles.CAPTION_1]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  //Caption 5
  [TextPresetStyles.CAPTION_5]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.BOLD,
  },
  // caption 6
  [TextPresetStyles.CAPTION_6]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.BOLD,
  },
  // caption 7
  [TextPresetStyles.CAPTION_7]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  // Caption 2
  [TextPresetStyles.CAPTION_2]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  // caption 3  need to add different font-family
  [TextPresetStyles.CAPTION_3]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  // Caption 4
  [TextPresetStyles.CAPTION_4]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  //Foot Note
  [TextPresetStyles.FOOT_NOTE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  // Foot Note bold
  [TextPresetStyles.FOOT_NOTE_BOLD]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  // Foot Note bold
  [TextPresetStyles.FOOT_NOTE_BOLD_STATIC]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 13,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  // Foot Note bold
  [TextPresetStyles.FOOT_NOTE_ULTRA_BOLD]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },

  //Foot Note
  [TextPresetStyles.FOOT_NOTE_HEAVY]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 22,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Button 1
  [TextPresetStyles.BUTTON_1]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    lineHeight: 24,
    color: color.buttonText,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Button 2
  [TextPresetStyles.BUTTON_2]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 14,
    color: color.buttonText,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Button 3
  [TextPresetStyles.BUTTON_3]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 10,
    lineHeight: 12,
    color: color.buttonText,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Headline
  [TextPresetStyles.HEADLINE_DARK]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 17,
    lineHeight: isAndroid ? 17 : 22,
    fontWeight: TextFontWeightTypes.BOLD,
  },
  // Title
  [TextPresetStyles.TITLE]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },
    // Title
    [TextPresetStyles.TITLE_BOLD]: {
      ...darkHelveticaTextDefaultStyle,
      fontSize: 17,
      lineHeight: 22,
      fontWeight: TextFontWeightTypes.BOLD,
    },
  

  //TITLE Circular
  [TextPresetStyles.TITLE_CIRCULAR]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },
  [TextPresetStyles.TITLE_CIRCULAR_BOLD]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.BOLD,
  },
  

  //SUB Headline
  [TextPresetStyles.SUB_HEADLINE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Body Regular
  [TextPresetStyles.BODY_REGULAR]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  //Large Title
  [TextPresetStyles.LARGE_TITLE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 35,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Medium Title
  [TextPresetStyles.MEDIUM_TITLE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Small Title
  [TextPresetStyles.SMALL_TITLE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: TextFontWeightTypes.REGULAR,
  },
  //Small Title Ultra bold
  [TextPresetStyles.SMALL_TITLE_BOLD]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },
  // Text input
  [TextPresetStyles.TEXT_INPUT]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    padding: 0,
    fontWeight: TextFontWeightTypes.REGULAR,
    color: color.textInputText,
    flex: 1,
    paddingVertical: 4.5,
  },

  [TextPresetStyles.TEXT_INPUT_DISABLED]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    fontWeight: TextFontWeightTypes.REGULAR,
    flex: 1,
    color: color.textInputDisabledText,
    paddingVertical: 4.5,
  },

  //error text
  [TextPresetStyles.TEXT_ERROR]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 12,
    lineHeight: 12,
    color: color.alertError,
    marginTop: DEVICE_HEIGHT * 0.006,
  },

  //Text Label
  [TextPresetStyles.TEXT_LABEL]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 13,
    lineHeight: 18,
    color: color.textInputLabel,
    marginBottom: DEVICE_HEIGHT * 0.006,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Badge 1
  [TextPresetStyles.BADGE_1]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    lineHeight: 20,
    color: color.buttonText,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //Badge 2
  [TextPresetStyles.BADGE_2]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 10,
    lineHeight: 14,
    color: color.buttonText,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //DESCRIPTION
  [TextPresetStyles.DESCRIPTION]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.REGULAR,
  },  

  // DESCRIPTION SARABUN
  [TextPresetStyles.DESCRIPTION_SARA]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'Sarabun-Regular',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.REGULAR,
  },


  //DESCRIPTION_MINI
  [TextPresetStyles.DESCRIPTION_SMALL]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.REGULAR,
  },
  //DESCRIPTION_LARGE
  [TextPresetStyles.DESCRIPTION_LARGE]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: TextFontWeightTypes.REGULAR,
  }, 

   
  //SubHeadline1 helvetical Text 1
  [TextPresetStyles.SUB_HEADLINE1_HEV]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: TextFontWeightTypes.BOLD,
  },

  //SubHeadline1
  [TextPresetStyles.SUB_HEADLINE1]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    letterSpacing: -0.32,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  //SubHeadline2
  [TextPresetStyles.SUB_HEADLINE2]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },

  // mini font
  [TextPresetStyles.MINI_FONT]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 9,
    lineHeight: 14,
    fontWeight: TextFontWeightTypes.BOLD,
  }, 
  // mini font sara
  [TextPresetStyles.MINI_FONT_SARA]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'Sarabun-Regular',
    fontSize: 9,
    lineHeight: 14,
    fontWeight: TextFontWeightTypes.SEMI_BOLD,
  },
  // mini font Light
  [TextPresetStyles.MINI_FONT_REGULAR]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 9,
    lineHeight: 14,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  // mini font
  [TextPresetStyles.TITLE_HUGE]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    letterSpacing: -0.32,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },

  // mini font
  [TextPresetStyles.TITLE_MEDIUM]: {
    ...darkHelveticaTextDefaultStyle,
    fontFamily: 'CircularXX-BlackItalic',
    letterSpacing: -0.32,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },

  //SUB Headline basic
  [TextPresetStyles.SUB_HEADLINE_REGULAR]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: TextFontWeightTypes.REGULAR,
  },

  // Count View
  [TextPresetStyles.MINI_COUNT]: {
    ...darkHelveticaTextDefaultStyle,
    fontSize: 7,
    lineHeight: 12,
    fontWeight: TextFontWeightTypes.BOLD,
  },
};
