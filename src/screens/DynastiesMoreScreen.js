import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { removeDynasty, saveDynasty } from '../redux/slices/savedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

const DynastiesMoreScreen = ({ navigation, route }) => {
    const { fullItem } = route.params;
    const dispatch = useDispatch();
    const savedItems = useSelector(state => state.saved.dynasties);
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    const backgroundColor = isDarkMode ? '#000' : '#fff';
    const textColor = isDarkMode ? '#fff' : '#000';
    const labelColor = isDarkMode ? '#999' : '#444';

    const handleSave = () => {
        const isSaved = savedItems.some(item => item.name === fullItem.name);
        if (isSaved) {
            dispatch(removeDynasty(fullItem.name));
            Alert.alert('Removed', 'Dynasty has been removed from favorites.');
        } else {
            dispatch(saveDynasty(fullItem));
            Alert.alert('Saved', 'Dynasty has been saved successfully!');
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/img/Frame1462984530.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.backButton}>
                    <Image source={require('../assets/img/fluent_heart-12-regular.png')} />
                </TouchableOpacity>
            </View>

            <Image source={fullItem.image} style={styles.image} />

            <Text style={[styles.title, { color: textColor }]}>{fullItem.name}</Text>

            <View style={styles.infoBlock}>
                <Text style={[styles.label, { color: labelColor }]}>Country</Text>
                <Text style={[styles.text, { color: textColor }]}>{fullItem.country}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={[styles.label, { color: labelColor }]}>Origin</Text>
                <Text style={[styles.text, { color: textColor }]}>{fullItem.origin}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={[styles.label, { color: labelColor }]}>Type</Text>
                <Text style={[styles.text, { color: textColor }]}>{fullItem.type}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={[styles.label, { color: labelColor }]}>Period</Text>
                <Text style={[styles.text, { color: textColor }]}>{fullItem.period}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={[styles.label, { color: labelColor }]}>Interesting facts</Text>
                {fullItem.facts.map((fact, index) => (
                    <Text key={index} style={[styles.text, { color: textColor }]}>・ {fact}</Text>
                ))}
            </View>

            <View style={{ marginBottom: 50 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
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
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 20,
        fontFamily: 'Aboreto',
        letterSpacing: 1,
    },
    infoBlock: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        marginBottom: 4,
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
    },
});

export default DynastiesMoreScreen;
