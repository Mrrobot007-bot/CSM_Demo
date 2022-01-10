import {path} from 'ramda';
import React, {useState} from 'react';
import posed from 'react-native-pose';
import LottieView from 'lottie-react-native';
import {FlatList, TouchableOpacity, View, ViewStyle} from 'react-native';

import {
  loaderJson,
  showMessage,
  defaultAlert,
  listLoaderJson,
  getPrimaryColor,
  getDaysDiffFrom2dates,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {getChallengeItemData} from '../utils';
import {API_URLS} from '../../../services/urls';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
} from '../../../utility/object-types/challenge';
import {LOADING} from '../../../redux/constants';
import {BoostrComponent} from './boostr-component';
import {Button} from '../../../components/button';
import {ShareViewComponent} from './share-view-component';
import {ButtonPreset} from '../../../components/button';
import {FundRaiseComponent} from './fund-raise-component';
import {InvitedByComponent} from './invited-by-component';
import {addUser} from '../../../redux/actions/user-actions';
import {SectionViewComponent} from './section-view-component';
import {STATUS_CODES} from '../../../services/status-codes';
import {ChallengesStyles as styles} from './challenges-styles';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {ManageChallengeComponent} from './manage-challenge-component';
import {UserLeaderBoardComponent} from './user-leader-board-component';
import {TeamLeaderBoardComponent} from './team-leader-board-component';
import {FirstRowDetailsComponent} from './first-row-details-component';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {SecondRowDetailsComponent} from './second-row-details-component';
import {deleteApiCall, putApiCall} from '../../../services/api-services';
import {UserConfirmationDialog} from '../../../components/user-confirmation-dialog';

/**
 * LoadingSpinnerWrapper - A loader wrapper component
 */
const LoadingSpinnerWrapper = posed.View({
  connecting: {opacity: 1, delay: 150, transition: {duration: 700}},
});

/**
 * An Interface for possible props for the Challenges Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges list
   */
  challenges: Array<ChallengeType>;

  /**
   * Prop used to tell the component that data is loading from server or not
   */
  isDataLoading?: boolean;

  /**
   * Prop used to provide info, that is the component used on home screen or any other screen
   */
  isHomeChallenge?: boolean;

  /**
   * Prop used to provide the header of challenges list if required
   */
  listHeader?: any;

  /**
   * Prop used to provide the callback on join challenge click
   */
  onJoinClick?: (challengeId: string) => void;

  /**
   * Prop used to provide the callback when user reached end of list
   */
  onListEndReached?: () => void;
}

export const detailsViewSection = (
  title: string,
  value: string,
  customValueComponent?: React.ReactNode,
  style?: ViewStyle,
) => {
  return (
    <View style={[styles.submitUserInfoViewInnerStyle, style]}>
      <Text
        preset={TextPresetStyles.MINI_FONT_REGULAR}
        style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
        text={title}
      />
      <View style={styles.challengeDetailsViewStyle}>
        <Text
          preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
          style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
          text={value}
        />
        {customValueComponent}
      </View>
    </View>
  );
};

/**
 * Challenges - component used to show the Challenges component at multiple screens in app
 * like on home, my challenges live, open, upcoming, complete etc
 */
