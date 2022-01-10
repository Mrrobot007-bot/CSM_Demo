import React from 'react';
import {path} from 'ramda';
import {View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';

import {translate} from '../../../i18n';
import {images} from '../../../utility';
import {ChallengesStyles as styles} from './challenges-styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {ChallengeType} from '../../../utility/object-types/challenge';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the InvitedBy Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * InvitedByComponent - component used to render the invited by section in challenge component
 */
export const InvitedByComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  const isInvitedBy =
    path(['challenge', 'invitedByUserId'], props) !==
    path(['user', '_id'], userReducer);

  return (
    <View style={styles.userInviteStyle}>
      <View style={styles.rowStyle}>
        <FastImageModified
          url={props.challenge.invitedByImageUrl}
          style={styles.userDisplayStyle}
          defaultImage={images.user}
        />
        <Text
          preset={TextPresetStyles.CAPTION_3}
          style={[styles.secondaryLabelTextStyle, styles.grayTextStyle]}
          text={
            isInvitedBy
              ? `${translate('modules.Dashboard.invitedBy')} ${
                  props.challenge.invitedBy
                }`
              : `${translate('modules.myChallenges.createdBy')} ${`${translate(
                  'common.you',
                )}`}`
          }
        />
      </View>
      <View style={styles.walkRunningViewStyle}>
        {props.challenge.includedActivities.map(activity => {
          return (
            <FastImageModified
              url={activity.icon}
              style={styles.activityIconStyle}
              defaultImage={null}
              key={activity._id}
            />
          );
        })}
      </View>
    </View>
  );
};
