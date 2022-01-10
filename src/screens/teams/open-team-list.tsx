import {path} from 'ramda';
import {FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {color} from '../../theme';
import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {MyTeamStyles as styles} from './styles';
import {STATUS_CODES} from '../../services/status-codes';
import {postApiCall} from '../../services/api-services';
import {ICON_TYPES} from '../../components/icon/constants';
import {SectionTitle} from '../../components/section-title';
import {Text, TextPresetStyles} from '../../components/text';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FastImageModified} from '../../components/fast-image-modified';
import {FormTextInput, TextInputPreset} from '../../components/form-text-input';
import {
  defaultAlert,
  getPrimaryColor,
  images,
  SCREEN_ROUTES,
} from '../../utility';

/**
 * An Interface for possible props for OpenTeamList component
 */
interface IOpenListProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * props is used to get the open list data
   */
  openList: any;
}

/**
 * component is used to show open Team list
 */
export const OpenTeamList = (props: IOpenListProps) => {
  const [openList, setOpenList] = useState(props.openList);
  const dispatch = useDispatch();

  /**
   * function is used to load the initial data
   */
  useEffect(() => {
    setOpenList(props.openList);
  }, [props.openList]);

  /**
   * function is used to get suggestions list
   */
  const getSuggestions = useCallback(async q => {
    let parameters = {
      searchkey: q,
      // pageNo: 0,
      //  limit: 10,
    };
    try {
      let apiResponse = await dispatch(
        postApiCall(API_URLS.GET_OPEN_TEAM_LIST, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<object> = path(['data'], apiResponse);
        setOpenList(data);
        console.log('team api data==>', apiResponse);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  }, []);

  return (
    <View style={styles.archiveMainContainer}>
      <SectionTitle tx={'modules.teams.joinTeam'} />

      <Text
        preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
        style={styles.archiveDescriptionContainer}
        tx={'modules.teams.joinTeamDescription'}
      />
      <View style={styles.archiveSuggestionInputView}>
        <FormTextInput
          onChangeText={getSuggestions}
          checkValidation
          inlinePlaceholderTx={'modules.myChallenges.search'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          preset={TextInputPreset.SEARCH}
          style={styles.archiveSuggestionInputView}
        />

        <FlatList
          data={openList}
          scrollEnabled={false}
          renderItem={({item}) => {
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
                      <Text
                        preset={TextPresetStyles.FOOT_NOTE_BOLD}
                        text={item.name}
                      />
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
                      text={
                        item.close
                          ? translate('modules.profile.closed')
                          : translate('modules.profile.open')
                      }
                    />
                  </View>
                </View>

                <View style={styles.rightArrowContainerView}>
                  <Icon
                    icon={ICON_TYPES.ARROW_RIGHT}
                    style={styles.rightArrowStyle}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
