import React, {FC, ReactElement} from 'react';
import {View} from 'react-native';

import {translate} from '../../i18n';
import {InfoComponent} from '../info';
import {Text, TextPresetStyles} from '../text';
import {PercentageBar} from '../percentage-bar';
import {INFO_CONTENT_ID_TYPES} from '../../utility';
import {getPrimaryColor} from '../../utility';
import {ActivityIndicatorStyles as styles} from './styles';
import {ShareViewComponent} from '../../screens/my-challenges-screen/components/share-view-component';

/**
 * An Interface for possible props for the YourActivity component
 */
interface activityProps {
  /**
   * Current steps count of the Discount View
   */
  currentSteps?: string;
  /**
   * Weekly steps count of the Discount View
   */
  weeklySteps?: string;

  /**
   * Steps progress Bar Color
   */
  stepsBarColor?: string;

  /**
   * your weekly steps count of the Discount View
   */
  stepsPercentage?: string;

  /**
   * Time progress Bar Color
   */

  timeBarColor?: string;

  /**
   * Time progress Bar Color
   */

  timePercentage?: string;

  /**
   * i-content id
   */

  infoContentId?: INFO_CONTENT_ID_TYPES;
}

/**
 *  Used to show the your activity at home and gaols and reward section
 */
export const YourActivity: FC<activityProps> = (
  props: activityProps,
): ReactElement => {
  return (
    <View style={styles.goalContainer}>
      {props.weeklySteps ? (
        <ShareViewComponent>
          <View style={styles.mainContainerStyle}>
            <View style={styles.goalActivity}>
              <View style={styles.goalActivityInner}>
                <Text
                  preset={TextPresetStyles.MINI_FONT}
                  style={[
                    styles.secondaryLabelTextStyle,
                    {color: getPrimaryColor()},
                    styles.yourGoalTextView,
                  ]}
                  tx={'modules.goalsRewards.youGoal'}
                />
                <View style={styles.stepsCountView}>
                  <Text
                    preset={TextPresetStyles.TITLE}
                    style={styles.secondaryLabelTextStyle}
                    text={props.weeklySteps}
                  />
                  <Text
                    preset={TextPresetStyles.MINI_FONT_REGULAR}
                    style={[styles.secondaryLabelTextStyle, styles.stepsText]}
                    tx={'common.steps'}
                  />
                  <InfoComponent
                    style={{
                      ...styles.tildeIconView,
                      tintColor: getPrimaryColor(),
                    }}
                    infoContentId={props.infoContentId}
                  />
                </View>
              </View>
              <View style={styles.goalActivityMiddleLine} />
              <View style={styles.goalActivityInner}>
                <Text
                  preset={TextPresetStyles.MINI_FONT}
                  style={[
                    styles.secondaryLabelTextStyle,
                    styles.yourGoalTextView,
                  ]}
                  tx={'modules.goalsRewards.yourCurrentSteps'}
                />
                <View style={styles.stepsCountView}>
                  <Text
                    preset={TextPresetStyles.TITLE}
                    style={styles.secondaryLabelTextStyle}
                    text={props.currentSteps}
                  />
                  <Text
                    preset={TextPresetStyles.MINI_FONT_REGULAR}
                    style={[styles.secondaryLabelTextStyle, styles.stepsText]}
                    tx={'common.steps'}
                  />
                </View>
              </View>
            </View>

            <PercentageBar
              style={styles.progressView}
              activePercentage={props.stepsPercentage}
              activeBarBackgroundColor={props.stepsBarColor}
              text={translate('modules.goalsRewards.stepsInCap')}
            />

            <PercentageBar
              style={styles.progressViewTime}
              activePercentage={props.timePercentage}
              activeBarBackgroundColor={props.timeBarColor}
              text={translate('common.time')}
            />
          </View>
        </ShareViewComponent>
      ) : (
        <View style={styles.noDataContainerStyle}>
          <Text
            style={styles.centerTextStyle}
            text={translate('modules.errorMessages.noActivityDataAvailable')}
          />
        </View>
      )}
    </View>
  );
};
