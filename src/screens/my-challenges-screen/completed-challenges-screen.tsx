import React from 'react';
import {path} from 'ramda';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

import {translate} from '../../i18n';
import {Button} from '../../components/button';
import {Challenges} from './components/challenges';
import {ButtonPreset} from '../../components/button';
import {MyChallengesScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the CompletedChallenges Screen
 */
interface ICompletedChallengesProps {
  /**
   * A prop used to determine is data loading or not from server
   */
  isDataLoading?: boolean;

  /**
   * A prop used to provide the callback when user reached end of list
   */
  onListEndReached?: () => void;

  /**
   * A prop used to provide the callback to refetch data from server if it fails earlier
   */
  onRetryClick?: (shouldOverrideCache: boolean) => void;
}

/**
 * CompletedChallenges - A section oof my challenges
 * which have a list of completed challenges in which user enrolled
 */
const CompletedChallenges = (props: ICompletedChallengesProps) => {
  return (
    <ScrollView style={styles.openChallengeMainContainer}>
      {path(['completedChallenges'], props) &&
      path(['completedChallenges', 'length'], props) ? (
        <Challenges
          challenges={path(['completedChallenges'], props)}
          onListEndReached={() => props.onListEndReached()}
          isDataLoading={props.isDataLoading}
        />
      ) : path(['loading'], props) || props.isDataLoading ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'modules.myChallenges.noLiveChallenges'}
          />

          <Button
            onPress={() => props.onRetryClick(true)}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.retry')}
          />
        </View>
      )}
      <View style={styles.boostrDummy} />
    </ScrollView>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.apiReducer.loading,
    completedChallenges: state.userReducer.user.completedChallenges,
  };
}

export const CompletedChallengesScreen = connect(
  mapStateToProps,
  {},
)(CompletedChallenges);
