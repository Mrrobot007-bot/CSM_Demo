import {path} from 'ramda';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import React, {FC, ReactElement, useEffect, useState} from 'react';

import {
  showMessage,
  defaultAlert,
  DEVICE_WIDTH,
  SCREEN_ROUTES,
  getPrimaryColor,
} from '../../utility';
import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {spacingPresets, color} from '../../theme';
import {ButtonPreset} from '../../components/button';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {addUser} from '../../redux/actions/user-actions';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {OrganizationType} from '../../utility/object-types/user';
import {LoginDataResponse} from '../../utility/object-types/auth-response';

/**
 * An Interface for possible props for the SwitchOrganization Dialog
 */
export interface IMenuDialogProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * A prop used to decide,if need to show model
   */
  isVisible: boolean;

  /**
   * A prop used to provide the callback on hide dialog
   */
  hideDialog: () => void;

  /**
   * A prop used to provide the organization data
   */
  organizations: Array<OrganizationType>;

  /**
   * A prop used to provide login data
   */
  loginData?: LoginDataResponse;
}

/**
 * DefaultDialog ,component used to render switch organization when login
 */
export const SwitchOrganizationDialog: FC<IMenuDialogProps> = (
  props: IMenuDialogProps,
): ReactElement => {
  const dispatch = useDispatch();
  const [radioButtons, setRadioButtons] = useState<Array<any>>(
    props.organizations.map((item: OrganizationType, index) => {
      return {
        id: path(['_id'], item),
        label: path(['name'], item),
        value: path(['_id'], item),
        selected: index === 0,
      };
    }),
  );

  const [data, setData] = useState<LoginDataResponse>(props.loginData);

  useEffect(() => {
    setRadioButtons(
      props.organizations.map((item: OrganizationType, index) => {
        return {
          id: path(['_id'], item),
          label: path(['name'], item),
          value: path(['_id'], item),
          selected: index === 0,
        };
      }),
    );

    setData(props.loginData);
  }, [props.organizations, props.loginData]);

  const onPressRadioButton = (radioButtonsArray: any) => {
    setRadioButtons(radioButtonsArray);
  };

  const onSubmitPress = async () => {
    const selectedOrganization = radioButtons.find(item =>
      path(['selected'], item),
    );
    let loginData = {
      ...data,
      organisationId: data.organisationId.filter(
        item => path(['_id'], item) === path(['id'], selectedOrganization),
      ),
    };

    try {
      const apiResponse = await dispatch(
        getApiCall(
          `${API_URLS.SWITCH_ORGANIZATION}?orgId=${path(
            ['organisationId', 0, '_id'],
            loginData,
          )}`,
          props.navigation,
          null,
          false,
          false,
          false,
          false,
          path(['sessionId'], loginData),
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        const apiData = path(['data'], apiResponse) || null;
        loginData = {...loginData, sessionId: path(['sessionId'], apiData)};
        if (loginData.onboarding) {
          dispatch(addUser(loginData));
        } else {
          dispatch(addUser(loginData));
          props.navigation.navigate(SCREEN_ROUTES.ONBOARDING_SCREEN, {
            data: loginData,
          });
        }
      } else {
        showMessage(translate('modules.errorMessages.somethingWentWrong'));
      }

      props.hideDialog();
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={() => props.hideDialog()}
        onModalHide={() => props.hideDialog()}>
        <View style={styles.modalContentStyle}>
          <View style={styles.fullWidth}>
            <Icon
              onIconClick={props.hideDialog}
              icon={ICON_TYPES.CROSS}
              style={styles.crossIconStyle}
            />
          </View>
          <Text
            preset={TextPresetStyles.HEADLINE_DARK}
            tx={'modules.auth.chooseOrganization'}
          />
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.descriptionTextStyle}
            tx={'modules.auth.chooseOrganizationDescription'}
          />

          <View style={styles.radioButtonContainerStyle}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              containerStyle={styles.radioButtonContainerStyle}
            />
          </View>

          <Button
            onPress={onSubmitPress}
            preset={ButtonPreset.MEDIUM}
            text={translate('common.submit')}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },

  crossIconStyle: {
    alignSelf: 'flex-end',
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    tintColor: getPrimaryColor(),
  },

  radioButtonContainerStyle: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: spacingPresets.medium,
  },

  descriptionTextStyle: {
    textAlign: 'center',
    marginTop: spacingPresets.medium,
  },

  modalContentStyle: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.91,
    padding: spacingPresets.small,
    borderColor: color.palette.black_10,
    backgroundColor: color.palette.lightYellow,
  },
});
