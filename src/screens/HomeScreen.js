import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/slices/themeSlice';

const DynastyCard = ({ image, name, type, period, fullItem, isDarkMode }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles(isDarkMode).card} onPress={() => navigation.navigate('DynastiesMoreScreen', { fullItem })}>
            <Image source={image} style={styles(isDarkMode).image} />
            <View style={styles(isDarkMode).textContainer}>
                <Text style={styles(isDarkMode).name}>{name}</Text>
                <Text style={styles(isDarkMode).meta}>{type} | {period}</Text>
            </View>
        </TouchableOpacity>
    );
};

const HomeScreen = ({ navigation }) => {
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    const dynasties = [
        { name: 'BOURBONS', facts: ['Louis XIV - “Sun King”, construction of Versailles.', 'Restoration of monarchy after Napoleon.', 'Influence: Absolutism, centralization of power.'], origin: 'Founded by Robert de Clermont (13th century), a branch of the Capetings', country: 'France, Spain, Luxembourg, Naples', type: 'Political', period: 'Early Modern Age, Enlightenment', image: require('../assets/img/cc/Rectangle3.png') },
        { name: 'TUDORS', facts: ['Louis XIV - “Sun King”, construction of Versailles.', 'Restoration of monarchy after Napoleon.', 'Influence: Absolutism, centralization of power.'], origin: "Wales, founder - Henry VII (winner of the War of the Scarlet and White Rose)", country: 'England', type: 'Religious', period: 'Renaissance', image: require('../assets/img/cc/Rectanglewqfq.png') },
        { name: 'ROMANOVS', facts: ['Henry VIII: six wives, creation of the Anglican Church.', 'Elizabeth I: England\'s Golden Age, defeat of the Armada.', 'Influence: Reformation, strengthening of the monarchy.'], origin: "Mikhail Romanov was elected Tsar in 1613", country: 'Russia', type: 'Political', period: 'Late Middle Ages - 20th century', image: require('../assets/img/cc/Rectanglefqwf.png') },
        { name: 'WINDSORS', facts: ['Peter I: modernization of Russia, foundation of St. Petersburg.', 'Nicholas II: last emperor, executed in 1918.', 'Influence: Expansion of empire, Europeanization.'], origin: "Saxe-Coburg-Gotha (renamed in 1917 due to anti-German sentiment)", country: 'Great Britain', type: 'Cultural', period: 'Modernity', image: require('../assets/img/cc/Rectanglefwqf.png') },
        { name: 'HABSBURGS', facts: ['Elizabeth II: longest reign (70 years).', 'The wedding of Prince William and Kate Middleton (2011)', 'Influence: Symbol of national unity, soft power.'], origin: "Switzerland (XI century), then Austria", country: 'Holy Roman Empire, Austria, Spain', type: 'Political', period: 'Medieval to Modern times', image: require('../assets/img/cc/Rectangleff.png') },
        { name: 'MING', facts: ['Charles V: “The Empire over which the sun never sets”.', 'Inbreeding: genetic defects (e.g., “Habsburg jaw”).', 'Influence: Control of Europe, confrontation with the Ottomans.'], origin: "Zhu Yuanzhang (overthrew the Yuan dynasty)", type: 'Cultural', country: "China", period: 'Middle Ages', image: require('../assets/img/cc/Rectanglef.png') },
        { name: 'AL SAUD', facts: ['Great Wall of China: reconstruction under Ming.', 'Expeditions of Zheng He: voyage to Africa.', 'Influence: Cultural flourishing, ceramics and art.'], origin: "Nejd (founder - Muhammad ibn Saud, 18th century)", type: 'Religious', country: "Saudi Arabia", period: 'Modernity', image: require('../assets/img/cc/Rectangleкопія6.png') },
    ];

    return (
        <View style={styles(isDarkMode).container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={styles(isDarkMode).header}>HOUSES & DYNASTIES</Text>
                <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
                    <Image source={require('../assets/img/basil_heart-outline.png')} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {dynasties.map((dynasty, index) => (
                    <DynastyCard key={index} {...dynasty} fullItem={dynasty} isDarkMode={isDarkMode} />
                ))}
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

export default HomeScreen;
