import { FC, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  Button,
  Text,
  Surface,
  TouchableRipple,
  MD3Colors,
} from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  DatePickerModal,
  TimePickerModal,
  registerTranslation,
} from "react-native-paper-dates";

interface Props {
  onIosChange: (currentDate: Date) => void;
  onAndroidDateChange: (date?: Date) => void;
  onAndroidTimeChange: (params: { hours: number; minutes: number }) => void;
  androidDate: Date;
  androidTime: { hours: number; minutes: number };
}

const DateSelector: FC<Props> = ({
  onIosChange,
  onAndroidDateChange,
  onAndroidTimeChange,
  androidDate,
  androidTime,
}) => {
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  registerTranslation("en", {
    selectSingle: "Select date",
    selectMultiple: "Select dates",
    selectRange: "Select period",
    save: "Save",
    notAccordingToDateFormat: (inputFormat: string) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date: string) => `Must be later than ${date}`,
    mustBeLowerThan: (date: string) => `Must be earlier than ${date}`,
    mustBeBetween: (startDate: string, endDate: string) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: "Day is not allowed",
    previous: "Previous",
    next: "Next",
    typeInDate: "Type in date",
    pickDateFromCalendar: "Pick date from calendar",
    close: "Close",
    hour: "Hour",
    minute: "Minute",
  });

  // Android

  const displayDate = androidDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
  });

  const formatTime = (params: { hours: number; minutes: number }) => {
    const period = params.hours >= 12 ? "PM" : "AM";
    const adjustedHours = params.hours % 12 || 12; // Converts 0 to 12 for midnight
    const formattedMinutes =
      params.minutes < 10 ? `0${params.minutes}` : params.minutes;
    return `${adjustedHours}:${formattedMinutes} ${period}`;
  };

  const displayTime = formatTime(androidTime);

  const onDismissDateAndroid = () => {
    setDateModalVisible(false);
  };

  const onDismissTimeAndroid = () => {
    setTimeModalVisible(false);
  };

  const onDateConfirm = (params: { date?: Date }) => {
    if (params.date) {
      onAndroidDateChange(params.date);
    }
    setDateModalVisible(false);
  };

  const onTimeConfirm = (params: { hours: number; minutes: number }) => {
    onAndroidTimeChange(params);
    console.log(params);
  };

  // iOS
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || new Date();
    onIosChange(date);
  };

  return (
    <TouchableRipple>
      <Surface style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text variant="titleMedium">Date & Time</Text>
        </View>
        <View style={styles.selectionDetailsContainer}>
          {Platform.OS === "ios" && (
            <DateTimePicker
              value={new Date()}
              mode="datetime"
              onChange={onDateChange}
            />
          )}
          {Platform.OS === "android" && (
            <>
              <Button
                onPress={() => setDateModalVisible(true)}
                uppercase={false}
                mode="outlined"
              >
                {displayDate}
              </Button>
              <Button
                onPress={() => setTimeModalVisible(true)}
                uppercase={false}
                mode="outlined"
              >
                {displayTime}
              </Button>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={dateModalVisible}
                onDismiss={onDismissDateAndroid}
                date={androidDate || new Date()}
                onConfirm={onDateConfirm}
                presentationStyle="overFullScreen"
              />
              <TimePickerModal
                onDismiss={onDismissTimeAndroid}
                onConfirm={onTimeConfirm}
                visible={timeModalVisible}
                hours={androidTime.hours}
                minutes={androidTime.minutes}
              />
            </>
          )}
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectionDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedItemText: {
    color: MD3Colors.secondary60,
    marginRight: 4,
  },
});

export default DateSelector;
