import React from 'react';
import {path} from 'ramda';
import moment from 'moment';
import {View} from 'react-native';

import {translate} from '../../../i18n';
import {spacingPresets} from '../../../theme';
import {detailsViewSection} from './challenges';
import {
  ChallengeType,
  TypeOfChallenges,
} from '../../../utility/object-types/challenge';
import {isSelectedUnitKM, kmToMiles} from '../../../utility';
import {ChallengesStyles as styles} from './challenges-styles';

/**
 * An Interface for possible props for the FirstRowDetails Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * FirstRowDetailsComponent - component used to render the first row of challenge component
 */
export const FirstRowDetailsComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  return (
    <View style={styles.submitUserInfoViewStyle}>
      <View style={styles.secondRowPart1Style}>
        {props.challenge.challengeType !== TypeOfChallenges.FAR_OUT &&
          detailsViewSection(
            translate('modules.Dashboard.total'),
            isSelectedUnitKM()
              ? `${props.challenge.totalDistanceInKm} ${translate('common.km')}`
              : `${kmToMiles(props.challenge.totalDistanceInKm)} ${translate(
                  'common.mile',
                )}`,
          )}
        {detailsViewSection(
          translate('modules.Dashboard.startDate'),
          moment(new Date(path(['challenge', 'startDate'], props)))
            .format('DD MMM, YYYY')
            .toString(),
        )}

        {props.challenge.challengeType === TypeOfChallenges.MEET_UP
          ? detailsViewSection(
              translate('modules.myChallenges.timeDaily'),
              moment(new Date(parseInt(`${props.challenge.timeDaily}`)))
                .format('hh:mm a')
                .toString(),
            )
          : detailsViewSection(
              translate('modules.Dashboard.endDate'),
              moment(new Date(props.challenge.endDate))
                .format('DD MMM, YYYY')
                .toString(),
              null,
              props.challenge.challengeType === TypeOfChallenges.FAR_OUT
                ? styles.farOutEndDateContainerStyle
                : null,
            )}
      </View>
      {props.challenge.challengeType === TypeOfChallenges.MEET_UP &&
        detailsViewSection(
          translate('common.location'),
          path(['address'], props.challenge),
          null,
          {marginTop: spacingPresets.smaller},
        )}
    </View>
  );
};
