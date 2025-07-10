import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

const DynastyCard = ({ image, name, type, fullItem, isDarkMode }) => {
    const navigation = useNavigation();

    const localStyles = styles(isDarkMode);

    return (
        <TouchableOpacity style={localStyles.card} onPress={() => navigation.navigate('PlaceMoreScreen', { fullItem })}>
            <Image source={image} style={localStyles.image} />
            <View style={localStyles.textContainer}>
                <Text style={localStyles.name}>{name}</Text>
                <Text style={localStyles.meta}>{type}</Text>
            </View>
        </TouchableOpacity>
    );
};

const PlacesScreen = () => {
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';
    const localStyles = styles(isDarkMode);

    const dynasties = [
        { name: 'Versailles', type: 'Bourbons | France', fact: ['2300 rooms, 67 staircases.', 'The Treaty of Versailles (1919) was signed here.'], coordinates: '48.8048, 2.1203',
            pos: require('../assets/spes/b7a47333f2fc030c8f880991fd5e28562a021c27.png'),description : 'Main residence of Louis XIV, symbol of absolutism. Famous for the Hall of Mirrors, the park with fountains and the Orangery.',
            image: require('../assets/spes/b7a47333f2fc030c8f880991fd5e28562a021c27.png')
        },
        { name: 'Windsor Castle', type: 'Windsors | UK',fact: ['Elizabeth II\'s favorite residence.', 'Survived the 1992 fire.'],
            pos: require('../assets/spes/2c944a37029a1bcd8d3b07fb687f102c0e6239c7.png'),
            coordinates: '51.4839, -0.6044',description:"The largest inhabited castle in the world. It hosts the changing of the guard ceremony and weddings of monarchs (e.g. Prince Harry, 2018)",
            image: require('../assets/spes/2c944a37029a1bcd8d3b07fb687f102c0e6239c7.png'),
        },
        { name: 'Winter Palace', type: 'Russia | Romanovs',fact: ['1500 rooms, 117 staircases.','The storming of the palace in 1917 - the key moment of the revolution.'],
            pos: 'https://s3-alpha-sig.figma.com/img/99a6/f9df/8adc30a04be14b309e7d8205e6e28242?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tf-0SnBBmEg7uL8cDR2D5uKPKJyItPIALVnGH3-yswzYeWUGn9DqDrZtEv9UW5Az7X5Q6FXIzbiinafdFxuZPJhY6lxBPfuZC1yUkYMWqg6Sx8yfwe2GSRZC6tTfXkEgAl2f3xnHjGv3eSSAlw2zZEYj7YROVkHhbwKcR3w~1x6kfLTdX8G9nlk~apXKsFnLI4amS~-tmmE5Oq2ZN7Icq~fm5k2f8ZgAThEsz1MuvJ4G8PmYKdjv8d9cxH4snE6PQH871XEVswtY8bnLeDY2dqEnHeaHnvAehT37~Dm9txhFm0WRAV1NFVBYYGks3omzbqvFizYsHY4AnC1ey9MWuQ__', coordinates: '59.9398, 30.3146',description:"Main residence of Russian emperors. Symbol of luxury of the Russian Empire and the events of 1917.",
            image: require('../assets/spes/db7b445795037587a4c2529ecde5db6ef486b6fe.png'),
        },
        { name: 'Schönbrunn ', type: 'Habsburgs | Austria',fact: ['1441 rooms.','Napoleon lived here during the occupation of Vienna.'], coordinates: '48.1857, 16.3128',description: "Summer residence of Maria Theresa. Famous for the “Hall of Mirrors”, where Mozart played at the age of 6, and the oldest zoo in the world.",pos:"https://s3-alpha-sig.figma.com/img/99a6/f9df/8adc30a04be14b309e7d8205e6e28242?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tf-0SnBBmEg7uL8cDR2D5uKPKJyItPIALVnGH3-yswzYeWUGn9DqDrZtEv9UW5Az7X5Q6FXIzbiinafdFxuZPJhY6lxBPfuZC1yUkYMWqg6Sx8yfwe2GSRZC6tTfXkEgAl2f3xnHjGv3eSSAlw2zZEYj7YROVkHhbwKcR3w~1x6kfLTdX8G9nlk~apXKsFnLI4amS~-tmmE5Oq2ZN7Icq~fm5k2f8ZgAThEsz1MuvJ4G8PmYKdjv8d9cxH4snE6PQH871XEVswtY8bnLeDY2dqEnHeaHnvAehT37~Dm9txhFm0WRAV1NFVBYYGks3omzbqvFizYsHY4AnC1ey9MWuQ__",
            image: require('../assets/spes/0f9e2a4b3bf8d15f228cfa70b5fc95e49688b94e.png'),
        },
        { name: 'Alhambra', type: 'Nasridas | Spain',fact:['The name translates as “Red Castle”.', 'Inspired Orientalist painters.'],  coordinates: '37.1760, -3.5889',description:"Palace complex of Moorish rulers of Granada. Famous for its Arabic carvings, fountains and Generalife Gardens.",pos:"https://s3-alpha-sig.figma.com/img/99a6/f9df/8adc30a04be14b309e7d8205e6e28242?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tf-0SnBBmEg7uL8cDR2D5uKPKJyItPIALVnGH3-yswzYeWUGn9DqDrZtEv9UW5Az7X5Q6FXIzbiinafdFxuZPJhY6lxBPfuZC1yUkYMWqg6Sx8yfwe2GSRZC6tTfXkEgAl2f3xnHjGv3eSSAlw2zZEYj7YROVkHhbwKcR3w~1x6kfLTdX8G9nlk~apXKsFnLI4amS~-tmmE5Oq2ZN7Icq~fm5k2f8ZgAThEsz1MuvJ4G8PmYKdjv8d9cxH4snE6PQH871XEVswtY8bnLeDY2dqEnHeaHnvAehT37~Dm9txhFm0WRAV1NFVBYYGks3omzbqvFizYsHY4AnC1ey9MWuQ__",
            image: require('../assets/spes/dc8a0aecee7371c155e28980ad4929975b111686.png'),
        },
    ];

    return (
        <View style={localStyles.container}>
            <Text style={localStyles.header}>Place</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {dynasties.map((dynasty, index) => (
                    <DynastyCard key={index} {...dynasty} fullItem={dynasty} isDarkMode={isDarkMode} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#000' : '#fff',
        paddingTop: 60,
    },
    header: {
        color: isDarkMode ? 'white' : 'black',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'Aboreto',
        alignSelf: 'flex-start',
        marginLeft: 20,
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
        fontFamily: 'Aboreto',
        fontWeight: '600',
        color: isDarkMode ? 'white' : 'black',
        letterSpacing: 1,
    },
    meta: {
        color: isDarkMode ? 'lightgray' : '#555',
        marginTop: 4,
    },
});

export default PlacesScreen;
