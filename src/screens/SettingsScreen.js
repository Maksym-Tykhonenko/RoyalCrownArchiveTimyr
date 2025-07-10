import React from 'react';
import {View, Text, StyleSheet, Image, Switch, TouchableOpacity, ScrollView, Alert, Linking} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../redux/slices/themeSlice';

const SettingsScreen = ({ navigation }) => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();
    const isDarkMode = theme === 'dark';
    const localStyles = styles(isDarkMode);


    const toggleSwitch = () => {
        dispatch(toggleTheme());
    };

    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Error", "Can't open this URL: " + url);
        }
    };


    return (
        <ScrollView style={localStyles.container}>
            <Text style={localStyles.header}>SETTINGS</Text>

            <Image
                source={require('../assets/img/Img.png')}
                style={localStyles.image}
                resizeMode="contain"
            />

            <View style={localStyles.item}>
                <Text style={localStyles.label}>Interface theme</Text>
                <Switch
                    trackColor={{ false: '#ccc', true: '#C7B08F' }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#ccc"
                    onValueChange={toggleSwitch}
                    value={isDarkMode}
                />
            </View>

            <TouchableOpacity style={localStyles.item} onPress={() => openLink('https://www.termsfeed.com/live/d7e18217-35c9-4b07-9a08-6c983745cb55')}>
                <Text style={localStyles.label}>Terms of use</Text>
                <Text style={localStyles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.item} onPress={() => openLink('https://www.termsfeed.com/live/d7e18217-35c9-4b07-9a08-6c983745cb55')}>
                <Text style={localStyles.label}>Privacy policy</Text>
                <Text style={localStyles.arrow}>›</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = (isDarkMode) => StyleSheet.create({
    container: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 24,
        letterSpacing: 1,
        fontFamily: 'Aboreto',
        fontWeight: '600',
        marginBottom: 30,
    },
    image: {
        width: '100%',
        height: 180,
        marginBottom: 30,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: isDarkMode ? '#222' : '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 18,
    },
    label: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16,
    },
    arrow: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 22,
        fontWeight: '300',
    },
});

export default SettingsScreen;
