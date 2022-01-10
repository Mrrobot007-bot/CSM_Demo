import {path} from 'ramda';
import React, {useState} from 'react';
import {Image, ViewStyle} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootStateOrAny, useSelector} from 'react-redux';
import {View, TouchableOpacity, StatusBar} from 'react-native';

import {Icon} from '../../components/icon';
import {ProgressBar} from '../progress-bar';
import {Header} from '../../components/header';
import {color, spacingPresets} from '../../theme';
import {BoostScreenStyles as styles} from './styles';
import {FastImageModified} from '../fast-image-modified';
import {DrawerContent} from '../../screens/drawer-content';
import {Text, TextPresetStyles} from '../../components/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {IconTypes, ICON_TYPES} from '../../components/icon/constants';
import {InAppTrackerDialog} from '../../screens/in-app-tracker-dialog';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  getPrimaryColor,
  images,
  isAndroid,
} from '../../utility';

/**
 * An enum for defining multiple types of header in the app
 */
export enum HeaderTypes {
  NONE = 'none',
  LONG_MENU = 'long_menu_header',
  LONG_BACK = 'long_back_header',
  NORMAL_BACK = 'normal_back_header',
  NORMAL_MENU = 'normal_menu_header',
  NORMAL_CROSS = 'normal_cross_header',
}

/**
 * An enum for defining the right side icon type in header
 */
export enum HeaderRightComponentType {
  LOGO_ONLY = 'logo_only',
  ICON_TEXT = 'icon_text',
}

/**
 * An Interface for possible props for the wrapper component
 */
interface IBoostrScreenProps {
  /**
   * Used to render the required component inside the wrapper component
   */
  children: React.ReactNode;

  /**
   * An optional prop used to provide custom height to header
   * if required
   */
  customHeaderHeight?: number;

  /**
   * An optional prop used to provide custom style to title if required
   */
  customTitleViewStyle?: ViewStyle;

  /**
   * An optional prop used to provide border radius to header if required
   */
  headerBorderRadius?: number;

  /**
   * An optional prop used to provide any image at bottom of header if required
   */
  headerBottomImage?: React.ReactNode;

  /**
   * An optional prop used to provide that header is transparent or not
   */
  headerTransparent?: boolean;

  /**
   * headerType prop is used to tell the component that what kind
   * of header we required in the screen,
   */
  headerType: HeaderTypes;

  /**
   * headerRightComponentType prop is used to tell the
   * component that what is the type of right side header component, its an optional prop
   */
  headerRightComponentType?: HeaderRightComponentType;

  /**
   * An optional prop used to hide the progress loader in
   * any specific case
   */
  hideLoader?: boolean;

  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * An optional prop used to define the action on header left component click
   */
  onLeftComponentClick?: () => void;

  /**
   * An optional prop used to define the action on header right component click
   */
  onRightComponentClick?: () => void;

  /**
   * An optional prop used to show the text in right component in header
   */
  rightComponentText?: string;

  /**
   * An optional prop used to show the image in right component in header
   */
  rightComponentIcon?: IconTypes;

  /**
   * An optional prop used to provide any custom style to
   * component if required
   */
  style?: ViewStyle;

  /**
   * Title prop used to show the header text inside the header component
   */
  title?: string;
}

/**
 * The main wrapper of most of the screens inside app with default Header
 */
