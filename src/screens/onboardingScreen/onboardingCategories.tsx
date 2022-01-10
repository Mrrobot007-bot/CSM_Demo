import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState} from 'react';

import {
  OnBoardingCategoryType,
  OnBoardingCategoryValueType,
} from '../../utility/object-types/auth-response';
import {color, spacingPresets} from '../../theme';
import {OnboardingScreenStyles as styles} from './styles';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';

/**
 * An Interface for possible props for the onboarding categories component
 */
interface IOnBoardingCategoriesProps {
  /**
   * A prop used to draw list of categories
   */
  categoriesAndValues: Array<OnBoardingCategoryType>;

  /**
   * A prop used check if other dropdown in patent component opened or not
   */
  isOtherDropDownOpened?: boolean;

  /**
   * A prop used to provide callback to set other dropdown states
   */
  otherDropDownSet?: () => void;

  /**
   * A prop used to provide list of selected values of categories dropdown
   */
  selectedItemList: Array<any>;

  /**
   * A prop used to provide callback to set other categories states
   */
  setSelectedItemList?: (item: Array<any>) => void;

  /**
   * A prop used to determine the category label text
   */
  topPlaceholderTextColor?: string;
}

/**
 * OnBoardingCategories - A component which provide a
 * list of dynamic categories need to filled by user
 */
export const OnBoardingCategories = (props: IOnBoardingCategoriesProps) => {
  const dropDownList = props.categoriesAndValues.map(item => {
    return {
      itemId: item._id,
      status: false,
    };
  });

  const [dropDownSet, setDropDownSet] = useState(dropDownList);

  React.useEffect(() => {
    setDropDownSet(
      props.categoriesAndValues.map(item => {
        return {
          itemId: item._id,
          status: false,
        };
      }),
    );
  }, [path(['categoriesAndValues'], props)]);

  React.useEffect(() => {
    if (path(['isOtherDropDownOpened'], props)) {
      setDropDownSet(dropDownList);
    }
  }, [path(['isOtherDropDownOpened'], props)]);

  return props.categoriesAndValues && props.categoriesAndValues.length ? (
    <View style={{marginBottom: spacingPresets.small}}>
      {props.categoriesAndValues.map(category => {
        const values = category.values.map((e: OnBoardingCategoryValueType) => {
          return {label: e.name, value: e._id};
        });
        return (
          <OnBoardingCategoryItem
            values={values}
            name={category.name}
            id={category._id}
            dropDownSet={dropDownSet}
            setDropDownSet={setDropDownSet}
            selectedItemList={props.selectedItemList}
            setSelectedItemList={props.setSelectedItemList}
            otherDropDownSet={props.otherDropDownSet}
            topPlaceholderTextColor={props.topPlaceholderTextColor}
          />
        );
      })}
    </View>
  ) : null;
};

const OnBoardingCategoryItem = (props: any) => {
  const selectedDropdownValue = props.dropDownSet.find(
    (item: any) => item.itemId === props.id,
  );

  const selectedItem = props.selectedItemList.find(
    (item: any) => path(['category_id'], item) === path(['id'], props),
  );
  const [selectedValue, setSelectedValue] = useState<string>(
    path(['value_id'], selectedItem) || null,
  );

  const [isItemOpener, setIsItemOpener] = useState(
    path(['status'], selectedDropdownValue) || false,
  );

  /**
   * function to load the intinal data of the drop down
   */
  React.useEffect(() => {
    const selectedDropdownUpdatedValue = props.dropDownSet.find(
      (item: any) => item.itemId === props.id,
    );
    setIsItemOpener(path(['status'], selectedDropdownUpdatedValue) || false);
  }, [path(['dropDownSet'], props)]);

  /**
   *  function for opening the drop down
   * @param value
   */
  const onSetIsOpenPicker = (value: boolean) => {
    props.otherDropDownSet();
    props.setDropDownSet(
      props.dropDownSet.map((item: any) => {
        return {
          ...item,
          status: item.itemId === props.id ? !isItemOpener : false,
        };
      }),
    );
  };
  return (
    <DefaultDropDownPicker
      value={selectedValue}
      dropDownItems={props.values}
      isOpenPicker={isItemOpener}
      setIsOpenPicker={onSetIsOpenPicker}
      topPlaceholderText={`${props.name}*`}
      topPlaceholderTextColor={props.topPlaceholderTextColor || color.textLight}
      onSetValue={text => {
        setSelectedValue(text);
        const selectedItemList = props.selectedItemList.map((item: any) => {
          return {
            ...item,
            value_id: item.category_id === props.id ? text : item.value_id,
          };
        });
        props.setSelectedItemList(selectedItemList);
      }}
      isRequired
      style={styles.formInputStyle}
    />
  );
};
