import React from 'react';
import {path} from 'ramda';
import {useState, useRef} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {TouchableOpacity, View, StatusBar} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {OnboardingScreen1} from './onboardingScreen1';
import {OnboardingScreen2} from './onboardingScreen2';
import {OnboardingScreen3} from './onboardingScreen3';
import {OnboardingScreen4} from './onboardingScreen4';
import {OnboardingScreen5} from './onboardingScreen5';
import {store} from '../../redux/store/configureStore';
import {UserType} from '../../utility/object-types/user';
import {addUser} from '../../redux/actions/user-actions';
import {OnboardingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {RegisterDataResponse} from '../../utility/object-types/auth-response';

/**
 * An Interface for possible props for the onboarding component
 */
interface OnboardingsScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * Prop used to provide the stuff data which send on screen
   */
  route: any;
}

/**
 * OnboardingScreen - A main onboarding screen which have 5 nested screens
 */
const OnboardingScreen = (props: OnboardingsScreenProps) => {
  const [signUpUserData] = useState<RegisterDataResponse>(
    props.route.params.data,
  );
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const dispatch = useDispatch();
  const newRef = useRef(null);

  const slides = [
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
    {
      key: 4,
    },
    {
      key: 5,
    },
  ];

  /**
   *  rendering the slides of the onboarding
   * @param param
   * @returns
   */
  const renderOnboardingItem = ({item}: any) => {
    switch (item.key) {
      case 1:
        return <OnboardingScreen1 />;
      case 2:
        return (
          <OnboardingScreen2
            navigation={props.navigation}
            onNextPress={onNextClick}
            userData={signUpUserData}
          />
        );
      case 3:
        return <OnboardingScreen3 />;
      case 4:
        return <OnboardingScreen4 />;
      case 5:
        return <OnboardingScreen5 onLetsGoClick={onLetsGoClick} />;

      default:
        return <OnboardingScreen1 />;
    }
  };

  /**
   * function is used to submit the form and move to home page
   */
  const onLetsGoClick = () => {
    let data = user;
    const storeData: any = path(['userReducer', 'user'], store.getState());
    data = {
      ...storeData,
      onboarding: true,
    };
    dispatch(addUser(data));
  };

  /**
   * function used to skip the intro sliders
   */
  const onSkipClick = () => {
    newRef.current.goToSlide(slides.length - 1);
    setCurrentSlideIndex(slides.length - 1);
  };

  /**
   * function is used to move to the next screen
   */
  const onNextClick = () => {
    if (currentSlideIndex < slides.length - 1) {
      newRef.current.goToSlide(currentSlideIndex + 1);
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <View style={styles.full}>
      <StatusBar hidden />
      <AppIntroSlider
        ref={newRef}
        data={slides}
        renderItem={renderOnboardingItem}
        scrollEnabled={currentSlideIndex !== 1}
        onSlideChange={index => setCurrentSlideIndex(index)}
        showSkipButton
        showDoneButton={false}
        renderPagination={currentSlide => {
          return (
            <View style={styles.sliderPaginationContainerStyle}>
              {currentSlide > 1 && currentSlide < slides.length - 1 ? (
                <TouchableOpacity
                  onPress={onSkipClick}
                  style={styles.sliderLabelContainerStyle}>
                  <Text
                    preset={TextPresetStyles.HEADLINE_DARK}
                    style={styles.sliderLabelStyle}
                    tx={'common.skip'}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.sliderLabelContainerStyle} />
              )}
              <View style={styles.rowStyle}>
                {currentSlideIndex !== 1 &&
                  slides.map((item, index) => {
                    return (
                      <View
                        key={item.key}
                        style={
                          index === currentSlide
                            ? styles.sliderDotActiveStyle
                            : styles.sliderDotStyle
                        }
                      />
                    );
                  })}
              </View>
              {currentSlide !== 1 && currentSlide < slides.length - 1 ? (
                <TouchableOpacity
                  onPress={onNextClick}
                  style={styles.sliderLabelContainerStyle}>
                  <Text
                    preset={TextPresetStyles.HEADLINE_DARK}
                    style={[
                      styles.sliderLabelStyle,
                      styles.sliderLabelTextRight,
                    ]}
                    tx={'common.next'}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.sliderLabelContainerStyle} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export {OnboardingScreen};
