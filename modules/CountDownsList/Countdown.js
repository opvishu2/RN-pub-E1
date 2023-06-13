import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const CountDown = () => {

    const arr = Array.apply(null, Array(9)).map(function () { })
    const [start, setStart] = React.useState(0)
    const [time, setTime] = React.useState(start)
    const [active, setStatus] = React.useState(false)
    const [text, setText] = React.useState(0)
    const launch = React.useRef()

    const handleStart = () => {
        if(!active){
            setStatus(true)
            let countDown = time
            launch.current = setInterval(() => {
                countDown = countDown - 1
                setTime(countDown)
                if (countDown <= 0) {
                    clearInterval(launch.current)
                }
            }, 1000)
        }
    }

    React.useEffect(() => () => { clearInterval(launch.current) }, [])

    function handleClear() {
        clearInterval(launch.current)
        setStatus(false)
        setStart(0)
        setText(0)
        setTime(0)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <View>
                    <Text numberOfLines={1} style={styles.time}>{time}</Text>
                </View>
                <TextInput
                    value={text}
                    editable={!active}
                    keyboardType="numeric"
                    textAlignVertical="center"
                    onChangeText={(ch) => { setText(ch); setStart(ch * 1 ? ch * 1 : 0) }}
                    placeholder='enter time in seconds'
                    placeholderTextColor={"black"}
                    style={styles.input} />
                <View style={styles.btnContainer}>
                    <TouchableOpacity disabled={active || !start} style={styles.btn} onPress={() => { setText(0); setTime(start) }} >
                        <Text style={styles.btnText}>Set Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={active || !start || !time} style={styles.btn}
                        onPress={handleStart}
                    ><Text style={styles.btnText}>Start</Text></TouchableOpacity>
                    <TouchableOpacity disabled={!active} style={styles.btn} onPress={handleClear} >
                        <Text style={styles.btnText}>Clear Time</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: "black", flex: 1, justifyContent: "center" },
    content: { width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 2 },
    btnContainer: { width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", },
    btn: { backgroundColor: "gray", borderRadius: 5, marginLeft: 10, marginTop: 10 },
    btnText: { color: "#FFF", fontSize: 20, padding: 5 },
    time: { fontSize: 50, color: "#FFFFFF", marginTop: 50, marginBottom: 10 },
    input: { backgroundColor: "gray",color:"#FFF", width: "70%" },
});


export default CountDown