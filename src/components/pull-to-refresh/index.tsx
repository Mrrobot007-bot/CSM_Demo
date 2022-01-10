import React, {FC, ReactElement} from 'react';
import {ViewStyle, RefreshControl, ScrollView, View} from 'react-native';

import {LastSyncComponent} from '../last-synced';

/**
 * An Interface for possible props for the PullToRefresh component
 */
interface PullToRefreshProps {
  /**
   * Used to pass the children data to the props
   */
  children?: View | object;

  /**
   * Used to call the event on refresh
   */
  onRefresh: () => void;
  /**
   * Used to close the refresh controller control event
   */
  refreshing?: boolean;

  /**
   * An optional style override useful for to provide style to component
   */
  style?: ViewStyle | object;
}

/**
 * PullToRefresh - A component which provide pull to refresh functionality
 */
const PullToRefresh: FC<PullToRefreshProps> = (
  props: PullToRefreshProps,
): ReactElement => {
  return (
    <ScrollView
      style={props.style}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={props.style}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }>
      <LastSyncComponent />

      <View style={{flex: 1}}>{props.children}</View>
    </ScrollView>
  );
};

export {PullToRefresh};
