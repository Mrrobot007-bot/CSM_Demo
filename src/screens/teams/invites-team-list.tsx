import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {
  images,
  showMessage,
  defaultAlert,
  getPrimaryColor,
} from '../../utility';
import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {store} from '../../redux/store/configureStore';
import {STATUS_CODES} from '../../services/status-codes';
import {Text, TextPresetStyles} from '../../components/text';
import {postApiCall, putApiCall} from '../../services/api-services';
import {ArchivedTeamListStyles as styles} from './archived-team-styles';
import {FastImageModified} from '../../components/fast-image-modified';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';
import {PaginationLoaderComponent} from '../my-challenges-screen/components/challenges';

/**
 * An Interface for possible props for invited Team List component
 */
interface IInvitedTeamListProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}
/**
 * Component is used to show the invite team list
 */
export const InvitedTeamList = (props: IInvitedTeamListProps) => {
  const dispatch = useDispatch();
  const [inviteTeamList, setInviteTeamList] = useState([]);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);

  /**
   * function is used to load the initial data
   */
  useEffect(() => {
    getInviteTeamList();
  }, []);

  /**
   * function to load get invites in team list
   */
  const getInviteTeamList = async () => {
    if (shouldStopLoading) {
      return;
    }

    if (pageNumber > 1) {
      setIsDataLoading(true);
    }

    const parameters = {
      pageNo: pageNumber,
      limit: 10,
    };
    const apiResponse = await dispatch(
      postApiCall(API_URLS.INVITED_TEAM_LIST, parameters, pageNumber <= 1),
    );
    setIsDataLoading(false);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let data: Array<object> = path(['data'], apiResponse || []);
      console.log('api data==leaderboard>', data);
      data = data.filter(item => {
        const isItemFound = inviteTeamList.find(
          (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
        );
        return isItemFound ? null : item;
      });
      if (data && data.length) {
        setPageNumber(pageNumber + 1);
        const updatedLeaderBoard = [...inviteTeamList, ...data];
        setInviteTeamList(updatedLeaderBoard);
      } else {
        setShouldStopLoading(true);
      }
    }
  };

  /**
   * function is used to accept Decline he Request
   */
  const AcceptDeclineRequest = async (item: any, type: string) => {
    let parameters = {
      id: item._id,
      status: type,
    };
    try {
      const apiResponse = await dispatch(
        putApiCall(API_URLS.ACCEPT_REJECT_INVITED_TEAM, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        console.log('api===>', apiResponse);
        let _id = item._id;
        let updateInviteList = inviteTeamList;
        updateInviteList = updateInviteList.filter(item => item._id !== _id);
        setInviteTeamList(updateInviteList);
        showMessage(`${'Invite '}${type}`);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const renderTeamItem = ({item}: any) => {
    return (
      <View key={item._id}>
        <View style={styles.listMainContainer}>
          <Text preset={TextPresetStyles.SUB_HEADLINE} text={item.team_name} />

          <View style={[styles.submitClimbOpenViewStyle]}>
            <View style={styles.inviteTeamRenderListStyle}>
              <FastImageModified
                url={item.userProfilePic}
                style={styles.userDisplayStyle}
                defaultImage={images.user}
              />
              <Text
                preset={TextPresetStyles.CAPTION_3}
                style={[styles.secondaryLabelTextStyle, styles.grayTextStyle]}
                text={`${translate('modules.Dashboard.invitedBy')} ${
                  item.teamCreatorFirstName
                } ${item.teamCreatorLastName}`}
              />
            </View>
            <FastImageModified
              url={item.team_image}
              defaultImage={images.user}
              style={styles.inviteByImageStyle}
            />

            <Text
              preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
              style={styles.descriptionTextStyle}
              text={item.team_about}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                AcceptDeclineRequest(item, 'declined');
              }}>
              <Text
                preset={TextPresetStyles.FOOT_NOTE_BOLD}
                style={[styles.declineButtonStyle, {color: getPrimaryColor()}]}
                text={translate('common.decline')}
              />
            </TouchableOpacity>
            <Button
              onPress={() => {
                AcceptDeclineRequest(item, 'accepted');
              }}
              preset={ButtonPreset.MEDIUM}
              text={translate('common.accept')}
              style={styles.acceptButtonStyle}
            />
          </View>
        </View>
      </View>
    );
  };

  const isLoading = store.getState().apiReducer.loading;
  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_BACK}
      navigation={props.navigation}
      title={translate('modules.teams.myTeamsInviteList')}>
      <View style={styles.mainContainer}>
        {isLoading || isDataLoading ? null : inviteTeamList.length ? (
          <FlatList
            data={inviteTeamList}
            renderItem={({item}) => renderTeamItem({item})}
            keyExtractor={item => item._id}
            onEndReached={() => {
              getInviteTeamList();
            }}
            ListFooterComponent={() => (
              <PaginationLoaderComponent
                isDataLoading={isDataLoading}
                challengesData={inviteTeamList}
              />
            )}
          />
        ) : (
          <View>
            <Text
              preset={TextPresetStyles.FOOT_NOTE}
              style={styles.noDataTextStyle}
              tx={'modules.teams.noTeamsInvites'}
            />

            <Button
              onPress={() => getInviteTeamList()}
              preset={ButtonPreset.EXTRA_SMALL}
              text={translate('common.retry')}
            />
          </View>
        )}
      </View>
    </BoostrScreen>
  );
};