export const Challenges: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const dispatch = useDispatch();
  const [challengesData, setChallengesData] = useState(
    props.challenges.map(challenge => {
      return {
        ...challenge,
        isFocused: false,
        timeElapsed:
          new Date().getTime() -
          new Date(path(['startDate'], challenge)).getTime(),
      };
    }),
  );
  const [deleteChallenge, setDeleteChallenge] = useState(null);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [shouldShowLeaderBoard, setShouldShowLeaderBoard] = useState(true);
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  const updateChallengeData = async (challengeId: string) => {
    const challengeItem = challengesData.find(
      item => path(['_id'], item) === challengeId,
    );
    const currentData = challengesData.find(
      item => item._id === challengeId && path(['startDate'], item),
    );

    const focusedUpdatedState =
      challengeItem._id === challengeId
        ? !challengeItem.isFocused
        : challengeItem.isFocused;

    setChallengesData(
      challengesData.map(challenge => {
        if (challenge._id === challengeId) {
          return {
            ...challenge,
            isLoader: !currentData,
            isFocused: focusedUpdatedState,
          };
        } else {
          return challenge;
        }
      }),
    );

    if (focusedUpdatedState && !currentData) {
      getChallengeItemData(
        challengesData,
        challengeId,
        dispatch,
        true,
        challengeItem.screenType,
      );
    }
  };

  /**
   * updating the state challenges data when corresponding prop updated
   */
  React.useEffect(() => {
    const cc: Array<any> = path(['challenges'], props);
    setChallengesData(
      cc.map(challenge => {
        let isFocused = false;
        try {
          isFocused =
            challengesData.find(
              newChallenge => newChallenge._id === challenge._id,
            ).isFocused || false;
        } catch (e) {}

        return {
          ...challenge,
          isFocused: isFocused,
        };
      }),
    );
    dispatch({type: LOADING, isLoading: false});
  }, [path(['challenges'], props)]);

  /**
   * Action on leave / delete challenge
   */
  const onLeaveChallenge = async (challenge: ChallengeType) => {
    setShowLeaveDialog(false);
    const parameters = {
      challenge_id: challenge._id,
    };
    const isAdmin =
      path(['invitedByUserId'], challenge) ===
      path(['user', '_id'], userReducer);

    const apiResponse = await dispatch(
      isAdmin
        ? deleteApiCall(API_URLS.DELETE_CHALLENGE, parameters)
        : putApiCall(
            challenge.isTeamChallenge
              ? API_URLS.LEAVE_TEAM_CHALLENGE
              : API_URLS.LEAVE_CHALLENGE,
            parameters,
          ),
    );
    setDeleteChallenge(null);

    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.myChallenges.challengeRemoved'));
        const upDatedChallenges = challengesData.filter(
          item => path(['_id'], item) !== challenge._id,
        );

        setChallengesData(upDatedChallenges);

        if (challenge.screenType === ChallengeScreenTypes.UPCOMING) {
          dispatch(
            addUser({
              ...userReducer.user,
              upcomingChallenges: upDatedChallenges,
            }),
          );
        } else {
          dispatch(
            addUser({
              ...userReducer.user,
              liveChallenges: upDatedChallenges,
            }),
          );
        }
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

  /**
   * Challenges header section component
   */
  const SectionView = (challenge: ChallengeType) => {
    const isAdmin =
      path(['invitedByUserId'], challenge) ===
      path(['user', '_id'], userReducer);

    switch (challenge.screenType) {
      case ChallengeScreenTypes.LIVE:
        return path(['isLoader'], challenge) ? (
          <InnerLoaderComponent />
        ) : path(['startDate'], challenge) ? (
          <ShareViewComponent hideShareDownload={props.isHomeChallenge}>
            <View
              style={{
                backgroundColor: color.palette.white,
                paddingHorizontal: 4,
              }}>
              <InvitedByComponent challenge={challenge} />
              <FirstRowDetailsComponent challenge={challenge} />
              <SecondRowDetailsComponent
                challenge={challenge}
                shouldShowLeaderBoard={shouldShowLeaderBoard}
                setShouldShowLeaderBoard={setShouldShowLeaderBoard}
                isHomeChallenge={props.isHomeChallenge}
              />
              {!props.isHomeChallenge ? (
                <View>
                  {challenge.isTeamChallenge &&
                  challenge.teamLeaderBoard &&
                  challenge.teamLeaderBoard.length ? (
                    <TeamLeaderBoardComponent challenge={challenge} />
                  ) : challenge.usersLeaderBoard &&
                    challenge.usersLeaderBoard.length ? (
                    <UserLeaderBoardComponent
                      challenge={challenge}
                      shouldShowLeaderBoard={shouldShowLeaderBoard}
                    />
                  ) : null}

                  {(challenge.challengeType === TypeOfChallenges.RELAY ||
                    challenge.challengeType === TypeOfChallenges.HAPPY_FEET ||
                    challenge.challengeType === TypeOfChallenges.FAR_OUT) && (
                    <Text
                      preset={TextPresetStyles.DESCRIPTION}
                      style={styles.descriptionTextStyle}
                      text={`${getDaysDiffFrom2dates(
                        challenge.endDate,
                        new Date().toString(),
                      )} ${translate('modules.myChallenges.leftInThe')} ${
                        challenge.challengeName
                      } ${
                        challenge.challengeType === TypeOfChallenges.RELAY
                          ? translate(
                              'modules.myChallenges.relayChallengeDescription',
                            )
                          : translate(
                              'modules.myChallenges.challengeDescription',
                            )
                      }`}
                    />
                  )}

                  {challenge.challengeType === TypeOfChallenges.TIME_TRIAL && (
                    <Text
                      preset={TextPresetStyles.DESCRIPTION}
                      style={styles.descriptionTextStyle}
                      text={`${translate('modules.myChallenges.comeOn')} ${path(
                        ['user', 'firstName'],
                        userReducer,
                      )}${translate(
                        'modules.myChallenges.timeTrialChallengeDescription',
                      )}`}
                    />
                  )}

                  <FundRaiseComponent challenge={challenge} />

                  <BoostrComponent challenge={challenge} />

                  <ManageChallengeComponent challenge={challenge} />

                  <TouchableOpacity
                    onPress={() => {
                      setShowLeaveDialog(true);
                      setDeleteChallenge(challenge);
                    }}
                    style={styles.leaveChallengeContainerStyle}>
                    <Icon
                      icon={isAdmin ? ICON_TYPES.DELETE : ICON_TYPES.EXIT}
                      style={{
                        ...styles.exitIconStyle,
                        tintColor: getPrimaryColor(),
                      }}
                    />
                    <Text
                      preset={TextPresetStyles.SUB_HEADLINE}
                      tx={
                        isAdmin
                          ? 'common.deleteChallenge'
                          : 'common.leaveChallenge'
                      }
                      style={{color: getPrimaryColor()}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </ShareViewComponent>
        ) : path(['shouldShowRetry'], challenge) ? (
          <InnerRetryComponent
            challengesData={challengesData}
            challenge={challenge}
            dispatch={dispatch}
            screenType={ChallengeScreenTypes.LIVE}
          />
        ) : null;

      case ChallengeScreenTypes.UPCOMING:
        return path(['isLoader'], challenge) ? (
          <InnerLoaderComponent />
        ) : path(['startDate'], challenge) ? (
          <ShareViewComponent hideShareDownload={props.isHomeChallenge}>
            <View style={{backgroundColor: color.palette.white}}>
              <InvitedByComponent challenge={challenge} />
              <FirstRowDetailsComponent challenge={challenge} />
              <SecondRowDetailsComponent
                challenge={challenge}
                shouldShowLeaderBoard={shouldShowLeaderBoard}
                setShouldShowLeaderBoard={setShouldShowLeaderBoard}
                isHomeChallenge={props.isHomeChallenge}
              />

              {!props.isHomeChallenge ? (
                <View>
                  {challenge.isTeamChallenge &&
                  challenge.teamLeaderBoard &&
                  challenge.teamLeaderBoard.length ? (
                    <TeamLeaderBoardComponent challenge={challenge} />
                  ) : challenge.usersLeaderBoard &&
                    challenge.usersLeaderBoard.length ? (
                    <UserLeaderBoardComponent
                      challenge={challenge}
                      shouldShowLeaderBoard={shouldShowLeaderBoard}
                    />
                  ) : null}

                  {challenge.challengeType !== TypeOfChallenges.MEET_UP && (
                    <Text
                      preset={TextPresetStyles.DESCRIPTION}
                      style={styles.descriptionTextStyle}
                      text={`${getDaysDiffFrom2dates(
                        new Date().toString(),
                        path(['startDate'], challenge),
                      )} ${translate('modules.myChallenges.startInThe')} ${path(
                        ['challengeName'],
                        challenge,
                      )} ${translate(
                        'modules.myChallenges.challengeDescription',
                      )}`}
                    />
                  )}

                  <FundRaiseComponent challenge={challenge} />

                  <ManageChallengeComponent challenge={challenge} />
                  <TouchableOpacity
                    onPress={() => {
                      setShowLeaveDialog(true);
                      setDeleteChallenge(challenge);
                    }}
                    style={styles.leaveChallengeContainerStyle}>
                    <Icon
                      icon={isAdmin ? ICON_TYPES.DELETE : ICON_TYPES.EXIT}
                      style={{
                        ...styles.exitIconStyle,
                        tintColor: getPrimaryColor(),
                      }}
                    />
                    <Text
                      preset={TextPresetStyles.SUB_HEADLINE}
                      tx={
                        isAdmin
                          ? 'common.deleteChallenge'
                          : 'common.leaveChallenge'
                      }
                      style={{color: getPrimaryColor()}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </ShareViewComponent>
        ) : path(['shouldShowRetry'], challenge) ? (
          <InnerRetryComponent
            challengesData={challengesData}
            challenge={challenge}
            dispatch={dispatch}
            screenType={ChallengeScreenTypes.UPCOMING}
          />
        ) : null;

      case ChallengeScreenTypes.COMPLETE:
        return path(['isLoader'], challenge) ? (
          <InnerLoaderComponent />
        ) : path(['startDate'], challenge) ? (
          <ShareViewComponent>
            <View style={{backgroundColor: color.palette.white}}>
              <InvitedByComponent challenge={challenge} />
              <FirstRowDetailsComponent challenge={challenge} />
              <SecondRowDetailsComponent
                challenge={challenge}
                shouldShowLeaderBoard={shouldShowLeaderBoard}
                setShouldShowLeaderBoard={setShouldShowLeaderBoard}
              />
              {challenge.isTeamChallenge &&
              challenge.teamLeaderBoard &&
              challenge.teamLeaderBoard.length ? (
                <TeamLeaderBoardComponent challenge={challenge} />
              ) : challenge.usersLeaderBoard &&
                challenge.usersLeaderBoard.length ? (
                <UserLeaderBoardComponent
                  challenge={challenge}
                  shouldShowLeaderBoard={shouldShowLeaderBoard}
                />
              ) : null}
            </View>
          </ShareViewComponent>
        ) : path(['shouldShowRetry'], challenge) ? (
          <InnerRetryComponent
            challengesData={challengesData}
            challenge={challenge}
            dispatch={dispatch}
            screenType={ChallengeScreenTypes.COMPLETE}
          />
        ) : null;

      case ChallengeScreenTypes.OPEN:
        return (
          <View>
            <InvitedByComponent challenge={challenge} />
            <FirstRowDetailsComponent challenge={challenge} />
            <SecondRowDetailsComponent
              challenge={challenge}
              onJoinClick={props.onJoinClick}
              shouldShowLeaderBoard={shouldShowLeaderBoard}
              setShouldShowLeaderBoard={setShouldShowLeaderBoard}
            />
          </View>
        );

      case ChallengeScreenTypes.INVITES:
        return (
          <View>
            <InvitedByComponent challenge={challenge} />
            <FirstRowDetailsComponent challenge={challenge} />
            <SecondRowDetailsComponent
              challenge={challenge}
              onJoinClick={props.onJoinClick}
              shouldShowLeaderBoard={shouldShowLeaderBoard}
              setShouldShowLeaderBoard={setShouldShowLeaderBoard}
            />
            {challenge.isTeamChallenge ? (
              <TeamLeaderBoardComponent challenge={challenge} />
            ) : challenge.usersLeaderBoard ? (
              <UserLeaderBoardComponent
                challenge={challenge}
                shouldShowLeaderBoard={shouldShowLeaderBoard}
              />
            ) : null}

            {challenge.challengeType !== TypeOfChallenges.MEET_UP && (
              <Text
                preset={TextPresetStyles.DESCRIPTION}
                style={styles.descriptionTextStyle}
                text={`${getDaysDiffFrom2dates(
                  new Date().toString(),
                  path(['startDate'], challenge),
                )} ${translate('modules.myChallenges.startInThe')} ${path(
                  ['challengeName'],
                  challenge,
                )} ${translate('modules.myChallenges.challengeDescription')}`}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setShowLeaveDialog(true);
                setDeleteChallenge(challenge);
              }}
              style={styles.leaveChallengeContainerStyle}>
              <Icon
                icon={ICON_TYPES.EXIT}
                style={{...styles.exitIconStyle, tintColor: getPrimaryColor()}}
              />
              <Text
                preset={TextPresetStyles.SUB_HEADLINE}
                tx={
                  isAdmin ? 'common.deleteChallenge' : 'common.leaveChallenge'
                }
                style={{color: getPrimaryColor()}}
              />
            </TouchableOpacity>
          </View>
        );
    }
  };

  /**
   * List item of challenge
   */
  const renderChallengeItem = (challenge: ChallengeType) => {
    return (
      <View key={challenge._id}>
        <SectionViewComponent
          challenge={challenge}
          updateChallengeData={updateChallengeData}
        />
        {challenge.isFocused && (
          <View style={[styles.submitClimbOpenViewStyle]}>
            {SectionView(challenge)}
          </View>
        )}
      </View>
    );
  };

  const isAdmin =
    path(['invitedByUserId'], deleteChallenge) ===
    path(['user', '_id'], userReducer);
  return (
    <View>
      <View>
        <FlatList
          data={challengesData}
          renderItem={({item}) => renderChallengeItem(item)}
          keyExtractor={item => item._id}
          style={{padding: 0}}
          ListHeaderComponent={props.listHeader ? props.listHeader : null}
          onEndReached={
            props.onListEndReached
              ? () => {
                  console.log('on End reached');
                  if (challengesData.length >= 10) {
                    props.onListEndReached();
                  }
                }
              : null
          }
          onEndReachedThreshold={0}
          extraData={[challengesData]}
          ListFooterComponent={() => (
            <PaginationLoaderComponent
              isDataLoading={props.isDataLoading}
              challengesData={challengesData}
            />
          )}
        />
      </View>

      <UserConfirmationDialog
        icon={ICON_TYPES.EXIT}
        title={
          isAdmin
            ? translate('modules.myChallenges.deleteChallengeTitle')
            : translate('modules.myChallenges.leaveChallengeTitle')
        }
        description={
          isAdmin
            ? translate('modules.myChallenges.deleteChallengeDescription')
            : translate('modules.myChallenges.leaveChallengeDescription')
        }
        isVisible={showLeaveDialog}
        okButtonText={
          isAdmin
            ? translate('common.delete')
            : translate('modules.myChallenges.leave')
        }
        onOkClick={() => {
          onLeaveChallenge(deleteChallenge);
        }}
        onHideDialog={() => {
          setShowLeaveDialog(false);
        }}
      />
    </View>
  );
};

/**
 * loader component inside the challenge which will show when loading the details
 */
const InnerLoaderComponent = () => {
  return (
    <View style={styles.innerLoaderContainerStyle}>
      <LoadingSpinnerWrapper
        pose={'connecting'}
        style={styles.innerLoaderStyle}>
        <LottieView source={loaderJson} autoPlay loop resizeMode={'cover'} />
      </LoadingSpinnerWrapper>
    </View>
  );
};

/**
 * Retry component which will show when unable to load the challenge details
 */
const InnerRetryComponent = (props: any) => {
  const challengesData: Array<ChallengeType> = path(['challengesData'], props);
  const challenge: ChallengeType = path(['challenge'], props);
  const dispatch: any = path(['dispatch'], props);
  const screenType: ChallengeScreenTypes = path(['screenType'], props);

  return (
    <View>
      <Text
        preset={TextPresetStyles.FOOT_NOTE}
        style={styles.noDataTextStyle}
        tx={'modules.myChallenges.noChallengeDetails'}
      />

      <Button
        onPress={() => {
          getChallengeItemData(
            challengesData,
            challenge._id,
            dispatch,
            false,
            screenType,
          );
        }}
        preset={ButtonPreset.EXTRA_SMALL}
        text={translate('common.retry')}
      />
    </View>
  );
};

/**
 * Pagination loader component, which will show when user moves to last of list
 */
export const PaginationLoaderComponent = (props: any) => {
  const isDataLoading: boolean = path(['isDataLoading'], props);
  const challengesData: Array<ChallengeType> = path(['challengesData'], props);
  return isDataLoading && challengesData.length ? (
    <View style={styles.paginationLoaderContainerStyle}>
      <LoadingSpinnerWrapper pose={'connecting'} style={styles.spinnerStyle}>
        <LottieView
          source={listLoaderJson}
          autoPlay
          loop
          colorFilters={[
            {
              keypath: 'Shape Layer 1',
              color: getPrimaryColor(),
            },
            {
              keypath: 'Shape Layer 2',
              color: getPrimaryColor(),
            },
            {
              keypath: 'Shape Layer 3',
              color: getPrimaryColor(),
            },
            {
              keypath: 'Shape Layer 4',
              color: getPrimaryColor(),
            },
          ]}
        />
      </LoadingSpinnerWrapper>
    </View>
  ) : challengesData.length > 0 &&
    (path([0, 'screenType'], challengesData) === ChallengeScreenTypes.LIVE ||
      path([0, 'screenType'], challengesData) ===
        ChallengeScreenTypes.UPCOMING) ? null : (
    <View style={styles.spinnerStyle} />
  );
};
