import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/slices/themeSlice';

const DynastyCard = ({ image, name, type, period, fullItem, isDarkMode }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles(isDarkMode).card} onPress={() => navigation.navigate('DynastiesMoreScreen', { fullItem })}>
            <Image source={image} style={styles(isDarkMode).image2} />
            <View style={styles(isDarkMode).textContainer}>
                <Text style={styles(isDarkMode).name}>{name}</Text>
                <Text style={styles(isDarkMode).meta}>{type} | {period}</Text>
            </View>
        </TouchableOpacity>
    );
};

const FavoritesScreen = ({ navigation }) => {
    const savedDynasties = useSelector(state => state.saved.dynasties);
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    return (
        <View style={styles(isDarkMode).container}>
            {/* Назад */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles(isDarkMode).back}>
                <Image source={require('../assets/img/Frame1462984530.png')} />
            </TouchableOpacity>

            {/* Заголовок */}
            <Text style={styles(isDarkMode).title}>FAVORITES</Text>

            {/* Иллюстрация */}
            <Image
                source={require('../assets/img/Img.png')}
                style={styles(isDarkMode).image}
                resizeMode="contain"
            />

            {/* Текст */}
            {savedDynasties.length === 0 ? (
                <Text style={styles(isDarkMode).message}>YOU DON'T HAVE ELECTED{'\n'}ROYALTY YET</Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {savedDynasties.map((item, index) => (
                        <DynastyCard key={index} {...item} fullItem={item} isDarkMode={isDarkMode} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = (isDarkMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
            paddingHorizontal: 24,
            paddingTop: 40,
            alignItems: 'center',
        },
        back: {
            position: 'absolute',
            top: 70,
            left: 20,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: 'Aboreto',
            fontSize: 28,
            letterSpacing: 1,
            marginTop: 50,
            marginBottom: 30,
        },
        image: {
            width: 300,
            height: 250,
            marginBottom: 30,
        },
        message: {
            color: isDarkMode ? '#fff' : '#000',
            textAlign: 'center',
            fontFamily: 'Aboreto',
            fontSize: 16,
            letterSpacing: 1,
            lineHeight: 24,
        },
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
        },
        image2: {
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

export default FavoritesScreen;
