import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import PlacesScreen from '../screens/PlacesScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';

const icons = {
    Home: require('../assets/img/iconoir_home.png'),
    Events: require('../assets/img/material-symbols-light_event-rounded.png'),
    Places: require('../assets/img/ic_outline-place.png'),
    Quiz: require('../assets/img/famicons_game-controller-outline.png'),
    Settings: require('../assets/img/solar_settings-broken.png'),
};

const screens = {
    Home: HomeScreen,
    Events: EventsScreen,
    Places: PlacesScreen,
    Quiz: QuizScreen,
    Settings: SettingsScreen,
};

const tabConfig = {
    screenOptions: ({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Скрыть подписи под иконками
        tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 50,
            width: '90%',
            marginLeft: '5%',
            right: 50,
            backgroundColor: '#434343', // светло-фиолетовый с прозрачностью
            borderRadius: 40,
            height: 60,
            borderTopWidth: 0,
            elevation: 0,
        },
        tabBarIcon: ({ focused }) => (
            <Image
                source={icons[route.name]}
                style={{
                    tintColor: focused ? '#FFD700' : '#D1C2FF', // активная иконка жёлтая, неактивные — светло-фиолетовые
                    width: 24,
                    height: 24,
                    marginBottom: -19,
               }}
                resizeMode="contain"
            />
        ),
    }),
};


const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator {...tabConfig}>
        {Object.entries(screens).map(([name, component]) => (
            <Tab.Screen key={name} name={name} component={component} />
        ))}
    </Tab.Navigator>
);

export default TabNavigator;
