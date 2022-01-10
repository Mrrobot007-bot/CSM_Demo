import React from 'react';
import {path} from 'ramda';
import {ScrollView} from 'react-native-gesture-handler';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  defaultAlert,
  getPrimaryColor,
  getLiveChallenges,
} from '../../utility';
import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {store} from '../../redux/store/configureStore';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {MyChallengesScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {PaginationLoaderComponent} from './components/challenges';
import {InvitedByComponent} from './components/invited-by-component';
import {FastImageModified} from '../../components/fast-image-modified';
import {FirstRowDetailsComponent} from './components/first-row-details-component';

/**
 * An Interface for possible props for the Invites Screen
 */
interface IInvitesScreenProps {
  getInviteList?: () => void;
  invitesChallengesData: Array<any>;
  isDataLoading?: boolean;
  setInviteChallengesData?: (item: any) => void;
}

/**
 * InvitesScreen - A tab component used to provide the
 * list of invitation received for challenges
 */
export const InvitesScreen = (props: IInvitesScreenProps) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  const dispatch = useDispatch();

  const AcceptDeclineRequest = async (item: any, type: string) => {
    let parameters = {
      _id: item.invitedId,
      status: type,
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.APPROVE_REJECT_CHALLENGE, parameters),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      getLiveChallenges(userReducer, true);
      const updatedInvitedData = props.invitesChallengesData.filter(
        oldItem => path(['invitedId'], oldItem) !== path(['invitedId'], item),
      );
      props.setInviteChallengesData(updatedInvitedData);
    }

    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getLiveChallenges(userReducer, true);
      } else {
        defaultAlert(
          translate('modules.errorMessages.error'),
          path(['message'], apiResponse),
        );
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const renderChallengeItem = ({item}: any) => {
    return (
      <View key={item._id}>
        <View style={styles.listMainContainer}>
          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={{}}
            text={item.challengeName}
          />

          <View style={[styles.submitClimbOpenViewStyle]}>
            <InvitedByComponent challenge={item} />
            <FirstRowDetailsComponent challenge={item} />
            <FastImageModified
              url={item.image}
              defaultImage={images.user}
              style={styles.inviteByImageStyle}
            />

            <Text
              preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
              style={styles.descriptionTextStyle}
              text={item.description}
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
    <ScrollView style={styles.openChallengeMainContainer}>
      {props.invitesChallengesData && props.invitesChallengesData.length ? (
        <FlatList
          data={props.invitesChallengesData}
          renderItem={({item}) => renderChallengeItem({item})}
          keyExtractor={item => item.invitedId}
          onEndReached={() => props.getInviteList()}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() => (
            <PaginationLoaderComponent
              isDataLoading={props.isDataLoading}
              challengesData={props.invitesChallengesData}
            />
          )}
        />
      ) : isLoading || props.isDataLoading ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'modules.myChallenges.noChallengesInvites'}
          />

          <Button
            onPress={() => props.getInviteList()}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.retry')}
          />
        </View>
      )}
      <View style={styles.boostrDummy} />
    </ScrollView>
  );
};
