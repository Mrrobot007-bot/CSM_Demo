import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const STANDARD_WIDTH = 375;
const STANDARD_HEIGHT = 667;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

export const dynamicSize = (size: any) => {
  return K * size;
};

export const getFontSize = (size: any) => {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
};

export const wpx = (horizPX: any) => {
  return widthPercentageToDP((horizPX / STANDARD_WIDTH) * 100);
};
export const hpx = (vertPX: any) => {
  return heightPercentageToDP((vertPX / STANDARD_HEIGHT) * 100);
};

export const wp = (percentage: any) => {
  return widthPercentageToDP(percentage);
};
export const hp = (percentage: any) => {
  return heightPercentageToDP(percentage);
};
