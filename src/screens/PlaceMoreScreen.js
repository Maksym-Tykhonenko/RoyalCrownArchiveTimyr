import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

const PlaceMoreScreen = ({ navigation, route }) => {
    const { fullItem } = route.params;
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    return (
        <ScrollView style={styles(isDarkMode).container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles(isDarkMode).backButton}>
                <Image source={require('../assets/img/Frame1462984530.png')} />
            </TouchableOpacity>

            <Image source={fullItem.image} style={styles(isDarkMode).image} />
            <Text style={styles(isDarkMode).title}>{fullItem.name}</Text>

            <View style={styles(isDarkMode).infoBlock}>
                <Text style={styles(isDarkMode).label}>Coordinates</Text>
                <Text style={styles(isDarkMode).text}>{fullItem.coordinates}</Text>
            </View>

            <View style={styles(isDarkMode).infoBlock}>
                <Text style={styles(isDarkMode).label}>Country | Dynasty</Text>
                <Text style={styles(isDarkMode).text}>{fullItem.type}</Text>
            </View>

            <View style={styles(isDarkMode).infoBlock}>
                <Text style={styles(isDarkMode).label}>Description</Text>
                <Text style={styles(isDarkMode).text}>{fullItem.description}</Text>
            </View>

            <View style={styles(isDarkMode).infoBlock}>
                <Text style={styles(isDarkMode).label}>Interesting facts</Text>
                {fullItem.fact?.map((item, index) => (
                    <Text key={index} style={styles(isDarkMode).text}>・ {item}</Text>
                ))}
            </View>

            <Text style={styles(isDarkMode).label}>Map</Text>
            <Image source={{ uri: fullItem.pos }} style={styles(isDarkMode).map} resizeMode="cover" />
            <View style={{ marginBottom: 50 }} />
        </ScrollView>
    );
};

const styles = (isDarkMode) =>
    StyleSheet.create({
        container: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
            flex: 1,
            padding: 20,
            paddingTop: 70,
        },
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        image: {
            width: '100%',
            height: 200,
            borderRadius: 20,
            marginBottom: 20,
        },
        title: {
            fontSize: 26,
            fontFamily: 'Aboreto',
            color: isDarkMode ? 'white' : 'black',
            fontWeight: '600',
            marginBottom: 20,
            letterSpacing: 1,
        },
        infoBlock: {
            marginBottom: 16,
        },
        label: {
            color: isDarkMode ? '#999' : '#666',
            fontSize: 13,
            marginBottom: 4,
        },
        text: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 15,
            lineHeight: 20,
        },
        map: {
            width: '100%',
            height: 180,
            marginTop: 10,
            borderRadius: 12,
        },
    });

export default PlaceMoreScreen;
