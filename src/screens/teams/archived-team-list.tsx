import React from 'react';
import {path} from 'ramda';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  images,
  showMessage,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {wpx} from '../../utility/responsive';
import {STATUS_CODES} from '../../services/status-codes';
import {putApiCall} from '../../services/api-services';
import {ICON_TYPES} from '../../components/icon/constants';
import {SectionTitle} from '../../components/section-title';
import {Text, TextPresetStyles} from '../../components/text';
import {FastImageModified} from '../../components/fast-image-modified';
import {ArchivedTeamListStyles as styles} from './archived-team-styles';

interface IAchievedTeamListProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
  /**
   * archivedList data
   */
  archivedList: any;
  /**
   * function to get latest archieved team list
   */
  getAchievedTeamList: () => void;
}

/**
 * Component is used to show archive section
 */

export const ArchivedTeamList = (props: IAchievedTeamListProps) => {
  const dispatch = useDispatch();
  const archivedTeamList = props.archivedList;

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.teamMemberMainView}
        onPress={() =>
          props.navigation.navigate(SCREEN_ROUTES.TEAM_PROFILE, {
            teamId: item._id,
          })
        }>
        <View style={styles.teamImageTextContainer}>
          <FastImageModified
            url={item.image}
            defaultImage={images.defaultImage_2}
            style={styles.teamImageStyle}
          />
          <View style={styles.teamTextContainer}>
            <View style={styles.flexRow}>
              <Text preset={TextPresetStyles.FOOT_NOTE_BOLD} text={item.name} />
              {path(['isDefault'], item) ? (
                <Icon
                  icon={ICON_TYPES.MY_CREATE_TEAM}
                  style={{
                    ...styles.myCreatedTeamImageStyle,
                    tintColor: getPrimaryColor(),
                  }}
                />
              ) : null}
            </View>

            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={{color: color.textInputPlaceHolderText}}
              text={translate('modules.profile.closed')}
            />
          </View>
        </View>

        <View style={styles.rightArrowContainerView}>
          <Icon icon={ICON_TYPES.ARROW_RIGHT} style={styles.rightArrowStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  const removeArchived = async (item: any) => {
    let parameters = {
      id: item.item._id,
      is_archived: false,
    };
    try {
      const apiResponse = await dispatch(
        putApiCall(
          API_URLS.REMOVE_ARCHIVED,
          parameters,
          props.navigation,
          removeArchived,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        console.log('manageInvitesRemove===>', apiResponse);
        showMessage(translate('modules.teams.archivedTeamRemoved'));
        props.getAchievedTeamList();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  return (
    <View style={styles.mainContainerStyle}>
      {archivedTeamList.length == 0 ? null : (
        <View>
          <SectionTitle tx={'modules.teams.archivedTeam'} />
          <View style={styles.listContainerStyle}>
            <SwipeListView
              data={archivedTeamList}
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.hideDetailsViewContainer}>
                  <View style={styles.hideDetailsInnerView}>
                    <TouchableOpacity
                      style={styles.removeButtonStyle}
                      onPress={() => removeArchived(data)}>
                      <Icon
                        icon={ICON_TYPES.DELETE}
                        style={styles.deleteIconStyle}
                      />
                      <Text
                        preset={TextPresetStyles.MINI_FONT}
                        style={styles.removeTextStyle}
                        tx={'modules.teams.unArchive'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              rightOpenValue={wpx(-65)}
            />
          </View>
        </View>
      )}
    </View>
  );
};
