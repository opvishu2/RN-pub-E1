import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import { Select } from 'native-base'

const TimezoneClock = () => {
  const [timezone, setTimeZone] = React.useState("IST")
  const [ts, setTs] = React.useState(null)
  let launch = null
  let count = ts

  const zones = {
    "IST": { url: "http://worldtimeapi.org/api/timezone/", tz: "Asia/Kolkata" },
    "PST": { url: "http://worldtimeapi.org/api/timezone/", tz: "America/Los_Angeles" }
  }

  React.useEffect(() => {
    getTime()
    return () => { clearInterval(launch) }
  }, [])

  const getTime = (zone = timezone) => {
    if (launch) { clearInterval(launch) }
    axios.get(zones[zone].url + zones[zone].tz)
      .then((res) => {
        count = res.data.unixtime
        Timer()
      })
      .catch((err) => { alert("Something went wrong ! ") })
  }

  const Timer = () => { launch = setInterval(() => { count++; setTs(count) }, 1000) }

  return (
    <SafeAreaView style={styles.container}>
      {ts && <View style={styles.box}>
        <Text numberOfLines={2} style={styles.time}>{moment.unix(ts).tz(zones[timezone].tz).format("DD MM YYYY h:mm:ss A")}</Text>

        <Select
          borderWidth={0} width="25%" placeholder={Object.keys(zones)[0]} style={{ color: "#FFFFFF" }}
          onValueChange={(itemValue, itemIndex) => { getTime(itemValue); setTimeZone(itemValue) }}
        >
          {Object.keys(zones).map((el, idx) => <Select.Item label={el} value={el} />)}
        </Select>
      </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "black", flex: 1 },
  box: {justifyContent: "center", alignItems: "center", width: "100%", height: "100%", },
  time: { fontSize: 20, color: "#FFFFFF" },
});

export default TimezoneClock