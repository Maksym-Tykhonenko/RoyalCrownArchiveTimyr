import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/slices/themeSlice';

const DynastyCard = ({fullItem, isDarkMode}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles(isDarkMode).card} onPress={() => navigation.navigate('EventMoreScreen', {fullItem})}>
            <Image source={{uri: fullItem.image}} style={styles(isDarkMode).image} />
            <View style={styles(isDarkMode).textContainer}>
                <Text style={styles(isDarkMode).name}>{fullItem.eventName}</Text>
                <Text style={styles(isDarkMode).meta}>{fullItem.region}</Text>
            </View>
        </TouchableOpacity>
    );
};

const EventsScreen = ({navigation}) => {
    const events = useSelector(state => state.events.events);
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    return (
        <View style={styles(isDarkMode).container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={styles(isDarkMode).header}>Royal events</Text>
                {/*<TouchableOpacity onPress={() => navigation.navigate('')}>*/}
                {/*    <Image source={require('../assets/img/lets-icons_filter.png')} />*/}
                {/*</TouchableOpacity>*/}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {events.map((dynasty, index) => (
                    <DynastyCard key={index} fullItem={dynasty} isDarkMode={isDarkMode} />
                ))}
                <TouchableOpacity onPress={() => navigation.navigate('CreateEventsScreen')} style={{alignItems: 'center'}}>
                    <Image source={require('../assets/img/tabler_plus.png')} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = (isDarkMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            paddingTop: 60,
        },
        header: {
            color: isDarkMode ? 'white' : 'black',
            fontSize: 24,
            fontFamily: 'Aboreto',
            fontWeight: '700',
            alignSelf: 'center',
            marginBottom: 20,
            letterSpacing: 1,
        },
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            paddingHorizontal: 20,
        },
        image: {
            width: 80,
            height: 80,
            borderRadius: 12,
            marginRight: 20,
        },
        textContainer: {
            flexShrink: 1,
        },
        name: {
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Aboreto',
            color: isDarkMode ? 'white' : 'black',
            letterSpacing: 1,
        },
        meta: {
            color: isDarkMode ? 'lightgray' : 'gray',
            marginTop: 4,
        },
    });

export default EventsScreen;
