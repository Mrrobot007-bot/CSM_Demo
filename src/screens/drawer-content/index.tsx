import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {RootStateOrAny, useSelector} from 'react-redux';
import {ImageBackground, TouchableOpacity, View} from 'react-native';

import {
  images,
  logoutUser,
  SCREEN_ROUTES,
  getPrimaryColor,
} from '../../utility';
import {Icon} from '../../components/icon';
import {translate} from '../../i18n/translate';
import {menuScreenStyles as styles} from './styles';
import {UserType} from '../../utility/object-types/user';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * An Interface for possible props for the DrawerContent component
 */
interface DrawerContentProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;

  /**
   * Prop used determine if menu screen will show or not
   */
  isVisible: boolean;

  /**
   * Prop used as callback when menu screen hides
   */
  onHideDialog: () => void;
}

/**
 * DrawerContent - A menu screen which shows a list of useful screen links
 */
const DrawerContent = (props: DrawerContentProps) => {
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;
  const onLogout = () => {
    props.onHideDialog();
    logoutUser(props.navigation);
  };

  const menu = [
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.myActivity',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.ACTIVITY_SCREEN);
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.profile',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
          userId: user._id,
        });
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.newsfeed',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.NEWSFEED_SCREEN);
      },
    },

    {
      active: false,
      type: 'menu',
      screenMenu: 'common.wellnessContent',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.WELLNESS_SCREEN);
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.corporateRunning',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.CRWC_SCREEN);
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.contactAppFeedback',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.CONTACT_US_FEEDBACK);
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.faq',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.FAQ);
      },
    },
    {
      active: false,
      type: 'menu',
      screenMenu: 'common.settings',
      navigateScreen: '',
      onClick: () => {
        props.onHideDialog();
        props.navigation.navigate(SCREEN_ROUTES.SETTING_SCREEN);
      },
    },
    {
      active: false,
      type: 'logOut',
      screenMenu: 'common.logOut',
      navigateScreen: '',
      onClick: onLogout,
    },
  ];

  const [menuData, setMenuData] = useState(menu);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setMenuData(menu);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const onChooseMenuData = (item: any) => {
    const updatedData = menuData.map(menuDataItem => {
      return {
        ...menuDataItem,
        active: menuDataItem.screenMenu === item.screenMenu,
      };
    });

    setMenuData(updatedData);
    item.onClick();
  };

  return (
    <SafeAreaView style={[styles.full, styles.safeAreaStyle]}>
      <Modal
        isVisible={props.isVisible}
        style={styles.modalStyle}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        backdropOpacity={1}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        animationOutTiming={200}
        animationInTiming={200}
        onBackdropPress={props.onHideDialog}
        onModalHide={props.onHideDialog}>
        <ImageBackground
          source={images.menuBackground}
          style={[styles.full, {paddingTop: useSafeAreaInsets().top}]}>
          <View style={styles.headerContainerStyle}>
            <Icon
              onIconClick={props.onHideDialog}
              icon={ICON_TYPES.CROSS}
              style={{
                ...styles.crossIconViewStyle,
                tintColor: getPrimaryColor(),
              }}
            />
          
            <Text
              preset={TextPresetStyles.HEADLINE_DARK}
              style={styles.blackTextStyle}
              tx={'common.menu'}
            />
           
            <View 
            style={styles.crossIconViewStyle}
             />

          </View>
          <View
            style={[styles.longLineStyle, {backgroundColor: getPrimaryColor()}]}
          />
          <View style={styles.marginLineBelowStyle}>
            {menuData.map(menuDataItem => {
              return (
                <View>
                  {menuDataItem.type == 'logOut' ? (
                    <View
                      style={[
                        styles.dashViewStyle,
                        {backgroundColor: getPrimaryColor()},
                      ]}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => onChooseMenuData(menuDataItem)}
                    style={styles.drawerItemStyle}>
                    <Text
                      preset={TextPresetStyles.SUB_HEADLINE1}
                      style={[
                        menuDataItem.active == true
                          ? {color: getPrimaryColor()}
                          : styles.blackTextStyle,
                      ]}
                      text={translate(`${menuDataItem.screenMenu}`)}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );
};

export {DrawerContent};
