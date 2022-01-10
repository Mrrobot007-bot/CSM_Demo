import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';

import {
  images,
  kmToMiles,
  roundTo2Decimal,
  getPrimaryColor,
  isSelectedUnitKM,
  getDaysDiffFrom2dates,
  parseMillisecondsIntoReadableTime,
  parseMillisecondsIntoReadableDayTime,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  PercentageBar,
  PercentageBarTypes,
} from '../../../components/percentage-bar';
import {Icon} from '../../../components/icon';
import {detailsViewSection} from './challenges';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
} from '../../../utility/object-types/challenge';
import {Button} from '../../../components/button';
import {ICON_TYPES} from '../../../components/icon/constants';
import {ChallengesStyles as styles} from './challenges-styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the SecondRowDetails Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;

  /**
   * Prop used to determine if the parent component part of home Screen or not
   */
  isHomeChallenge?: boolean;

  /**
   * Prop used to provide callback on join challenge click
   */
  onJoinClick?: (challengeId: string) => void;

  /**
   * Prop used to provide callback to determine leaderboard visibility
   */
  setShouldShowLeaderBoard: (shouldShowLeaderBoard: boolean) => void;

  /**
   * Prop used to determine should show leaderboard or not
   */
  shouldShowLeaderBoard: boolean;
}

/**
 * SecondRowDetailsComponent - component used to render the second row of challenge component
 */
