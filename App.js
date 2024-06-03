import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Pressable, ScrollView } from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

const AVAILABLE_TIMES = [
  { id: 1, hour: '07:00 PM', status: 'available' },
  { id: 2, hour: '07:15 PM', status: 'unavailable' },
  { id: 3, hour: '07:30 PM', status: 'available' },
  { id: 4, hour: '08:30 PM', status: 'unavailable' },
  { id: 5, hour: '08:45 PM', status: 'available' },
  { id: 6, hour: '09:00 PM', status: 'available' },
]

const PRIMARY_COLOR = "#6567ef"

export default function App() {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [timeSelected, setTimeSelected] = useState(null);

  function onDayPress(day) {
    setSelected(day.dateString);
  }

  const marked = {
    [selected]: {
      selected: true,
    }
  };

  return (
    <>
      <StatusBar style="auto" />

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Appointment Booking</Text>

          <View style={styles.wrapper}>
            <Calendar
              theme={{ 
                todayTextColor: PRIMARY_COLOR,
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textMonthFontSize: 18,
                textDayFontWeight: 'bold',
                textDayFontSize: 14,
                selectedDayBackgroundColor: PRIMARY_COLOR,
                selectedDayTextColor: '#ffffff',
              }}
              enableSwipeMonths
              current={INITIAL_DATE}
              minDate={INITIAL_DATE}
              style={styles.calendar}
              onDayPress={onDayPress}
              markedDates={marked}
              renderArrow={direction => {
                return (
                  <View style={styles.calendarButton}>
                    <Feather name={`chevron-${direction}`} size={24} color={PRIMARY_COLOR} />
                  </View>
                )
              }}
            />

            <Text style={styles.sectionTitle}>Available Time</Text>

            <View style={styles.availableTimeList}>
              {AVAILABLE_TIMES.map(({ id, hour, status }) => {
                const isTimeEnabled = status === 'available' 
                const isTimeSelected = timeSelected === hour

                const defaultBg = isTimeEnabled ? '#e9e5fe' : '#ebe9f6'
                const defaultColor = isTimeEnabled ? '#222222' : '#aeaeb0'

                return (
                  <Pressable 
                    key={id} 
                    style={[
                      styles.availableTimeButton, 
                      { backgroundColor: isTimeSelected ? PRIMARY_COLOR : defaultBg }
                    ]}
                    onPress={() => setTimeSelected(hour)}
                    disabled={!isTimeEnabled}
                  >
                    <Text 
                      style={[
                        styles.availableTimeButtonText, 
                        { color: isTimeSelected ? '#ffffff' : defaultColor }
                      ]}>
                      {hour}
                    </Text>
                  </Pressable>
                )
              })}
            </View>

            <Pressable style={styles.ConfirmScheduleButton}>
              <Text style={styles.ConfirmScheduleButtonText}>Confirm Schedule</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  title: {
    marginHorizontal: 'auto',
    fontWeight: 'bold',
    marginVertical: 24,
    fontSize: 18,
  },
  wrapper: {
    paddingHorizontal: 24
  },
  calendar: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  calendarButton: {
    backgroundColor: '#e9e5fe',
    padding: 8,
    borderRadius: 100,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginVertical: 24,
    fontSize: 16,
  },
  availableTimeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 64,
  },
  availableTimeButton: {
    width: '30%',
    marginBottom: 6,
    paddingVertical: 16,
    borderRadius: 999,
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  availableTimeButtonText: {
    fontWeight: 'bold',
    fontSize: 12
  },
  ConfirmScheduleButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 22,
    borderRadius: 999,
    alignItems: 'center'
  },
  ConfirmScheduleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});