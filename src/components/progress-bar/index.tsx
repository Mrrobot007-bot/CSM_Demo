import React, {FC, ReactElement} from 'react';
import {ViewStyle, View} from 'react-native';
import {ProgressBarStyle as styles} from './styles';
import posed from 'react-native-pose';
import LottieView from 'lottie-react-native';
import {loaderJson} from '../../utility';

/**
 * An enum used to provide the progress bar type
 */
export enum ProgressBarType {
  FULL_SCREEN = 'fullScreen',
  COMPONENT_SPECIFIC = 'componentSpecific',
}

/**
 * A wrapper of loading view
 */
const LoadingSpinnerWrapper = posed.View({
  connecting: {opacity: 1, delay: 150, transition: {duration: 700}},
});

/**
 * An Interface for possible props for the Progress Bar / Loader component
 */
interface ProgressBarProps {
  isLongHeader?: boolean;
  pose?: string;
  progressBarType?: ProgressBarType;
  style?: ViewStyle;
  shouldAllowTouches?: boolean;
}

/**
 * A component to display loading progress required in app
 */
export const ProgressBar: FC<ProgressBarProps> = (
  props: ProgressBarProps,
): ReactElement => {
  const barContainerStyle = [
    props.progressBarType === ProgressBarType.COMPONENT_SPECIFIC
      ? styles.csProgressBarContainer
      : styles.progressBarContainer,
    props.style,
  ];

  return (
    <View style={barContainerStyle}>
      <View
        style={
          props.shouldAllowTouches
            ? props.progressBarType === ProgressBarType.COMPONENT_SPECIFIC
              ? styles.csLoaderUnBlockStyle
              : styles.loaderUnBlockStyle
            : props.progressBarType === ProgressBarType.COMPONENT_SPECIFIC
            ? styles.csLoaderBlockStyle
            : styles.loaderBlockStyle
        }>
        <LoadingSpinnerWrapper
          pose={props.pose || 'connecting'}
          style={[
            props.progressBarType === ProgressBarType.COMPONENT_SPECIFIC
              ? styles.csDefaultStyle
              : styles.defaultStyle,
            props.style,
          ]}>
          <LottieView source={loaderJson} autoPlay loop resizeMode={'cover'} />
        </LoadingSpinnerWrapper>
      </View>
    </View>
  );
};