export const SecondRowDetailsComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const completedDistancePercentage =
    path(['challenge', 'screenType'], props) === ChallengeScreenTypes.UPCOMING
      ? 0
      : isSelectedUnitKM()
      ? (props.challenge.completedDistanceInKm * 100) /
        props.challenge.totalDistanceInKm
      : kmToMiles(props.challenge.completedDistanceInKm * 100) /
        kmToMiles(props.challenge.totalDistanceInKm);

  const totalTimeForChallenge =
    new Date(path(['challenge', 'endDate'], props)).getTime() -
    new Date(path(['challenge', 'startDate'], props)).getTime();

  const timeElapsed =
    new Date().getTime() -
    new Date(path(['challenge', 'startDate'], props)).getTime();
  const completedTimePercentage = (timeElapsed * 100) / totalTimeForChallenge;

  const [completedTimePercentageFarOut, setCompletedTimePercentageFarOut] =
    useState(
      100 -
        ((new Date(props.challenge.endDate).getTime() - new Date().getTime()) *
          100) /
          totalTimeForChallenge,
    );
  const {days, hours, minutes, seconds} = parseMillisecondsIntoReadableDayTime(
    new Date(props.challenge.endDate).getTime() - new Date().getTime(),
  );
  const [farOutDays, setFarOutDays] = useState(days);
  const [farOutHours, setFarOutHours] = useState(hours);
  const [farOutMinutes, setFarOutMinutes] = useState(minutes);
  const [farOutSeconds, setFarOutSeconds] = useState(seconds);

  React.useEffect(() => {
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      updateFarOutTime();
    }, 1000);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, []);

  const updateFarOutTime = () => {
    setCompletedTimePercentageFarOut(
      100 -
        ((new Date(props.challenge.endDate).getTime() - new Date().getTime()) *
          100) /
          totalTimeForChallenge,
    );

    const {days, hours, minutes, seconds} =
      parseMillisecondsIntoReadableDayTime(
        new Date(props.challenge.endDate).getTime() - new Date().getTime(),
      );

    setFarOutDays(days);
    setFarOutHours(hours);
    setFarOutMinutes(minutes);
    setFarOutSeconds(seconds);
  };

  const getDayTimeComponent = (
    label: string,
    value: string | number,
    withTailItem: boolean = false,
  ) => {
    return (
      <View style={styles.rowStyle}>
        <View style={styles.getDayTimeContainerStyle}>
          <Text preset={TextPresetStyles.TITLE_MEDIUM} text={`${value}`} />
          <Text
            preset={TextPresetStyles.MINI_FONT}
            text={label}
            style={styles.labelTextStyle}
          />
        </View>

        {withTailItem && (
          <Text
            preset={TextPresetStyles.TITLE_MEDIUM}
            text={':'}
            style={styles.colonTextStyle}
          />
        )}
      </View>
    );
  };

  let part1: any = null;

  const daysRemaining =
    props.challenge.screenType === ChallengeScreenTypes.UPCOMING
      ? `${getDaysDiffFrom2dates(
          new Date().toString(),
          props.challenge.startDate,
          true,
        )} ${translate('modules.myChallenges.daysRemainingToStart')}`
      : `${getDaysDiffFrom2dates(
          props.challenge.endDate,
          new Date().toString(),
          true,
        )} ${translate('modules.Dashboard.daysRemaining')}`;
  let part2 = (
    <View>
      <View style={styles.submitDayRemainingViewStyle}>
        <Text
          preset={TextPresetStyles.CAPTION_3}
          style={[
            {...styles.secondaryLabelTextStyle, color: getPrimaryColor()},
            styles.daysRemainingTextStyle,
          ]}
          text={daysRemaining}
        />
      </View>
    </View>
  );
  let part3: any = null;
  const part4 = (
    <FastImageModified
      url={props.challenge.image}
      style={styles.challengesImageStyle}
      defaultImage={images.defaultImage}
    />
  );

  const time = Math.round(completedTimePercentage * 100) / 100;
  let completeDisPercentage =
    Math.round(completedDistancePercentage * 100) / 100;
  completeDisPercentage =
    completeDisPercentage > 100 ? 100 : completeDisPercentage;
  let part5 = (
    <View style={styles.percentageBarContainerStyle}>
      <PercentageBar
        text={translate('common.distance')}
        activePercentage={`${completeDisPercentage}%`}
        activeBarBackgroundColor={getPrimaryColor()}
      />

      <PercentageBar
        style={styles.percentageBarTimeContainerStyle}
        text={translate('common.time')}
        activePercentage={`${time >= 0 ? time : 0}%`}
        activeBarBackgroundColor={color.palette.black}
      />
    </View>
  );

  switch (props.challenge.challengeType) {
    case TypeOfChallenges.RELAY:
      let completedDisPercentage =
        Math.round(completedDistancePercentage * 100) / 100;
      completedDisPercentage =
        completedDisPercentage > 100 ? 100 : completedDisPercentage;
      part1 = detailsViewSection(
        translate('modules.Dashboard.completed'),
        isSelectedUnitKM()
          ? `${roundTo2Decimal(
              path(['challenge', 'screenType'], props) ===
                ChallengeScreenTypes.UPCOMING
                ? 0
                : props.challenge.completedDistanceInKm,
            )} ${translate('common.km')}`
          : `${kmToMiles(
              path(['challenge', 'screenType'], props) ===
                ChallengeScreenTypes.UPCOMING
                ? 0
                : props.challenge.completedDistanceInKm,
            )} ${translate('common.mile')}`,
        <View style={[styles.challengeInfo2ViewStyle]}>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
            style={[
              styles.secondaryLabelTextStyle,
              styles.blackTextStyle,
              styles.submitDistancePercentageDiffLeftStyle,
            ]}
            text={`${completedDisPercentage}%`}
          />
        </View>,
      );
      break;

    case TypeOfChallenges.TIME_TRIAL:
      part1 = detailsViewSection(
        translate('modules.myChallenges.personalBest'),
        parseMillisecondsIntoReadableTime(props.challenge.personalBest),
      );
      part2 = null;
      part5 = null;
      break;

    case TypeOfChallenges.HAPPY_FEET:
      part1 = detailsViewSection(
        translate('modules.myChallenges.yourTotal'),
        isSelectedUnitKM()
          ? `${
              path(['challenge', 'screenType'], props) ===
              ChallengeScreenTypes.UPCOMING
                ? 0
                : Math.round(props.challenge.completedDistanceInKm * 100) / 100
            } ${translate('common.km')}`
          : `${kmToMiles(
              path(['challenge', 'screenType'], props) ===
                ChallengeScreenTypes.UPCOMING
                ? 0
                : props.challenge.completedDistanceInKm,
            )} ${translate('common.mile')}`,
        <View style={styles.challengeInfo2ViewStyle}>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
            style={[
              styles.secondaryLabelTextStyle,
              styles.blackTextStyle,
              styles.submitDistancePercentageDiffLeftStyle,
            ]}
            text={`${Math.round(completedDistancePercentage * 100) / 100}%`}
          />
        </View>,
      );
      break;

    case TypeOfChallenges.MEET_UP:
      part1 = detailsViewSection(
        translate('modules.myChallenges.yourPersonalBest'),
        parseMillisecondsIntoReadableTime(props.challenge.personalBest),
      );
      part2 = null;
      part5 = (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={styles.showLeaderBoardTextStyle}
            tx={'modules.myChallenges.showLeaderBoard'}
          />

          <View style={styles.toggleSwitchContainerStyle}>
            <Text
              preset={TextPresetStyles.DESCRIPTION}
              text={
                props.shouldShowLeaderBoard
                  ? translate('common.yes')
                  : translate('common.no')
              }
            />
            <ToggleSwitch
              isOn={props.shouldShowLeaderBoard}
              onColor={getPrimaryColor()}
              offColor={color.palette.grey6}
              onToggle={() =>
                props.setShouldShowLeaderBoard(!props.shouldShowLeaderBoard)
              }
            />
          </View>
        </View>
      );

      break;

    case TypeOfChallenges.FAR_OUT:
      part2 = null;
      part3 = (
        <View style={styles.part3ContainerStyle}>
          <PercentageBar
            style={styles.full}
            activePercentage={`${
              completedTimePercentageFarOut >= 0
                ? Math.floor(completedTimePercentageFarOut * 100) / 100
                : 0
            }%`}
            activeBarBackgroundColor={getPrimaryColor()}
            isPercentageTextOutside
            barType={PercentageBarTypes.THIN}
          />

          {props.challenge.screenType === ChallengeScreenTypes.UPCOMING ? (
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={[
                {...styles.secondaryLabelTextStyle, color: getPrimaryColor()},
                styles.daysRemainingTextStyle,
              ]}
              text={daysRemaining}
            />
          ) : (
            <View style={styles.farOutCountDownContainerStyle}>
              <Icon
                icon={ICON_TYPES.COUNTDOWN}
                style={{
                  ...styles.countDownIconStyle,
                  tintColor: getPrimaryColor(),
                }}
              />

              <View style={styles.rowStyle}>
                {getDayTimeComponent(
                  translate('common.days'),
                  farOutDays,
                  true,
                )}
                {getDayTimeComponent(
                  translate('common.hours'),
                  farOutHours,
                  true,
                )}
                {getDayTimeComponent(
                  translate('common.minutes'),
                  farOutMinutes,
                  true,
                )}
                {getDayTimeComponent(
                  translate('common.seconds'),
                  farOutSeconds,
                )}
              </View>
            </View>
          )}
        </View>
      );
      part5 = null;
      break;
  }

  const getDataByScreenType = () => {
    switch (props.challenge.screenType) {
      case ChallengeScreenTypes.COMPLETE:
        return path(['challenge', 'description'], props) ? (
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            text={props.challenge.description}
            style={styles.secondRowDescriptionTextStyle}
          />
        ) : null;

      case ChallengeScreenTypes.OPEN:
        return (
          <View>
            {part4}
            <Text
              preset={TextPresetStyles.DESCRIPTION}
              text={props.challenge.description}
              style={styles.secondRowDescriptionTextStyle}
            />

            <Button
              tx={'modules.myChallenges.join'}
              onPress={() => props.onJoinClick(props.challenge._id)}
              style={styles.joinButtonStyle}
            />
          </View>
        );

      default:
        return (
          <View style={styles.submitUserInfo2ViewStyle}>
            <View style={styles.secondRowPart1Style}>
              {part1}
              {part2}
              {part3}
            </View>
            {!props.isHomeChallenge ? part4 : null}
            {!props.isHomeChallenge ? part5 : null}
          </View>
        );
    }
  };

  return getDataByScreenType();
};