export const BoostrScreen = (props: IBoostrScreenProps) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [headerHeight] = useState(useHeaderHeight());
  const [tabHeight] = useState(
    userReducer.user &&
      userReducer.user.sessionId &&
      userReducer.user.onboarding
      ? useBottomTabBarHeight()
      : 0,
  );
  const [safeAreaBottom] = useState(useSafeAreaInsets().bottom);

  const extraHeight = DEVICE_WIDTH * 0.226 * 0.27 + spacingPresets.mediumPlus;
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  const trackerReducer = useSelector(
    (state: RootStateOrAny) => state.trackerReducer,
  );

  /**
   * Returning the left component of header bar according to selected header type
   */
  const getLeftButton = (selectedHeaderType: HeaderTypes) => {
    switch (selectedHeaderType) {
      case HeaderTypes.LONG_MENU:
        return (
          <TouchableOpacity
            onPress={() =>
              props.onLeftComponentClick
                ? props.onLeftComponentClick()
                : setIsDrawerVisible(true)
            }>
            <Icon
              icon={ICON_TYPES.MENU}
              style={styles.leftIconContainerStyle}
            />
          </TouchableOpacity>
        );

      case HeaderTypes.LONG_BACK:
        return (
          <TouchableOpacity
            onPress={() =>
              props.onLeftComponentClick
                ? props.onLeftComponentClick()
                : props.navigation.goBack(null)
            }>
            <Icon
              icon={ICON_TYPES.BACK}
              style={styles.leftIconContainerStyle}
            />
          </TouchableOpacity>
        );

      case HeaderTypes.NORMAL_BACK:
        return (
          <TouchableOpacity
            onPress={() =>
              props.onLeftComponentClick
                ? props.onLeftComponentClick()
                : props.navigation.goBack(null)
            }>
            <Icon
              icon={ICON_TYPES.BACK}
              style={styles.leftIconContainerStyle}
            />
          </TouchableOpacity>
        );

      case HeaderTypes.NORMAL_MENU:
        return (
          <TouchableOpacity
            onPress={() =>
              props.onLeftComponentClick
                ? props.onLeftComponentClick()
                : setIsDrawerVisible(true)
            }>
            <Icon
              icon={ICON_TYPES.MENU}
              style={styles.leftIconContainerStyle}
            />
          </TouchableOpacity>
        );

      case HeaderTypes.NORMAL_CROSS:
        return (
          <TouchableOpacity
            onPress={() =>
              props.onLeftComponentClick
                ? props.onLeftComponentClick()
                : props.navigation.goBack(null)
            }>
            <Icon
              icon={ICON_TYPES.CROSS}
              style={{
                ...styles.leftIconContainerStyle,
                tintColor: getPrimaryColor(),
              }}
            />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        headerTransparent: props.headerTransparent,
        header: () =>
          props.headerType === HeaderTypes.NONE ? null : (
            <Header
              headerTransparent={props.headerTransparent}
              extraHeight={
                props.headerType === HeaderTypes.LONG_MENU ||
                props.headerType === HeaderTypes.LONG_BACK
                  ? extraHeight
                  : 0
              }
              isLargeHeader={
                props.headerType === HeaderTypes.LONG_MENU ||
                props.headerType === HeaderTypes.LONG_BACK
              }
              height={
                props.customHeaderHeight ||
                headerHeight +
                  (props.headerType === HeaderTypes.LONG_MENU ||
                  props.headerType === HeaderTypes.LONG_BACK
                    ? extraHeight
                    : 0)
              }
              leftComponent={getLeftButton(props.headerType)}
              title={props.title}
              titleStyle={
                props.headerType === HeaderTypes.NORMAL_CROSS && {
                  color: color.palette.black,
                }
              }
              hideBackImage={props.headerType === HeaderTypes.NORMAL_CROSS}
              rightComponent={
                props.headerRightComponentType ===
                HeaderRightComponentType.LOGO_ONLY ? (
                  <FastImageModified
                    url={path(
                      ['user', 'organisationId', 0, 'appLogo'],
                      userReducer,
                    )}
                    style={styles.headerRightContainerStyle}
                    defaultImage={null}
                  />
                ) : props.headerRightComponentType ===
                  HeaderRightComponentType.ICON_TEXT ? (
                  <TouchableOpacity
                    style={styles.rightIconContainerStyle}
                    onPress={props.onRightComponentClick}>
                    <Icon
                      icon={props.rightComponentIcon}
                      style={styles.rightComponentIconStyle}
                    />
                    <Text
                      preset={TextPresetStyles.FOOT_NOTE_BOLD_STATIC}
                      style={{color: color.textSecondary}}
                      text={props.rightComponentText}
                    />
                  </TouchableOpacity>
                ) : null
              }
              customTitle={
                props.headerType === HeaderTypes.LONG_MENU ? (
                  <Image
                    source={images.appLogo}
                    style={styles.headerLogoStyle}
                  />
                ) : props.headerType === HeaderTypes.LONG_BACK &&
                  props.headerBottomImage ? (
                  props.headerBottomImage
                ) : null
              }
              customTitleViewStyle={props.customTitleViewStyle}
            />
          ),
      },
      [props.navigation],
    );
  });

  return (
    <View style={[styles.mainContainerStyle, props.style]}>
      <StatusBar
        backgroundColor={
          isDrawerVisible ? color.palette.lightYellow : getPrimaryColor()
        }
      />
      {props.children}
      <View style={styles.drawerContainerStyle}>
        <DrawerContent
          isVisible={isDrawerVisible}
          onHideDialog={() => setIsDrawerVisible(false)}
          navigation={props.navigation}
        />
      </View>

      {trackerReducer.trackerVisible && (
        <View
          style={[
            styles.trackerContainerStyle,
            {
              height:
                DEVICE_HEIGHT -
                headerHeight -
                tabHeight -
                safeAreaBottom -
                (isAndroid ? headerHeight : 0),
            },
          ]}>
          <InAppTrackerDialog navigation={props.navigation} />
        </View>
      )}
      {/* <ModalLoader showLoaderModal={apiReducer.loading } /> */}
      {apiReducer.loading && !props.hideLoader && <ProgressBar />}

      {/* {apiReducer.loading && !props.hideLoader && (
        <ModalLoader
          // isLongHeader={
          //   props.headerType === HeaderTypes.LONG_MENU ||
          //   props.headerType === HeaderTypes.LONG_BACK
          // }
        />
      )} */}
    </View>
  );
};
