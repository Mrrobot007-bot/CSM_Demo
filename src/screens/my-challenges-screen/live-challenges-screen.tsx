import {path} from 'ramda';
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, RootStateOrAny, useSelector} from 'react-redux';

import {translate} from '../../i18n';
import {Button} from '../../components/button';
import {getLiveChallenges} from '../../utility';
import {Challenges} from './components/challenges';
import {ButtonPreset} from '../../components/button';
import {MyChallengesScreenStyles as styles} from './styles';
import {SectionTitle} from '../../components/section-title';
import {Text, TextPresetStyles} from '../../components/text';
import {ChallengeType} from '../../utility/object-types/challenge';

/**
 * An Interface for possible props for the LiveChallenges Screen
 */
interface ILiveChallengesProps {
  /**
   * A prop used to provide the of live challenges
   */
  liveChallenges: Array<ChallengeType>;

  /**
   * A prop used to determine data loading from server
   */
  isDataLoading?: boolean;

  /**
   * A prop used to provide the of upcoming challenges
   */
  upcomingChallenges: Array<ChallengeType>;
}

/**
 * LiveChallenges - A screen used to provide the list of live and upcoming challenges
 */
const LiveChallenges = (props: ILiveChallengesProps) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  return (
    <ScrollView style={styles.liveChallengeMainContainer}>
      {(props.liveChallenges && props.liveChallenges.length) ||
      (props.upcomingChallenges && props.upcomingChallenges.length) ? (
        <Challenges challenges={props.liveChallenges} />
      ) : path(['loading'], props) || props.isDataLoading ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'modules.crwc.noCrwcCounter'}
          />
          <Button
            onPress={() => {
              getLiveChallenges(userReducer, true);
            }}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.retry')}
          />
        </View>
      )}

      {props.upcomingChallenges && props.upcomingChallenges.length ? (
        <View>
          <SectionTitle
            tx={'common.upcoming'}
            style={styles.mainTitleContainerStyle}
          />

          <Challenges challenges={props.upcomingChallenges} />
        </View>
      ) : null}
      <View style={styles.boostrDummy} />
    </ScrollView>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.apiReducer.loading,
  };
}

export const LiveChallengesScreen = connect(
  mapStateToProps,
  {},
)(LiveChallenges);
