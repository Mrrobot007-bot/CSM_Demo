import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import ImageSlider from 'react-native-image-slider';
import {View, TouchableOpacity, ImageBackground} from 'react-native';

import {
  images,
  defaultAlert,
  getPrimaryColor,
  CREATE_CHALLENGES_TYPE,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {
  CarouselType,
  MasterChallengeListType,
} from '../../../utility/object-types/auth-response';
import {RelayChallengesStyles as styles} from './styles';
import {getApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';

/**
 * An Interface for possible props for the Common Team Activity Screen
 */
interface ActivityProps {
  /**
   * It is used to set selected the distance
   */
  challengeDistance?: any;

  /**
   * It is used to set the challenge name
   */
  challengeName?: string;

  /**
   * It is used to provide the challenge type
   */
  challengeType: CREATE_CHALLENGES_TYPE;

  /**
   * It is used to for any navigation
   */
  navigation: any;

  /**
   * It is used to set the distance in the field
   */
  setDistance: (distance: string) => void;
  /**
   * It is used to set the challenge name in the field
   */
  setChallengeName: (challengeName: string) => void;
}

/**
 * ActivityScreen - A component used the image carousel while create challenge
 */
export const ActivityScreen = (props: ActivityProps) => {
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedDistancePartPosition, setSelectedDistancePartPosition] =
    useState(0);
  const [masterChallengeList, setMasterChallengeList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDistanceList();
  }, []);

  const getDistanceList = async () => {
    try {
      const apiResponse = await dispatch(
        getApiCall(
          API_URLS.MASTER_CHALLENGES_LIST,
          props.navigation,
          getDistanceList,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<MasterChallengeListType> =
          path(['data'], apiResponse) || [];

        const dataItem: MasterChallengeListType =
          data.find(item => item.name === props.challengeType) || null;

        const list: Array<CarouselType> = path(['carousel'], dataItem) || [];

        list.forEach(item => {
          if (
            item.name === props.challengeName &&
            item.distance == props.challengeDistance
          ) {
            setSelectedDistance(item);
            props.setDistance(`${path(['distance'], item)}`);
            props.setChallengeName(`${path(['name'], item)}`);
          }
        });
        setMasterChallengeList(list);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const getSelectDistanceItem = (
    item: any,
    isSecondaryItem: boolean = false,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDistance(item);
          props.setDistance(`${path(['distance'], item)}`);
          props.setChallengeName(`${path(['name'], item)}`);
        }}
        style={isSecondaryItem && styles.secondaryDistanceItemStyle}>
        <ImageBackground
          source={{uri: path(['image'], item)}}
          style={[styles.selectedDistanceItemStyle]}
          imageStyle={styles.selectedDistanceItemImageStyle}>
          {path(['_id'], item) === path(['_id'], selectedDistance) && (
            <View
              style={[
                styles.selectedDistanceSelectionOverlay,
                {backgroundColor: getPrimaryColor(0.6)},
              ]}>
              <Icon
                icon={ICON_TYPES.CHECK_CIRCLE_FILLED}
                style={styles.selectedDistanceIconStyle}
              />
            </View>
          )}
          <ImageBackground
            style={styles.selectedDistanceTextItemContainer}
            source={images.shadowBack}
            imageStyle={styles.selectedDistanceTextItemImageContainer}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={styles.ActivityTextHeadingView}
              text={item.name}
            />
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={styles.ActivityTextDistanceView}
              text={item.distance}
            />
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const getMasterChallengeUpdatedList = () => {
    const distanceList: any = [];
    let distanceSubList: any = [];
    masterChallengeList.map((item, index) => {
      distanceSubList.push(item);
      if ((index + 1) % 4 === 0) {
        distanceList.push(distanceSubList);
        distanceSubList = [];
      }
    });
    return distanceList;
  };
  return (
    <View>
      <View style={styles.activityTextContainer}>
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={{
            color: color.textInputPlaceHolderText,
          }}
          tx={'modules.myChallenges.selectDistance'}
        />

        <View style={styles.rowStyle}>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={{
              color: getPrimaryColor(),
            }}
            text={`${selectedDistancePartPosition + 1}`}
          />
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={{
              color: color.textInputPlaceHolderText,
            }}
            text={` ${translate('common.of')} ${
              getMasterChallengeUpdatedList().length
            }`}
          />
        </View>
      </View>
      <ImageSlider
        loopBothSides={false}
        style={styles.imageSliderStyle}
        onPositionChanged={setSelectedDistancePartPosition}
        images={getMasterChallengeUpdatedList().map((item: any) => {
          return item;
        })}
        customSlide={({index, item}: any) =>
          item &&
          item.length && (
            <View key={index}>
              <View style={styles.rowStyle}>
                {getSelectDistanceItem(item[0])}
                {item.length > 1 && getSelectDistanceItem(item[1], true)}
              </View>
              {item.length > 2 && (
                <View style={styles.selectedDistanceRow2Style}>
                  {getSelectDistanceItem(item[2])}
                  {item.length > 3 && getSelectDistanceItem(item[3], true)}
                </View>
              )}
            </View>
          )
        }
        customButtons={(position: number) => (
          <View style={styles.selectDistanceDotContainerStyle}>
            {getMasterChallengeUpdatedList().map((item: any, index: number) => {
              return (
                <View
                  style={[
                    styles.selectDistanceDotStyle,
                    {
                      backgroundColor:
                        index === position
                          ? getPrimaryColor()
                          : getPrimaryColor(0.2),
                    },
                  ]}
                />
              );
            })}
          </View>
        )}
      />
      <Text
        preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
        style={styles.chooseOwnTextStyle}
        tx={'modules.myChallenges.chooseOwnDistance'}
      />
    </View>
  );
};
